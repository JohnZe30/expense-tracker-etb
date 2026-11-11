# Expense Tracker (ETB)

A small expense tracker for Ethiopian Birr (ETB) with English and Amharic (አማርኛ) interfaces. Built with React, TypeScript and Vite.

## Features
- Add income and expenses with a description, amount in ETB, category and date
- Summary cards for balance, income and expenses
- Filter transactions by month
- Spending breakdown by category
- Switch between English and Amharic (the choice is remembered)
- Data is saved in the browser's localStorage, so it survives a page reload

## Run it locally
You need Node.js 18 or newer.

```bash
npm install
npm run dev
```

Open the address shown in the terminal (usually http://localhost:5173).

## Build for production
```bash
npm run build
npm run preview
```

## Deploy
Push the project to GitHub, then import it at vercel.com. Vercel detects Vite automatically.

## Project structure
```
src/
  App.tsx                  Main screen, state, filters
  App.css                  Styles
  main.tsx                 Entry point
  types.ts                 Shared types (Transaction, Category)
  i18n.ts                  English and Amharic text, translation helper
  storage.ts               Load and save to localStorage
  lib/utils.ts             Pure helper functions (totals, formatting, months)
  components/
    TransactionForm.tsx    Add income or expense (with validation)
    TransactionList.tsx    List of transactions with delete
    SummaryCards.tsx       Balance, income and expenses
    CategoryBars.tsx       Expense breakdown by category
```

## Notes
- Dates use the Gregorian calendar. Supporting the Ethiopian calendar would be a good next step.
- Amounts are shown with two decimal places and thousands separators.
- The Amharic text should be reviewed by a native speaker before you publish the app.
