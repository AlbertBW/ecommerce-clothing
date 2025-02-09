"use client";

import { createStripeCheckoutSession } from "@/actions/stripe.action";
import { SHIPPING_METHODS } from "@/lib/constants";
import { LineItem, SessionCreate } from "@/lib/types";
import { generateRandomString } from "@/utils/generate-random-string";

export default function page() {
  const lineItems: LineItem[] = [
    {
      price_data: {
        currency: "gbp",
        unit_amount: 1000, // Price in cents
        product_data: {
          name: "Your Product Name",
        },
      },
      quantity: 1,
    },
  ];

  const sessionCreate: SessionCreate = {
    mode: "payment",
    payment_method_types: ["card"],
    currency: "gbp",
    customer_email: "test@test.com",
    line_items: lineItems,
    client_reference_id: generateRandomString(),
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: SHIPPING_METHODS[0].price,
            currency: "gbp",
          },
          display_name: "standard",
        },
      },
    ],
  };

  async function handleSubmit() {
    const stripeSession = await createStripeCheckoutSession(sessionCreate);

    console.log(stripeSession);
  }
  return (
    <form action={handleSubmit}>
      <button>Stripe</button>
    </form>
  );
}
