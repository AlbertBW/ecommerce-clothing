"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({
  text,
  pendingText,
}: {
  text: string;
  pendingText?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} type="submit" className="hover:underline">
      {pending && pendingText ? pendingText : text}
    </button>
  );
}
