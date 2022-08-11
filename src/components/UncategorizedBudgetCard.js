import React from "react";
import BudgetCard from "./BudgetCard";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../context/BudgetsContext";

function UncategorizedBudgetCard(props) {
  const { getBudgetsExpenses } = useBudgets();

  const amount = getBudgetsExpenses(UNCATEGORIZED_BUDGET_ID).reduce(
    (total, expense) => total + expense.amount,
    0
  );

  if (amount === 0) return null;

  return <BudgetCard amount={amount} name="Uncategorized" {...props} />;
}

export default UncategorizedBudgetCard;
