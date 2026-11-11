import { useState } from "react";
import type { FormEvent } from "react";
import { categoryKey, t } from "../i18n";
import type { Lang, TKey } from "../i18n";
import { todayISO } from "../lib/utils";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "../types";
import type { Category, Transaction, TransactionType } from "../types";

interface Props {
  lang: Lang;
  onAdd: (tx: Transaction) => void;
}

type Errors = Partial<Record<"description" | "amount" | "date", TKey>>;

export default function TransactionForm({ lang, onAdd }: Props) {
  const tr = (key: TKey) => t(lang, key);

  const [type, setType] = useState<TransactionType>("expense");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<Category>("food");
  const [date, setDate] = useState(todayISO());
  const [errors, setErrors] = useState<Errors>({});

  const categories = type === "expense" ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

  function changeType(next: TransactionType) {
    setType(next);
    setCategory(next === "expense" ? "food" : "salary");
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const value = Number(amount);
    const nextErrors: Errors = {};
    if (!description.trim()) nextErrors.description = "errDescription";
    if (!Number.isFinite(value) || value <= 0) nextErrors.amount = "errAmount";
    if (!date) nextErrors.date = "errDate";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    onAdd({
      id: crypto.randomUUID(),
      type,
      description: description.trim(),
      amount: value,
      category,
      date,
    });
    setDescription("");
    setAmount("");
  }

  return (
    <form className="card form" onSubmit={handleSubmit} noValidate>
      <h2>{tr("addTransaction")}</h2>

      <div className="segmented" role="group" aria-label={tr("type")}>
        <button
          type="button"
          className={type === "expense" ? "active" : ""}
          onClick={() => changeType("expense")}
        >
          {tr("typeExpense")}
        </button>
        <button
          type="button"
          className={type === "income" ? "active" : ""}
          onClick={() => changeType("income")}
        >
          {tr("typeIncome")}
        </button>
      </div>

      <label>
        <span>{tr("description")}</span>
        <input value={description} onChange={(e) => setDescription(e.target.value)} />
        {errors.description && <small className="error">{tr(errors.description)}</small>}
      </label>

      <label>
        <span>
          {tr("amount")} ({tr("currency")})
        </span>
        <input
          type="number"
          inputMode="decimal"
          min="0"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        {errors.amount && <small className="error">{tr(errors.amount)}</small>}
      </label>

      <label>
        <span>{tr("category")}</span>
        <select value={category} onChange={(e) => setCategory(e.target.value as Category)}>
          {categories.map((c) => (
            <option key={c} value={c}>
              {tr(categoryKey(c))}
            </option>
          ))}
        </select>
      </label>

      <label>
        <span>{tr("date")}</span>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        {errors.date && <small className="error">{tr(errors.date)}</small>}
      </label>

      <button type="submit" className="primary">
        {tr("add")}
      </button>
    </form>
  );
}
