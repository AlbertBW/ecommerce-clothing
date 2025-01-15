import { nanoid } from "nanoid";

/**
 * Generates a random string of the specified length using the nanoid library.
 *
 * @param length - The length of the random string to generate. Defaults to 10 if not provided.
 * @returns A random string of the specified length.
 */
export function generateRandomString(length: number = 10) {
  return nanoid(length);
}
