import { StatusBar } from "expo-status-bar";
import {
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
} from "react-native";
import DatePicker from "react-native-datepicker";
import { AddExpenseSchema } from "../utils/validation";
import { IExpense } from "../constants/types";
import { AntDesign } from "@expo/vector-icons";
import Toast from "react-native-root-toast";
import Theme from "../utils/theme";
import { Formik } from "formik";
import { Text, View } from "../components/Themed";
import { useContext } from "react";
import { Stack, FormControl, Button, ScrollView } from "native-base";
import { ExpenseContext } from "../store/ExenpenseProvider";
import { RootTabScreenProps } from "../types";
import { storeExpenseData } from "../utils/https";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
              name: "",
              expenseCategory: "",
              amount: undefined,
              date: "",
              color: "#" + Math.floor(Math.random() * 16777215).toString(16),
              legendFontColor: Theme.colors.primary,
              legendFontSize: 12,
            }}
            validationSchema={AddExpenseSchema}
            onSubmit={async (values: IExpense) => {
              try {
                expenseTX.addExpense(values);
                storeExpenseData(values);
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
              setFieldValue,
            }) => (
              <>
                <ScrollView>
                  <FormControl
                    w={380}
                    marginTop={10}
                    marginBottom={3}
                    alignItems={"center"}>
                    <FormControl.Label mb="1" right={115}>
                      Expense Name
                    </FormControl.Label>
                    <TextInput
                      placeholder="Enter Expense Name"
                      onChangeText={handleChange("name")}
                      onBlur={handleBlur("name")}
                      value={values.name}
                      style={styles.inputStyles}
                    />
                    {errors.name && touched.name && (
                      <Text style={styles.errorText}>{errors.name}</Text>
                    )}

                    <FormControl.Label mb="1" mt={3} right={115}>
                      Expense Type
                    </FormControl.Label>
                    <TextInput
                      dataDetectorTypes="phoneNumber"
                      placeholder="Enter Expense Type"
                      onChangeText={handleChange("expenseCategory")}
                      onBlur={handleBlur("expenseCategory")}
                      value={values.expenseCategory}
                      style={styles.inputStyles}
                    />
                    {errors.expenseCategory && touched.expenseCategory && (
                      <Text style={styles.errorText}>
                        {errors.expenseCategory}
                      </Text>
                    )}

                    <FormControl.Label mb="-15" mt={5} right={115}>
                      Expense Date{" "}
                    </FormControl.Label>
                    <DatePicker
                      style={{
                        ...styles.datePickerStyle,
                        ...styles.inputStyles,
                      }}
                      date={values.date} //initial date from state
                      mode="date" //The enum of date, datetime and time
                      placeholder="select date"
                      format="YYYY-MM-DD"
                      maxDate={new Date()}
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      onBlur={handleBlur("date")}
                      value={values.date}
                      customStyles={{
                        dateIcon: {
                          position: "absolute",
                          right: 0,
                          top: 4,
                          marginRight: 0,
                        },
                        dateInput: {
                          marginLeft: -220,
                          borderWidth: 0,
                        },
                      }}
                      onDateChange={handleChange("date")}
                    />

                    {errors.date && touched.date && (
                      <Text style={styles.errorText}>{errors.date}</Text>
                    )}

                    <FormControl.Label mt={3} right={105}>
                      Amount Expense
                    </FormControl.Label>
                    <TextInput
                      placeholder="Amount Expense "
                      onBlur={handleBlur("amount")}
                      style={styles.inputStyles}
                      keyboardType="numeric"
                      onChangeText={(value) => {
                        const input = Number(value);
                        setFieldValue("amount", input);
                      }}
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
                    style={{ ...styles.button }}
                    color={Theme.colors.primary}
                    endIcon={
                      // @ts-ignore
                      <AntDesign size={24} name="plus" color={"#ffffff"} />
                    }>
                    Add Expense
                  </Button>
                </ScrollView>
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
  inputStyles: {
    elevation: 4,
    paddingHorizontal: 24,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
    shadowColor: "#D0D4D9",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    width: 333,
    height: 50,
    backgroundColor: "#ffffff",
    borderColor: "#d0d4d9",
    borderWidth: 1,
    borderRadius: 12,
  },
  button: {
    width: 333,
    top: 20,
    left: 23,
    backgroundColor: Theme.colors.primary,
    borderRadius: 6,
    shadowColor: Theme.colors.primary,

    elevation: 2,
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowRadius: 6,
    shadowOpacity: 0.26,
  },
});
