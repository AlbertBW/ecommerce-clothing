"use server";

import { SessionCreate } from "@/lib/types";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function createStripeCheckoutSession(
  sessionCreate: SessionCreate
) {
  const origin = process.env.NEXT_PUBLIC_URL as string;

  const session = await stripe.checkout.sessions.create({
    ...sessionCreate,
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/checkout/cancel`,
  });

  return { sessionId: session.id, checkoutError: null };
}
