/**
 * The source catalogue is kept in USD, while the storefront is priced in NPR.
 * Swap the rate in one place so every page, rail and cart stays consistent.
 */
export const USD_TO_NPR = 134;

export function toNpr(usd: number): number {
  const converted = usd * USD_TO_NPR;
  return Math.max(99, Math.round(converted / 100) * 100 - 1);
}

export function formatNpr(usd: number): string {
  return `Rs ${toNpr(usd).toLocaleString("en-IN")}`;
}

export function formatNprValue(npr: number): string {
  return `Rs ${Math.round(npr).toLocaleString("en-IN")}`;
}

export function discountPercent(price: number, originalPrice?: number): number {
  if (!originalPrice || originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}
