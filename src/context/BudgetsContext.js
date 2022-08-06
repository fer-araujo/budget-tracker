import React, { useContext, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';

const BudgetsContext = React.createContext();

export function useBudgets(){
 return useContext(BudgetsContext)
}

export const BudgetProvider = ({ children }) => {

    const [budgets, setBudgets] = useState([]);
    const [expenses, setExpenses] = useState([])

    function getBudgetsExpenses(budgetId) {
        return expenses.filter(exp => exp.budgetId === budgetId);
    }

    function addExpense({description,amount,budgetId}){
        setExpenses(prevExpenses => {
            return [...prevExpenses, { id: uuidV4(), description, amount, budgetId}]
        })
    }

    function addBudget({ name, max }) {
        setBudgets(prevBudgets => {
            if(prevBudgets.find(b => b.name === name)){
                return prevBudgets
            } 
            return [...prevBudgets, { id: uuidV4(), name, max}]
        })
    }

    function deleteExpense({ id }) {
        setExpenses(prevExpenses => {
            return prevExpenses.filter(expense => expense.id !== id)
        })
    }

    function deleteBudget({ id }) {
        setBudgets(prevBudgets => {
            return prevBudgets.filter(budget => budget.id !== id)
        })
    }

    return <BudgetsContext.Provider value={{
        budgets,
        expenses,
        getBudgetsExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense
    }}>{children}</BudgetsContext.Provider>
}