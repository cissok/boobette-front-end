import { defineEventHandler, readRawBody } from 'h3';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16' });

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export default defineEventHandler(async (event) => {
  const sig = event.req.headers['stripe-signature'];
  const rawBody = await readRawBody(event);
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let stripeEvent;

  try {
    stripeEvent = stripe.webhooks.constructEvent(rawBody, sig!, endpointSecret);
  } catch (err) {
    console.error('⚠️ Webhook signature verification failed.');
    throw createError({ statusCode: 400, message: 'Webhook error' });
  }

  // COMPLETE CHECKOUT SESSION
  if (stripeEvent.type === 'checkout.session.completed') {
    const session = stripeEvent.data.object;
    const userEmail = session.customer_email;
    await supabase
      .from('profiles')
      .update({ is_subscribed: true, subscription_id: session.subscription, subscription_status: 'active' })
      .eq('email', userEmail);
  }

  // PAYMENT FAILED (WAINING FOR PAYMENT)
  if (stripeEvent.type === 'invoice.payment_failed') {    
    const invoice = stripeEvent.data.object;
    const subscriptionId = invoice.subscription;
    await supabase
      .from('profiles')
      .update({ is_subscribed: false, subscription_status: 'inactive' })
      .eq('subscription_id', subscriptionId);
  }

  // SUBSCRIPTION DELEYED OR CANCELED
  if (stripeEvent.type === 'customer.subscription.deleted') {
    const subscription = stripeEvent.data.object;
    const subscriptionId = subscription.id;
    await supabase
      .from('profiles')
      .update({ is_subscribed: false, subscription_id: null, subscription_status: 'inactive' })
      .eq('subscription_id', subscriptionId);
  }

  return { received: true };
});
