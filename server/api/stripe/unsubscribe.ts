import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { subscriptionId } = body;
  
  if (!subscriptionId) throw createError({ statusCode: 401, statusMessage: 'subscriptionId missed' });

  try {
    await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    });

    await supabase
      .from('profiles')
      .update({ is_subscribed: true, subscription_status: 'will_expire' })
      .eq('subscription_id', subscriptionId);

    return { success: true };
  } catch (err) {
    console.error('Error cancelling subscription:', err);
    throw createError({ statusCode: 500, statusMessage: 'Error cancelling subscription' });
  }
});
