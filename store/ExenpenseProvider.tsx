import React, { createContext, useState } from "react";
import { IExpense } from "../constants/types";

const intialState = {
  expenses: [] as IExpense[],
  addExpense: (expense: IExpense) => {},
  removeExpense: (expense: IExpense) => {},
};
export const ExpenseContext = createContext(intialState);

const ExpenseProvider = ({ children }: any) => {
  const [expenseList, setFavoriteMealIDS] = useState<
    Array<IExpense> | undefined
  >([]);

  const addExpense = (expense: IExpense) => {
    setFavoriteMealIDS((previousFavoriteIDS) => [
      ...previousFavoriteIDS,
      expense,
    ]);
  };
  const removeExpense = (expense: IExpense) => {
    setFavoriteMealIDS((previousFavoriteIDS) =>
      previousFavoriteIDS.filter((id: IExpense) => id !== expense)
    );
  };

  const values = {
    expenses: expenseList,
    addExpense: addExpense,
    removeExpense: removeExpense,
  };
  return (
    <ExpenseContext.Provider value={values}>{children}</ExpenseContext.Provider>
  );
};

export default ExpenseProvider;
