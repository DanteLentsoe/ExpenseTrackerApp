export interface IExpense {
  id?: string;
  name: string;
  expenseCategory: string;
  amount: number;
  date?: string;
  color: string;
  legendFontColor: string;
  legendFontSize: number;
}
