export type TransactionType = "expense" | "income";

export type Category =
  | "food"
  | "transport"
  | "rent"
  | "utilities"
  | "health"
  | "education"
  | "entertainment"
  | "salary"
  | "business"
  | "other";

export const EXPENSE_CATEGORIES: Category[] = [
  "food", "transport", "rent", "utilities", "health", "education", "entertainment", "other",
];

export const INCOME_CATEGORIES: Category[] = ["salary", "business", "other"];

export interface Transaction {
  id: string;
  type: TransactionType;
  description: string;
  amount: number;
  category: Category;
  date: string; // YYYY-MM-DD (Gregorian)
}
