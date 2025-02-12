"use client";

import { createOrUpdateAddressAction } from "@/actions/address.action";
import { AddressFormFieldErrors, NewAddress } from "@/db/schema";
import { useActionState, useEffect } from "react";

export default function AddressForm({
  address,
  cancel,
}: {
  address: NewAddress;
  cancel: () => void;
}) {
  const [state, formAction, pending] = useActionState(
    createOrUpdateAddressAction,
    {
      address,
      success: false,
      errors: {} as AddressFormFieldErrors | null,
    }
  );

  useEffect(() => {
    if (state.success) {
      cancel();
    }
  }, [cancel, state.success]);

  return (
    <form
      action={formAction}
      className="border rounded-lg p-6 shadow-sm max-w-sm space-y-4"
    >
      {state.address.id && (
        <input type="hidden" name="id" value={state.address?.id} />
      )}
      <div>
        <div className="flex items-center gap-2">
          <label htmlFor="name" className="block text-sm font-medium mb-1">
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
          defaultValue={state.address?.name || ""}
          required
          className="w-full p-2 border rounded-md dark:bg-zinc-800 dark:border-zinc-700"
        />
      </div>

      <div>
        <div className="flex items-center gap-2">
          <label htmlFor="address1" className="block text-sm font-medium mb-1">
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
          defaultValue={state.address?.addressLine1 || ""}
          required
          className="w-full p-2 border rounded-md dark:bg-zinc-800 dark:border-zinc-700"
        />
      </div>

      <div>
        <div className="flex items-center gap-2">
          <label htmlFor="address2" className="block text-sm font-medium mb-1">
            Address Line 2 (Optional)
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
          defaultValue={state.address?.addressLine2 || ""}
          className="w-full p-2 border rounded-md dark:bg-zinc-800 dark:border-zinc-700"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <label htmlFor="city" className="block text-sm font-medium mb-1">
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
            defaultValue={state.address?.city || ""}
            required
            className="w-full p-2 border rounded-md dark:bg-zinc-800 dark:border-zinc-700"
          />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <label htmlFor="county" className="block text-sm font-medium mb-1">
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
            defaultValue={state.address?.county || ""}
            required
            className="w-full p-2 border rounded-md dark:bg-zinc-800 dark:border-zinc-700"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <label
              htmlFor="postcode"
              className="block text-sm font-medium mb-1"
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
            defaultValue={state.address?.postcode || ""}
            required
            className="w-full p-2 border rounded-md dark:bg-zinc-800 dark:border-zinc-700"
          />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <label htmlFor="country" className="block text-sm font-medium mb-1">
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
            defaultValue={state.address?.country || ""}
            required
            className="w-full p-2 border rounded-md dark:bg-zinc-800 dark:border-zinc-700"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2">
          <label htmlFor="phone" className="block text-sm font-medium mb-1">
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
          defaultValue={state.address?.phoneNumber || ""}
          required
          pattern="[0-9]*"
          className="w-full p-2 border rounded-md dark:bg-zinc-800 dark:border-zinc-700"
        />
      </div>

      <div className="flex justify-between">
        <button disabled={pending} type="submit">
          Confirm
        </button>

        <button
          disabled={pending}
          onClick={cancel}
          type="button"
          className="text-red-500"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
