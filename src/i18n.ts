import type { Category } from "./types";

export type Lang = "en" | "am";

const en = {
  title: "Expense Tracker",
  balance: "Balance",
  income: "Income",
  expenses: "Expenses",
  addTransaction: "Add transaction",
  type: "Type",
  typeExpense: "Expense",
  typeIncome: "Income",
  description: "Description",
  amount: "Amount",
  category: "Category",
  date: "Date",
  add: "Add",
  delete: "Delete",
  noTransactions: "No transactions yet.",
  filterMonth: "Month",
  allMonths: "All months",
  transactions: "Transactions",
  breakdown: "Spending by category",
  noExpensesMonth: "No expenses for this period.",
  errDescription: "Enter a description.",
  errAmount: "Enter an amount greater than 0.",
  errDate: "Choose a date.",
  switchTo: "አማርኛ",
  currency: "ETB",
  cat_food: "Food",
  cat_transport: "Transport",
  cat_rent: "Rent",
  cat_utilities: "Utilities",
  cat_health: "Health",
  cat_education: "Education",
  cat_entertainment: "Entertainment",
  cat_salary: "Salary",
  cat_business: "Business",
  cat_other: "Other",
} as const;

export type TKey = keyof typeof en;

// Amharic translations: have a native speaker review these before publishing.
const am: Record<TKey, string> = {
  title: "የወጪ መከታተያ",
  balance: "ቀሪ ሂሳብ",
  income: "ገቢ",
  expenses: "ወጪ",
  addTransaction: "ግብይት ጨምር",
  type: "ዓይነት",
  typeExpense: "ወጪ",
  typeIncome: "ገቢ",
  description: "መግለጫ",
  amount: "መጠን",
  category: "ምድብ",
  date: "ቀን",
  add: "ጨምር",
  delete: "ሰርዝ",
  noTransactions: "እስካሁን ምንም ግብይት የለም።",
  filterMonth: "ወር",
  allMonths: "ሁሉም ወሮች",
  transactions: "ግብይቶች",
  breakdown: "በምድብ የወጪ ድርሻ",
  noExpensesMonth: "ለዚህ ጊዜ ምንም ወጪ የለም።",
  errDescription: "መግለጫ ያስገቡ።",
  errAmount: "ከ0 በላይ የሆነ መጠን ያስገቡ።",
  errDate: "ቀን ይምረጡ።",
  switchTo: "English",
  currency: "ብር",
  cat_food: "ምግብ",
  cat_transport: "ትራንስፖርት",
  cat_rent: "ኪራይ",
  cat_utilities: "መገልገያዎች",
  cat_health: "ጤና",
  cat_education: "ትምህርት",
  cat_entertainment: "መዝናኛ",
  cat_salary: "ደመወዝ",
  cat_business: "ንግድ",
  cat_other: "ሌላ",
};

export function t(lang: Lang, key: TKey): string {
  return lang === "am" ? am[key] : en[key];
}

export function categoryKey(category: Category): TKey {
  return `cat_${category}` as TKey;
}
