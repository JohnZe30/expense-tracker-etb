import type { Lang } from "./i18n";
import type { Transaction } from "./types";

const TX_KEY = "expense-tracker-etb-transactions";
const LANG_KEY = "expense-tracker-etb-lang";

export function loadTransactions(): Transaction[] {
  try {
    const raw = localStorage.getItem(TX_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Transaction[]) : [];
  } catch {
    return [];
  }
}

export function saveTransactions(items: Transaction[]): void {
  try {
    localStorage.setItem(TX_KEY, JSON.stringify(items));
  } catch {
    // Storage may be unavailable (e.g. private mode). The app still works in memory.
  }
}

export function loadLang(): Lang {
  try {
    return localStorage.getItem(LANG_KEY) === "am" ? "am" : "en";
  } catch {
    return "en";
  }
}

export function saveLang(lang: Lang): void {
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch {
    // Ignore: language choice just won't persist.
  }
}
