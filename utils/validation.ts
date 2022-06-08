import * as Yup from "yup";

export const AddExpenseSchema = Yup.object().shape({
  expenseCategory: Yup.string()
    .min(2, "Too Short!")
    .max(25, "Too Long!")
    .required("Please select expense category"),
  name: Yup.string()
    .min(2, "Name is too short!")
    .max(25, "Name is too long!")
    .required("Expense name is required"),
  amount: Yup.number().required("An amount is required"),

  date: Yup.string().required("Please enter a date when expense occurred"),
});
