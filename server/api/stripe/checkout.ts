
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { amountMonth, userEmail } = body;

  if (!userEmail || !amountMonth) throw createError({ statusCode: 400, message: 'userEmail and amountMonth are required' });

  const oneMonth = 'price_1R5ct1CkAwCRcoziWNUTys4c'
  const threeMonth = 'price_1R7nAICkAwCRcozi28tInmTL'
  const sixMonth = 'price_1R7nAzCkAwCRcoziAPcr1p3c'
  const oneYear = 'price_1R7nI7CkAwCRcoziVjR43DfL'
  
  let priceId = null

  switch (amountMonth) {
    case 1:
      priceId = oneMonth
      break;
    case 3:
      priceId = threeMonth
      break;
    case 6:
      priceId = sixMonth
      break;
    case 12:
      priceId = oneYear
      break;
    default:
      throw new Error('Invalid subscription duration')
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'subscription',
    customer_email: userEmail,
    line_items: [{
      price: priceId,
      quantity: 1,
    }],
    success_url: `${process.env.FRONTEND_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.FRONTEND_URL}/checkout/cancel`,
    metadata: {
      description: `Abonnement de ${amountMonth} mois`,
    },
  });

  return { url: session.url };
});
