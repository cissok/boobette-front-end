import { getSignedUrl } from "@aws-sdk/cloudfront-signer"

export default defineEventHandler(async (event) => {
  // 1️⃣ Vérifie que l'utilisateur est authentifié via Supabase
  // const user = await getUserFromAuth(event);
  // if (!user) return { status: 401, body: "Unauthorized" };

  // 2️⃣ Vérifie que l'utilisateur a un abonnement Stripe actif
  // const subscription = await checkUserSubscription(user.id);
  // if (!subscription) return { status: 403, body: "No active subscription" };

  const signedUrl = getSignedUrl({
    keyPairId: process.env.CLOUDFRONT_KEY_PAIR_ID || '',
    privateKey: process.env.CLOUDFRONT_PRIVATE_KEY || '',
    url: 'https://d1vyq76bvkx8qd.cloudfront.net/v-sample-30mn-1Go.mp4',
    // dateLessThan: new Date( Date.now() + (1000 /*sec*/ * 60)) // 1 minute
    dateLessThan: new Date( Date.now() + (1000 * 60 * 60 * 24)) // 24 hours
  })
  return { url: signedUrl };
});
