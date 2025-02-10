import { completeOrder } from "@/use-cases/orders";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: Request) {
  console.log("[Webhook] Request received:", new Date().toISOString());
  const body = await request.text();
  const sig = (await headers()).get("stripe-signature");

  let event;
  if (!sig) {
    return new NextResponse(JSON.stringify({ received: false }), {
      status: 400,
    });
  }

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    console.error("Error verifying webhook signature:", err);
    return new NextResponse(JSON.stringify({ received: false }), {
      status: 400,
    });
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      // Handle successful payment
      const data = event.data.object;
      const orderId = data.metadata?.order_id;

      await completeOrder({
        orderId: orderId as string,
        status: data.payment_status,
      });

      break;

    // Add more cases for other event types you want to handle
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return new NextResponse(JSON.stringify({ received: true }), {
    status: 200,
  });
}
