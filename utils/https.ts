import { IExpense } from "../constants/types";
import axios from "axios";

const BASE_URL =
  "https://expense-tracker-app-716f0-default-rtdb.firebaseio.com/expenses.json";

export const storeExpenseData = (expense: IExpense) => {
  axios.post(`${BASE_URL}`, expense);
};

export const getExpenseData = async () => {
  const res = await axios.get(`${BASE_URL}`);

  const expensesData = [] as IExpense[];

  for (const key in res.data) {
    const expensePayload: IExpense = {
      id: key,
      amount: res.data[key].amount,
      color: res.data[key].color,
      date: res.data[key].date,
      expenseCategory: res.data[key].expenseCategory,
      legendFontColor: res.data[key].legendFontColor,
      legendFontSize: res.data[key].legendFontSize,
      name: res.data[key].name,
    };

    expensesData.push(expensePayload);
  }
  return expensesData;
};
