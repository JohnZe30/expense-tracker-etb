import type { Lang } from "../i18n";
import type { Category, Transaction } from "../types";

/** Today's date as YYYY-MM-DD in the user's local time zone. */
export function todayISO(): string {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

/** "2026-11-08" -> "2026-11" */
export function monthKey(date: string): string {
  return date.slice(0, 7);
}

/** Formats a number with thousands separators and two decimals, e.g. 1234.5 -> "1,234.50". */
export function formatAmount(value: number): string {
  return value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/** "2026-11" -> "November 2026" (or the Amharic name, where the browser supports it). */
export function formatMonth(key: string, lang: Lang): string {
  const [year, month] = key.split("-").map(Number);
  return new Date(year, month - 1, 1).toLocaleDateString(lang === "am" ? "am-ET" : "en-US", {
    year: "numeric",
    month: "long",
  });
}

/** Distinct months present in the data, newest first. */
export function monthsIn(items: Transaction[]): string[] {
  return [...new Set(items.map((tx) => monthKey(tx.date)))].sort().reverse();
}

export function totals(items: Transaction[]) {
  let income = 0;
  let expenses = 0;
  for (const tx of items) {
    if (tx.type === "income") income += tx.amount;
    else expenses += tx.amount;
  }
  return { income, expenses, balance: income - expenses };
}

/** Expense totals per category, largest first. */
export function categoryTotals(items: Transaction[]): { category: Category; total: number }[] {
  const map = new Map<Category, number>();
  for (const tx of items) {
    if (tx.type !== "expense") continue;
    map.set(tx.category, (map.get(tx.category) ?? 0) + tx.amount);
  }
  return [...map.entries()]
    .map(([category, total]) => ({ category, total }))
    .sort((a, b) => b.total - a.total);
}
