import { StatusBar } from "expo-status-bar";
import {
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import DatePicker from "react-native-datepicker";
import { AddExpenseSchema } from "../utils/validation";
import { IExpense } from "../constants/types";
import { AntDesign } from "@expo/vector-icons";
import Toast from "react-native-root-toast";
import Theme from "../utils/theme";
import { Formik } from "formik";
import { Text, View } from "../components/Themed";
import { useContext, useState } from "react";
import { Stack, FormControl, Button, Input } from "native-base";
import { ExpenseContext } from "../store/ExenpenseProvider";
import { RootTabScreenProps } from "../types";

export default function ExpenseAdditionScreen({
  navigation,
}: RootTabScreenProps<"HomeScreen">) {
  const expenseTX = useContext(ExpenseContext);
  const [date, setDate] = useState<string>("");
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.title}>{"Expense"}</Text>
        <Stack space="4">
          <Formik
            initialValues={{
              id: Math.random().toFixed(5),
              name: "",
              expenseCategory: "",
              amount: undefined,
              date: "",
              color: "#" + Math.floor(Math.random() * 16777215).toString(16),
              legendFontColor: Theme.colors.primary,
              legendFontSize: 12,
            }}
            validationSchema={AddExpenseSchema}
            onSubmit={(values: IExpense) => {
              try {
                console.log(values);
                expenseTX.addExpense(values);

                Toast.show("Expense Successfully added", {
                  duration: Toast.durations.SHORT,
                  position: Toast.positions.CENTER,
                  shadow: true,
                  animation: true,
                  hideOnPress: true,
                  delay: 0,
                  textColor: Theme.colors.primary,
                  containerStyle: {
                    height: 60,
                    justifyContent: "center",
                    alignItems: "center",
                    borderLeftWidth: 5,
                    borderColor: "green",
                    backgroundColor: "#ffffff",
                  },
                  onShow: () => {
                    // calls on toast\`s appear animation start
                  },
                  onShown: () => {
                    // calls on toast\`s appear animation end.
                  },
                  onHide: () => {
                    // calls on toast\`s hide animation start.
                  },
                  onHidden: () => {
                    // calls on toast\`s hide animation end.
                  },
                });

                navigation.goBack();
              } catch (error) {
                console.log("ERR ", error);
                Toast.show("Error: Expense Not Created", {
                  duration: Toast.durations.SHORT,
                  position: Toast.positions.CENTER,
                  shadow: true,
                  animation: true,
                  hideOnPress: true,
                  delay: 0,
                  textColor: Theme.colors.primary,
                  containerStyle: {
                    height: 60,
                    justifyContent: "center",
                    alignItems: "center",
                    borderLeftWidth: 5,
                    backgroundColor: "#ac2121",
                  },
                  onShow: () => {
                    // calls on toast\`s appear animation start
                  },
                  onShown: () => {
                    // calls on toast\`s appear animation end.
                  },
                  onHide: () => {
                    // calls on toast\`s hide animation start.
                  },
                  onHidden: () => {
                    // calls on toast\`s hide animation end.
                  },
                });
              }
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
                    onChangeText={handleChange("name")}
                    onBlur={handleBlur("name")}
                    value={values.name}
                  />
                  {errors.name && touched.name && (
                    <Text style={styles.errorText}>{errors.name}</Text>
                  )}

                  <FormControl.Label mb="1" mt={3}>
                    Expense Type
                  </FormControl.Label>
                  <Input
                    variant="filled"
                    dataDetectorTypes="phoneNumber"
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
                  <DatePicker
                    style={styles.datePickerStyle}
                    date={values.date} //initial date from state
                    mode="date" //The enum of date, datetime and time
                    placeholder="select date"
                    format="DD-MM-YYYY"
                    maxDate={new Date()}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    onBlur={handleBlur("date")}
                    value={values.date}
                    customStyles={{
                      dateIcon: {
                        //display: 'none',
                        position: "absolute",
                        left: 0,
                        top: 4,
                        marginLeft: 0,
                      },
                      dateInput: {
                        marginLeft: 36,
                      },
                    }}
                    // onChangeText={ }
                    onDateChange={handleChange("date")}
                  />
                  {/* <Input
                    variant="filled"
                    placeholder="Expense Date"
                    onChangeText={handleChange("date")}
                    onBlur={handleBlur("date")}
                    value={values.date}
                    type={"text"}
                  /> */}
                  {errors.date && touched.date && (
                    <Text style={styles.errorText}>{errors.date}</Text>
                  )}

                  <FormControl.Label mb="1" mt={3}>
                    Amount Expense
                  </FormControl.Label>
                  <Input
                    variant="filled"
                    placeholder="Amount Expense "
                    onBlur={handleBlur("amount")}
                    keyboardType="numeric"
                    onChangeText={handleChange("amount")}
                    value={values.amount as number}
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
  datePickerStyle: {
    width: 200,
    marginTop: 20,
  },
});
