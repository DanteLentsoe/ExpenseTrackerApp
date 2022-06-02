export interface IExpense {
  id?: string;
  title: string;
  expenseCategory: string;
  amount: number | string;
  date: string;
}
