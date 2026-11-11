import { t } from "../i18n";
import type { Lang } from "../i18n";
import { formatAmount } from "../lib/utils";

interface Props {
  lang: Lang;
  income: number;
  expenses: number;
  balance: number;
}

export default function SummaryCards({ lang, income, expenses, balance }: Props) {
  const currency = t(lang, "currency");

  const cards = [
    { label: t(lang, "balance"), value: balance, className: balance >= 0 ? "income" : "expense" },
    { label: t(lang, "income"), value: income, className: "income" },
    { label: t(lang, "expenses"), value: expenses, className: "expense" },
  ];

  return (
    <section className="summary">
      {cards.map((card) => (
        <div className="card stat" key={card.label}>
          <span className="muted">{card.label}</span>
          <strong className={card.className}>
            {formatAmount(card.value)} <small>{currency}</small>
          </strong>
        </div>
      ))}
    </section>
  );
}
