import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { useBudgets, UNCATEGORIZED_BUDGET_ID } from "../context/BudgetsContext";
import { currencyFormatter } from "../utilities/Utilities";
import EditBudgetModal from "./EditBudgetModal";
import EditExpenseModal from "./EditExpenseModal";
import { MdOutlineEdit } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";

function ViewExpensesModal({ budgetId, handleClose }) {
  const [viewEditBudgetId, setViewEditBudgetId] = useState(null);
  const [budgetName, setBudgetName] = useState("");
  const [budgetMax, setBudgetMax] = useState("");

  const [viewEditExpenseId, setViewEditExpenseId] = useState(null);
  const [expenseDescription, setExpenseDescription] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");

  const { getBudgetsExpenses, budgets, deleteBudget, deleteExpense } =
    useBudgets();

  const expenses = getBudgetsExpenses(budgetId);

  const budget =
    UNCATEGORIZED_BUDGET_ID === budgetId
      ? { name: "Uncategorized", id: UNCATEGORIZED_BUDGET_ID }
      : budgets.find((b) => b.id === budgetId);
  return (
    <>
      <Dialog
        open={budgetId !== null}
        onClose={handleClose}
        className="relative z-50"
      >
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          {/* The actual dialog panel  */}
          <Dialog.Panel className="mx-auto max-w-2xl w-full p-8 rounded bg-white">
            <Dialog.Title
              as="h1"
              className="flex justify-between items-center text-2xl text-gray-800 font-bold my-4 pb-2  border-b"
            >
              Expenses - {budget?.name}
              {budgetId !== UNCATEGORIZED_BUDGET_ID && (
                <div className="flex justify-end items-center">
                  <button
                    className="text-gray-700 font-normal rounded-md  w-full sm:w-auto px-2 py-1 text-base text-center"
                    onClick={() => {
                      setViewEditBudgetId(budgetId);
                      setBudgetName(budget.name);
                      setBudgetMax(budget.max);
                      //   handleClose();
                    }}
                  >
                    <MdOutlineEdit />
                  </button>
                  <button
                    className="text-red-700 font-normal rounded-md  w-full sm:w-auto px-2 py-1 text-base text-center"
                    onClick={() => {
                      deleteBudget(budget);
                      handleClose();
                    }}
                  >
                    <MdOutlineDelete />
                  </button>
                </div>
              )}
            </Dialog.Title>
            <Dialog.Description as="div">
              <div className="flex-column justify-start items-center mb-6">
                {expenses.length === 0 ? (
                  <div className="flex justify-center">
                    <h2 className="text-gray-600 text-xl font-bold">
                      No expenses registered
                    </h2>
                  </div>
                ) : (
                  expenses.map((expense) => (
                    <div
                      className="flex justify-between items-center mb-2"
                      key={expense.id}
                    >
                      <div className="text-lg w-1/3">{expense.description}</div>
                      <div className="text-md w-1/3">
                        {currencyFormatter.format(expense.amount)}
                      </div>
                      <div className="flex justify-end items-center">
                        <button
                          className="text-gray-700 font-normal rounded-md  w-full sm:w-auto px-2 py-1 text-base text-center"
                          onClick={() => {
                            setViewEditExpenseId(expense.id);
                            setExpenseDescription(expense.description);
                            setExpenseAmount(expense.amount);
                            // handleClose();
                          }}
                        >
                          <MdOutlineEdit />
                        </button>
                        <button
                          className="text-red-700 font-normal rounded-md  w-full sm:w-auto px-2 py-1 text-base text-center"
                          onClick={() => {
                            deleteExpense(expense);
                            handleClose();
                          }}
                        >
                          <MdOutlineDelete />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="flex justify-end">
                <button
                  className="border border-gray-600 text-gray-600 font-normal rounded-md  w-full sm:w-auto px-3 py-1.5 text-center hover:bg-gray-600 hover:text-white"
                  onClick={handleClose}
                >
                  Cancel
                </button>
              </div>
            </Dialog.Description>
          </Dialog.Panel>
        </div>
      </Dialog>

      <EditBudgetModal
        id={viewEditBudgetId}
        budgetName={budgetName}
        budgetMax={budgetMax}
        handleClose={() => setViewEditBudgetId(null)}
      />
      <EditExpenseModal
        id={viewEditExpenseId}
        expenseDescription={expenseDescription}
        expenseAmount={expenseAmount}
        budgetId={budgetId}
        budgetName={budget?.name}
        handleClose={() => setViewEditExpenseId(null)}
      />
    </>
  );
}

export default ViewExpensesModal;
