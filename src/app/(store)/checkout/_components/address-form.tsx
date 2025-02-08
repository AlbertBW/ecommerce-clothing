"use client";

import { createAddressAction } from "@/actions/address.action";
import { AddressFormErrors, NewAddress } from "@/db/schema";
import { useActionState } from "react";

const initialState = {
  data: {} as NewAddress | null,
  errors: {} as AddressFormErrors | null,
};

export type AddressForm = typeof initialState;

export default function AddressForm() {
  const [state, formAction, pending] = useActionState(
    createAddressAction,
    initialState
  );

  return (
    <form className="space-y-3" action={formAction}>
      <div>
        <div className="flex items-center gap-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Full Name
          </label>
          <span aria-live="polite" className="text-sm text-red-500">
            {state.errors?.name?._errors}
          </span>
        </div>
        <input
          disabled={pending}
          type="text"
          id="name"
          name="name"
          defaultValue={state.data?.name || ""}
          className={`mt-1 block w-full rounded-md border shadow-sm p-1 bg-white dark:bg-zinc-800 dark:text-white ${
            state.errors?.name?._errors
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
            {state.errors?.addressLine1?._errors}
          </span>
        </div>
        <input
          disabled={pending}
          type="text"
          id="address1"
          name="address1"
          defaultValue={state.data?.addressLine1 || ""}
          className={`mt-1 block w-full rounded-md border shadow-sm p-1 bg-white dark:bg-zinc-800 dark:text-white ${
            state.errors?.addressLine1?._errors
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
            {state.errors?.addressLine2?._errors}
          </span>
        </div>
        <input
          disabled={pending}
          type="text"
          id="address2"
          name="address2"
          defaultValue={state.data?.addressLine2 || ""}
          className={`mt-1 block w-full rounded-md border  shadow-sm p-1 bg-white dark:bg-zinc-800 dark:text-white ${
            state.errors?.addressLine2?._errors
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
            {state.errors?.city?._errors}
          </span>
        </div>
        <input
          disabled={pending}
          type="text"
          id="city"
          name="city"
          defaultValue={state.data?.city || ""}
          className={`mt-1 block w-full rounded-md border shadow-sm p-1 bg-white dark:bg-zinc-800 dark:text-white ${
            state.errors?.city?._errors
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
            {state.errors?.county?._errors}
          </span>
        </div>
        <input
          disabled={pending}
          type="text"
          id="county"
          name="county"
          defaultValue={state.data?.county || ""}
          className={`mt-1 block w-full rounded-md border shadow-sm p-1 bg-white dark:bg-zinc-800 dark:text-white ${
            state.errors?.county?._errors
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
            {state.errors?.postcode?._errors}
          </span>
        </div>
        <input
          disabled={pending}
          type="text"
          id="postcode"
          name="postcode"
          defaultValue={state.data?.postcode || ""}
          className={`mt-1 block w-full rounded-md border shadow-sm p-1 bg-white dark:bg-zinc-800 dark:text-white ${
            state.errors?.postcode?._errors
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
            {state.errors?.country?._errors}
          </span>
        </div>
        <input
          disabled={pending}
          type="text"
          id="country"
          name="country"
          defaultValue={state.data?.country || ""}
          className={`mt-1 block w-full rounded-md border shadow-sm p-1 bg-white dark:bg-zinc-800 dark:text-white ${
            state.errors?.country?._errors
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
            {state.errors?.phoneNumber?._errors}
          </span>
        </div>
        <input
          disabled={pending}
          type="tel"
          id="phone"
          name="phone"
          defaultValue={state.data?.phoneNumber || ""}
          pattern="[0-9]*"
          placeholder="07123456789"
          className={`mt-1 block w-full rounded-md border  shadow-sm p-1 bg-white dark:bg-zinc-800  dark:text-white ${
            state.errors?.phoneNumber?._errors
              ? "border-red-500"
              : "border-gray-300 dark:border-gray-600"
          }`}
          required
        />
      </div>
      <button disabled={pending}>Create Address</button>
    </form>
  );
}
