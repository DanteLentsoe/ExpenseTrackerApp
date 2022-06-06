import { StatusBar } from "expo-status-bar";
import {
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { AddExpenseSchema } from "../utils/validation";
import { IExpense } from "../constants/types";
import { AntDesign } from "@expo/vector-icons";
import Theme from "../utils/theme";
import { Formik } from "formik";
import { Text, View } from "../components/Themed";
import { useContext } from "react";
import { Stack, FormControl, Button, Input } from "native-base";
import { ExpenseContext } from "../store/ExenpenseProvider";
import { RootTabScreenProps } from "../types";

export default function ExpenseAdditionScreen({
  navigation,
}: RootTabScreenProps<"HomeScreen">) {
  const expenseTX = useContext(ExpenseContext);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.title}>{"Expense"}</Text>
        <Stack space="4">
          <Formik
            initialValues={{
              id: Math.random().toFixed(5),
              title: "",
              expenseCategory: "",
              amount: 0,
              date: "",
            }}
            validationSchema={AddExpenseSchema}
            onSubmit={(values: IExpense) => {
              console.log(values);
              expenseTX.addExpense(values);
              navigation.goBack();
            }}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              errors,
              touched,
              values,
            }) => (
              <>
                <FormControl w={280} marginBottom={3}>
                  <FormControl.Label mb="1">Expense Name</FormControl.Label>
                  <Input
                    variant="filled"
                    placeholder="Enter Expense Name"
                    onChangeText={handleChange("title")}
                    onBlur={handleBlur("title")}
                    value={values.title}
                  />
                  {errors.title && touched.title && (
                    <Text style={styles.errorText}>{errors.title}</Text>
                  )}

                  <FormControl.Label mb="1" mt={3}>
                    Expense Type
                  </FormControl.Label>
                  <Input
                    variant="filled"
                    placeholder="Enter Expense Type"
                    onChangeText={handleChange("expenseCategory")}
                    onBlur={handleBlur("expenseCategory")}
                    value={values.expenseCategory}
                  />
                  {errors.expenseCategory && touched.expenseCategory && (
                    <Text style={styles.errorText}>
                      {errors.expenseCategory}
                    </Text>
                  )}

                  <FormControl.Label mb="1">Expense Date </FormControl.Label>
                  <Input
                    variant="filled"
                    placeholder="Expense Date"
                    onChangeText={handleChange("date")}
                    onBlur={handleBlur("date")}
                    value={values.date}
                  />
                  {errors.date && touched.date && (
                    <Text style={styles.errorText}>{errors.date}</Text>
                  )}

                  <FormControl.Label mb="1" mt={3}>
                    Amount Expense
                  </FormControl.Label>
                  <Input
                    variant="filled"
                    placeholder="Amount Expense "
                    onChangeText={handleChange("amount")}
                    onBlur={handleBlur("amount")}
                    keyboardType="numeric"
                    // @ts-ignore
                    value={values.amount}
                  />
                  {errors.amount && touched.amount && (
                    <Text style={styles.errorText}>{errors.amount}</Text>
                  )}
                </FormControl>

                <Button
                  onPress={() => {
                    handleSubmit();
                  }}
                  color={Theme.colors.primary}
                  endIcon={
                    // @ts-ignore
                    <AntDesign size={24} name="plus" color={"#ffffff"} />
                  }>
                  Add Expense
                </Button>
              </>
            )}
          </Formik>
        </Stack>
        <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      </View>
    </TouchableWithoutFeedback>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  expenseContainer: {
    backgroundColor: Theme.colors.primary,
  },
  errorText: {
    color: "#aa1515",
  },
});
