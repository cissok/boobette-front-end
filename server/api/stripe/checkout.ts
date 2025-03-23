
import { defineEventHandler, readBody } from 'h3';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { priceId, userEmail } = body;

  if (!priceId || !userEmail) {
    throw createError({ statusCode: 400, message: 'priceId and userEmail are required' });
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'subscription',
    customer_email: userEmail,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.FRONTEND_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.FRONTEND_URL}/checkout/cancel`,
  });

  return { url: session.url };
});
