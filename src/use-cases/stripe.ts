import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function getStripeCheckoutSession(sessionId: string) {
  return await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items.data.price.product"],
  });
}

export async function createStripeRefund({
  paymentIntentId,
}: {
  paymentIntentId: string;
}) {
  return await stripe.refunds.create({
    payment_intent: paymentIntentId,
  });
}
