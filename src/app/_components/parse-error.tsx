"use client";

import { safeParseError } from "@/utils/safeParseError";
import { ZodError } from "zod";

export default function ParseError<T>({ zodError }: { zodError: ZodError<T> }) {
  const errors = safeParseError(zodError);
  return (
    <div>
      {errors.map((error) => (
        <p key={error}>{error}</p>
      ))}
    </div>
  );
}
