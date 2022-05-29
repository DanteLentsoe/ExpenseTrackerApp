import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";
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
    <View style={styles.container}>
      <Text style={styles.title}>{"Expense"}</Text>
      <Stack space="4">
        <Formik
          initialValues={{ title: "", expenseCategory: "", amount: 0 }}
          onSubmit={(values: IExpense) => {
            console.log(values);
            expenseTX.addExpense(values);
          }}>
          {({ handleChange, handleBlur, handleSubmit, values }) => (
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

                <FormControl.Label mb="1" mt={3}>
                  Amount Expense
                </FormControl.Label>
                <Input
                  variant="filled"
                  placeholder="Amount Expense "
                  onChangeText={handleChange("amount")}
                  onBlur={handleBlur("amount")}
                  keyboardType="numeric"
                  value={values.amount}
                />
              </FormControl>

              <Button
                onPress={() => {
                  handleSubmit();
                  navigation.goBack();
                }}
                color={Theme.colors.primary}
                endIcon={<AntDesign size={24} name="plus" color={"#ffffff"} />}>
                Add Expense
              </Button>
            </>
          )}
        </Formik>
      </Stack>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
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
});
