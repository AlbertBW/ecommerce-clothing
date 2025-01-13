"use client";
import { ZodError } from "zod";

export function safeParseError<T>(zodError: ZodError<T>) {
  const errors: string[] = [];

  for (const error of zodError.errors) {
    let errorMessage = "";
    errorMessage = errorMessage + error.path[0] + ": " + error.message + ". ";

    errors.push(errorMessage);
  }

  return errors;
}
