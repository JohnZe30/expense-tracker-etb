import { categoryKey, t } from "../i18n";
import type { Lang } from "../i18n";
import { categoryTotals, formatAmount } from "../lib/utils";
import type { Transaction } from "../types";

interface Props {
  items: Transaction[];
  lang: Lang;
}

export default function CategoryBars({ items, lang }: Props) {
  const rows = categoryTotals(items);

  if (rows.length === 0) {
    return <p className="muted">{t(lang, "noExpensesMonth")}</p>;
  }

  const max = rows[0].total;

  return (
    <ul className="bars">
      {rows.map(({ category, total }) => (
        <li key={category}>
          <div className="bar-label">
            <span>{t(lang, categoryKey(category))}</span>
            <span>
              {formatAmount(total)} {t(lang, "currency")}
            </span>
          </div>
          <div className="bar-track">
            <div className="bar-fill" style={{ width: `${(total / max) * 100}%` }} />
          </div>
        </li>
      ))}
    </ul>
  );
}
