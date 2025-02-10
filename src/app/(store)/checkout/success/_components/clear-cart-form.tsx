"use client";

import { clearCartAction } from "@/actions/cart.action";
import { useEffect } from "react";

export default function ClearCartForm() {
  useEffect(() => {
    const form = document.getElementById("clear-cart-form") as HTMLFormElement;
    form.requestSubmit();
  }, []);
  return <form id="clear-cart-form" action={clearCartAction}></form>;
}
