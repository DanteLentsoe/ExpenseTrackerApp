import React, { createContext, useState } from "react";
import { IExpense } from "../constants/types";

const intialState = {
  expenses: [
    {
      title: "Expense Name",
      expenseCategory: "Entertainment",
      amount: 12,
    },
    {
      title: " How",
      expenseCategory: "Travel",
      amount: 120,
    },
    {
      title: " One Man",
      expenseCategory: "Education",
      amount: 40,
    },
  ],
  addExpense: (expense: IExpense) => {},
  removeExpense: (expense: IExpense) => {},
};
export const ExpenseContext = createContext(intialState);

const ExpenseProvider = ({ children }: any) => {
  const [favoriteMealIDS, setFavoriteMealIDS] = useState<
    Array<IExpense> | undefined
  >([]);

  const addExpenseMeal = (expense: IExpense) => {
    setFavoriteMealIDS((previousFavoriteIDS) => [
      ...previousFavoriteIDS,
      expense,
    ]);
  };
  const removeExpense = (expense: IExpense) => {
    setFavoriteMealIDS((previousFavoriteIDS) =>
      previousFavoriteIDS.filter((mealID: IExpense) => mealID !== expense)
    );
  };

  const values = {
    expenses: favoriteMealIDS,
    addExpense: addExpenseMeal,
    removeExpense: removeExpense,
  };
  return (
    <ExpenseContext.Provider value={values}>{children}</ExpenseContext.Provider>
  );
};

export default ExpenseProvider;
