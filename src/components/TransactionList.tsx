import { categoryKey, t } from "../i18n";
import type { Lang } from "../i18n";
import { formatAmount } from "../lib/utils";
import type { Transaction } from "../types";

interface Props {
  items: Transaction[];
  lang: Lang;
  onDelete: (id: string) => void;
}

export default function TransactionList({ items, lang, onDelete }: Props) {
  if (items.length === 0) {
    return <p className="muted">{t(lang, "noTransactions")}</p>;
  }

  return (
    <ul className="tx-list">
      {items.map((tx) => (
        <li key={tx.id} className="tx">
          <div>
            <strong>{tx.description}</strong>
            <div className="muted small">
              {t(lang, categoryKey(tx.category))} · {tx.date}
            </div>
          </div>
          <div className="tx-right">
            <span className={tx.type === "income" ? "income" : "expense"}>
              {tx.type === "income" ? "+" : "−"}
              {formatAmount(tx.amount)} {t(lang, "currency")}
            </span>
            <button
              type="button"
              className="ghost"
              onClick={() => onDelete(tx.id)}
              aria-label={`${t(lang, "delete")}: ${tx.description}`}
            >
              {t(lang, "delete")}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
