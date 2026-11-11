import { useEffect, useMemo, useState } from "react";
import "./App.css";
import CategoryBars from "./components/CategoryBars";
import SummaryCards from "./components/SummaryCards";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import { t } from "./i18n";
import type { Lang } from "./i18n";
import { loadLang, loadTransactions, saveLang, saveTransactions } from "./storage";
import type { Transaction } from "./types";
import { formatMonth, monthKey, monthsIn, totals } from "./lib/utils";

export default function App() {
  const [transactions, setTransactions] = useState<Transaction[]>(() => loadTransactions());
  const [lang, setLang] = useState<Lang>(() => loadLang());
  const [month, setMonth] = useState<string>("all");

  useEffect(() => {
    saveTransactions(transactions);
  }, [transactions]);

  useEffect(() => {
    saveLang(lang);
    document.documentElement.lang = lang;
    document.title = t(lang, "title");
  }, [lang]);

  const months = useMemo(() => monthsIn(transactions), [transactions]);

  // If the selected month no longer has any data (e.g. after deleting), fall back to "all".
  const activeMonth = month === "all" || months.includes(month) ? month : "all";

  const visible = useMemo(() => {
    const list =
      activeMonth === "all"
        ? transactions
        : transactions.filter((tx) => monthKey(tx.date) === activeMonth);
    return [...list].sort((a, b) => b.date.localeCompare(a.date));
  }, [transactions, activeMonth]);

  const summary = useMemo(() => totals(visible), [visible]);

  function addTransaction(tx: Transaction) {
    setTransactions((prev) => [tx, ...prev]);
  }

  function deleteTransaction(id: string) {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  }

  return (
    <main className="app">
      <header className="topbar">
        <h1>{t(lang, "title")}</h1>
        <button type="button" className="ghost" onClick={() => setLang(lang === "en" ? "am" : "en")}>
          {t(lang, "switchTo")}
        </button>
      </header>

      <SummaryCards
        lang={lang}
        income={summary.income}
        expenses={summary.expenses}
        balance={summary.balance}
      />

      <div className="layout">
        <TransactionForm lang={lang} onAdd={addTransaction} />

        <section className="card">
          <div className="section-head">
            <h2>{t(lang, "transactions")}</h2>
            <label className="inline">
              <span className="muted small">{t(lang, "filterMonth")}</span>
              <select value={activeMonth} onChange={(e) => setMonth(e.target.value)}>
                <option value="all">{t(lang, "allMonths")}</option>
                {months.map((m) => (
                  <option key={m} value={m}>
                    {formatMonth(m, lang)}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <TransactionList items={visible} lang={lang} onDelete={deleteTransaction} />
        </section>
      </div>

      <section className="card">
        <h2>{t(lang, "breakdown")}</h2>
        <CategoryBars items={visible} lang={lang} />
      </section>
    </main>
  );
}
