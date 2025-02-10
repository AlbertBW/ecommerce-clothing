"use client";

import { createOrderAction } from "@/actions/order.action";
import {
  Address,
  AddressFormFieldErrors,
  EmailFormErrors,
  NewAddress,
} from "@/db/schema";
import { SHIPPING_METHODS } from "@/lib/constants";
import { AddressId } from "@/lib/types";
import getStripe from "@/utils/get-stripejs";
import { useActionState, useEffect, useState } from "react";

const initialState = {
  data: {
    addressId: "" as AddressId | null,
    email: "",
    address: {} as NewAddress,
    shippingMethod: "",
    sessionId: null as string | null,
  },
  errors: {} as AddressFormFieldErrors | null,
  emailError: null as EmailFormErrors | null,
};

export type CheckoutForm = typeof initialState;

export default function CheckoutForm({
  addresses,
  price,
}: {
  addresses: Address[] | null;
  price: number;
}) {
  const [state, formAction, pending] = useActionState(
    createOrderAction,
    initialState
  );
  const [newAddress, setNewAddress] = useState(!addresses ? true : false);
  const [selectedAddress, setSelectedAddress] = useState<AddressId | null>(
    null
  );
  const [shippingMethod, setShippingMethod] = useState<string>(
    SHIPPING_METHODS[0].name
  );

  useEffect(() => {
    if (state.data.address && state.data.address.id) {
      setSelectedAddress(state.data.address.id);
    }
    if (state.data.sessionId) {
      const redirectToStripe = async () => {
        const stripe = await getStripe();
        const { error } = await stripe!.redirectToCheckout({
          sessionId: state.data.sessionId!,
        });

        if (error) {
          throw new Error(error.message);
        }
      };
      redirectToStripe();
    }
  }, [state.data.address, state.data.sessionId]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "new") {
      setNewAddress(true);
    } else if (e.target.value === "") {
      setNewAddress(false);
      setSelectedAddress(null);
    } else {
      setSelectedAddress(e.target.value ? (e.target.value as AddressId) : null);
      setNewAddress(false);
    }
  };

  const handleShippingMethodChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setShippingMethod(e.target.value);
  };

  return (
    <form action={formAction}>
      <input type="hidden" name="addressId" value={selectedAddress || ""} />
      <input type="hidden" name="shippingMethod" value={shippingMethod} />

      {addresses && (
        <select
          disabled={pending}
          className="w-full p-2 mb-4 border rounded dark:bg-zinc-800 dark:border-zinc-700"
          onChange={handleSelectChange}
        >
          <option value={""}>Select a shipping address</option>
          {addresses.map((address) => (
            <option key={address.id} value={address.id}>
              {address.addressLine1}, {address.city}, {address.postcode}
            </option>
          ))}
          <option value="new">New address</option>
        </select>
      )}

      {newAddress && (
        <>
          {!addresses && (
            <div>
              <div className="flex items-center gap-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Email
                </label>
                <span aria-live="polite" className="text-sm text-red-500">
                  {state.emailError}
                </span>
              </div>
              <input
                disabled={pending}
                type="email"
                id="email"
                name="email"
                defaultValue={state.data.email || ""}
                className={`mt-1 block w-full rounded-md border shadow-sm p-1 bg-white dark:bg-zinc-800 dark:text-white ${
                  state.emailError
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                }`}
                required
              />
            </div>
          )}
          <div>
            <div className="flex items-center gap-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Full Name
              </label>
              <span aria-live="polite" className="text-sm text-red-500">
                {state.errors?.name}
              </span>
            </div>
            <input
              disabled={pending}
              type="text"
              id="name"
              name="name"
              defaultValue={state.data?.address.name || ""}
              className={`mt-1 block w-full rounded-md border shadow-sm p-1 bg-white dark:bg-zinc-800 dark:text-white ${
                state.errors?.name
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
              required
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <label
                htmlFor="address1"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Address Line 1
              </label>
              <span aria-live="polite" className="text-sm text-red-500">
                {state.errors?.addressLine1}
              </span>
            </div>
            <input
              disabled={pending}
              type="text"
              id="address1"
              name="address1"
              defaultValue={state.data?.address.addressLine1 || ""}
              className={`mt-1 block w-full rounded-md border shadow-sm p-1 bg-white dark:bg-zinc-800 dark:text-white ${
                state.errors?.addressLine1
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
              required
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <label
                htmlFor="address2"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Address Line 2
              </label>
              <span aria-live="polite" className="text-sm text-red-500">
                {state.errors?.addressLine2}
              </span>
            </div>
            <input
              disabled={pending}
              type="text"
              id="address2"
              name="address2"
              defaultValue={state.data?.address.addressLine2 || ""}
              className={`mt-1 block w-full rounded-md border  shadow-sm p-1 bg-white dark:bg-zinc-800 dark:text-white ${
                state.errors?.addressLine2
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                City
              </label>
              <span aria-live="polite" className="text-sm text-red-500">
                {state.errors?.city}
              </span>
            </div>
            <input
              disabled={pending}
              type="text"
              id="city"
              name="city"
              defaultValue={state.data?.address.city || ""}
              className={`mt-1 block w-full rounded-md border shadow-sm p-1 bg-white dark:bg-zinc-800 dark:text-white ${
                state.errors?.city
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
              required
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <label
                htmlFor="county"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                County
              </label>
              <span aria-live="polite" className="text-sm text-red-500">
                {state.errors?.county}
              </span>
            </div>
            <input
              disabled={pending}
              type="text"
              id="county"
              name="county"
              defaultValue={state.data?.address.county || ""}
              className={`mt-1 block w-full rounded-md border shadow-sm p-1 bg-white dark:bg-zinc-800 dark:text-white ${
                state.errors?.county
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
              required
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <label
                htmlFor="postcode"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Postcode
              </label>
              <span aria-live="polite" className="text-sm text-red-500">
                {state.errors?.postcode}
              </span>
            </div>
            <input
              disabled={pending}
              type="text"
              id="postcode"
              name="postcode"
              defaultValue={state.data?.address.postcode || ""}
              className={`mt-1 block w-full rounded-md border shadow-sm p-1 bg-white dark:bg-zinc-800 dark:text-white ${
                state.errors?.postcode
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
              required
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Country
              </label>
              <span aria-live="polite" className="text-sm text-red-500">
                {state.errors?.country}
              </span>
            </div>
            <input
              disabled={pending}
              type="text"
              id="country"
              name="country"
              defaultValue={state.data?.address.country || ""}
              className={`mt-1 block w-full rounded-md border shadow-sm p-1 bg-white dark:bg-zinc-800 dark:text-white ${
                state.errors?.country
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
              required
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Phone Number
              </label>
              <span aria-live="polite" className="text-sm text-red-500">
                {state.errors?.phoneNumber}
              </span>
            </div>
            <input
              disabled={pending}
              type="tel"
              id="phone"
              name="phone"
              defaultValue={state.data?.address.phoneNumber || ""}
              pattern="[0-9]*"
              placeholder="07123456789"
              className={`mt-1 block w-full rounded-md border  shadow-sm p-1 bg-white dark:bg-zinc-800  dark:text-white ${
                state.errors?.phoneNumber
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
              required
            />
          </div>
        </>
      )}
      <div>
        <select
          disabled={pending}
          className="w-full p-1 my-4 border rounded dark:bg-zinc-800 dark:border-zinc-700"
          onChange={handleShippingMethodChange}
          defaultValue={SHIPPING_METHODS[0].name}
        >
          {SHIPPING_METHODS.map((method) => (
            <option key={method.name + method.price} value={method.name}>
              {method.name} - £{(method.price / 100).toFixed(2)}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-between">
        <div>
          <p>Subtotal: £{(price / 100).toFixed(2)}</p>
          <p>
            Shipping: £
            {(
              (shippingMethod
                ? SHIPPING_METHODS.find((m) => m.name === shippingMethod)
                    ?.price ?? SHIPPING_METHODS[0].price
                : SHIPPING_METHODS[0].price) / 100
            ).toFixed(2)}
          </p>
          <p>
            Total: £
            {(
              price / 100 +
              (shippingMethod
                ? SHIPPING_METHODS.find((m) => m.name === shippingMethod)
                    ?.price ?? SHIPPING_METHODS[0].price
                : SHIPPING_METHODS[0].price) /
                100
            ).toFixed(2)}
          </p>
        </div>
        <button
          className="bg-blue-500 h-12 w-48 rounded shadow-md text-white"
          disabled={pending}
        >
          Complete Purchase
        </button>
      </div>
    </form>
  );
}
