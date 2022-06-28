import React, { createContext, useState } from "react";
import { IExpense } from "../constants/types";

const intialState = {
  expenses: [] as IExpense[],
  addExpense: (expense: IExpense) => {},
  setExpenseData: (expense: IExpense[]) => {},
  removeExpense: (expense: IExpense) => {},
};
export const ExpenseContext = createContext(intialState);

const expensesReducer = (
  state: any[],
  action: { type: string; payload: { id: any; data: any } }
) => {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (expense: { id: any }) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case "DELETE":
      return state.filter(
        (expense: { id: any }) => expense.id !== action.payload
      );
    default:
      return state;
  }
};

const ExpenseProvider = ({ children }: any) => {
  const [expenseList, setExpenses] = useState<Array<IExpense> | undefined>([]);

  const addExpense = (expense: IExpense) => {
    setExpenses((previousFavoriteIDS) => [...previousFavoriteIDS, expense]);
  };
  const removeExpense = (expense: IExpense) => {
    setExpenses((previousFavoriteIDS) =>
      previousFavoriteIDS.filter((id: IExpense) => id !== expense)
    );
  };

  const setExpenseData = (expense: IExpense[]) => {
    return [...expense];
  };

  const values = {
    expenses: expenseList,
    addExpense: addExpense,
    removeExpense: removeExpense,
    setExpenseData: setExpenseData,
  };
  return (
    <ExpenseContext.Provider value={values}>{children}</ExpenseContext.Provider>
  );
};

export default ExpenseProvider;
