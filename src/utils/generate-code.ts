export function generateCode(name: string, length: number = 3): string {
  return name.replace("-", "").substring(0, length).toUpperCase();
}
