export function normaliseArrayParam(
  param: string | string[] | undefined
): string[] | null {
  if (!param) return null;
  if (Array.isArray(param)) return param;
  return param.split(",");
}
