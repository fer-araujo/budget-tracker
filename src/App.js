import { useState } from "react";
import AddBudgetModal from "./components/AddBudgetModal";
import AddExpenseModal from "./components/AddExpenseModal";
import ViewExpensesModal from "./components/ViewExpensesModal";
import BudgetCard from "./components/BudgetCard";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from "./context/BudgetsContext";

function App() {
  const [addBudgetModal, setAddBudgetModal] = useState(false);
  const [addExpenseModal, setAddExpenseModal] = useState(false);
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] =
    useState(null);
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
  const { budgets, getBudgetsExpenses } = useBudgets();

  function openAddExpenseModal(budgetId) {
    setAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  }

  return (
    <>
      <div className="min-h-screen w-full p-4 bg-no-repeat bg-center bg-cover bg-gradient-to-br from-gray-100 via-gray-200 to-gray-400  flex-column justify-center items-center content-center">
        <div className="flex-column justify-center items-center sm:flex w-full mb-10 ">
          {/* <div className=" w-1/2 bg-green-400 justify-center sm:justify-start my-4 sm:my-0"> */}
          <h1 className="w-full sm:w-1/2 text-center text-4xl text-gray-800 font-bold my-4">
            Budgets
          </h1>
          {/* </div> */}
          <div className=" w-full sm:w-1/2 flex justify-center sm:justify-start">
            <button
              className="w-auto flex justify-center items-center px-4 h-10 bg-green-700 hover:bg-green-800 text-white font-normal rounded"
              onClick={() => setAddBudgetModal(true)}
            >
              Add Budget
            </button>
            <button
              className="w-auto flex justify-center items-center px-4 h-10 ml-2 border border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white hover:border-none font-normal rounded"
              onClick={openAddExpenseModal}
            >
              Add Expense
            </button>
          </div>
        </div>
        <div className="w-full sm:grid sm:grid-cols-cards gap-4 items-start justify-center px-4 ">
          {budgets?.map((budget) => {
            const amount = getBudgetsExpenses(budget.id).reduce(
              (total, expense) => total + expense.amount,
              0
            );
            return (
              <BudgetCard
                key={budget.id}
                name={budget.name}
                amount={amount}
                max={budget.max}
                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                onViewExpensesClick={() =>
                  setViewExpensesModalBudgetId(budget.id)
                }
              />
            );
          })}
          <UncategorizedBudgetCard
            onAddExpenseClick={openAddExpenseModal}
            onViewExpensesClick={() => setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)}
          />
          <TotalBudgetCard />
        </div>
      </div>

      <AddBudgetModal
        show={addBudgetModal}
        handleClose={() => setAddBudgetModal(false)}
      />
      <AddExpenseModal
        show={addExpenseModal}
        defaultBudgetId={addExpenseModalBudgetId}
        handleClose={() => setAddExpenseModal(false)}
      />

      <ViewExpensesModal
        budgetId={viewExpensesModalBudgetId}
        handleClose={() => setViewExpensesModalBudgetId(null)}
      />
    </>
  );
}

export default App;
