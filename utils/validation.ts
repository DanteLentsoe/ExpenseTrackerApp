import * as Yup from "yup";

export const AddExpenseSchema = Yup.object().shape({
  expenseCategory: Yup.string()
    .min(2, "Too Short!")
    .max(25, "Too Long!")
    .required("Required"),
  title: Yup.string()
    .min(2, "Name is too short!")
    .max(25, "Name is too long!")
    .required("Required"),
  amount: Yup.number().required("Required"),
});
