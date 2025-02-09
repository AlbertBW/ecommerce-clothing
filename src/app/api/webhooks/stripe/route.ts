import { updateOrderStatusUseCase } from "@/use-cases/orders";
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
      console.log("Payment was successful!", event.data.object);
      const data = event.data.object;

      if (!data.client_reference_id) {
        console.error("No order number found in event data");
        return new NextResponse(JSON.stringify({ received: false }), {
          status: 400,
        });
      }
      const order = await updateOrderStatusUseCase({
        orderNumber: data.client_reference_id,
        status: "paid",
      });

      if (!order[0]) {
        console.error("Order not found");
        return new NextResponse(JSON.stringify({ received: false }), {
          status: 400,
        });
      }
      break;

    // Add more cases for other event types you want to handle
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return new NextResponse(JSON.stringify({ received: true }), {
    status: 200,
  });
}
