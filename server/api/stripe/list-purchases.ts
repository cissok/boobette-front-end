import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const userEmail = query?.userEmail

  if (!userEmail) throw createError({ statusCode: 400, statusMessage: 'User email is required'})

  try {
    const customers = await stripe.customers.list({email: userEmail})
    const customerId = customers.data?.[0]?.id
    if(!customerId) throw createError({ statusCode: 400, statusMessage: 'User not found in Stripe'})
    const charges = await stripe.charges.list({ customer: customerId })
    return {
      purchases: charges.data
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'An error occurred while retrieving charges',
      data: error
    });
  }
});