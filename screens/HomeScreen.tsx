import {
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import ExpenseCategoryModal from "../components/modals/ExpenseCategoryModal";
import { useState, useEffect } from "react";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { IExpense } from "../constants/types";
import { ExpenseContext } from "../store/ExenpenseProvider";
import { useContext } from "react";
import AddFilesSVG from "../assets/SVG/AddFilesSVG";
import Fuse from "fuse.js";
import SearchBar from "../components/SearchBar";
import window from "../constants/Layout";
import { ScrollView } from "native-base";
import theme from "../utils/theme";
import { getExpenseData } from "../utils/https";
export default function HomeScreen({
  navigation,
}: RootTabScreenProps<"HomeScreen">) {
  const [query, setQuery] = useState<string>("");
  const [modalPayload, setModalPayload] = useState<IExpense | undefined>(
    undefined
  );
  const [storedExpenses, setStoredExpenses] = useState<
    IExpense[] | undefined
  >();
  const [showModal, setShowModal] = useState(false);
  const expenseDataTx = useContext(ExpenseContext);

  const expenseInfo = expenseDataTx.expenses;

  /**** API /DATABASE  *****/

  // useEffect(() => {
  //   // const getDataFromAPI = async () => {
  //   //   const expensesLog = await getExpenseData();
  //   //   setStoredExpenses(expensesLog);
  //   //   expenseDataTx.setExpenseData(expensesLog);
  //   // };
  //   // getDataFromAPI();

  // }, []);

  //  sum the results
  const expenseTotal = expenseInfo.map((expense: IExpense) =>
    Number(expense.amount)
  );

  const reducer = (accumulator: number, currentValue: number) =>
    accumulator + currentValue;

  const options = {
    includeScore: true,
    keys: ["name", "expenseCategory"],
  };

  const reverseList = [...expenseInfo].reverse();

  const fuse = new Fuse(reverseList, options);

  //query results
  const results = fuse.search(query);

  const expensesResults = query
    ? results.map((expenses) => expenses.item)
    : reverseList;

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <>
        <View style={styles.container}>
          <SearchBar searchQuery={query} setQuery={setQuery} />
          <ScrollView>
            <Text style={{ ...styles.title, textAlign: "center" }}>
              Track Expenses{" "}
              {expenseTotal.length > 0
                ? expenseTotal.reduce(reducer).toFixed(2)
                : "😅"}
            </Text>

            {expenseTotal.length > 0 ? (
              expensesResults.map((item: IExpense, index) => {
                return (
                  <>
                    <Pressable
                      style={styles.expenseContainer}
                      key={item.id}
                      onPress={() => {
                        setShowModal(true);
                        setModalPayload(item);
                      }}>
                      <View style={styles.internalContainer}>
                        <Text style={styles.expenseTitle}>{item.name}</Text>
                        <Text style={styles.expenseType}>
                          {item.expenseCategory}
                        </Text>
                      </View>
                      <View style={styles.amountContainer}>
                        <Text style={styles.amountText}>{item.amount}</Text>
                      </View>
                    </Pressable>
                  </>
                );
              })
            ) : (
              <Pressable
                onPress={() => {
                  navigation.navigate("ExpenseAdditionScreen");
                }}
                style={styles.svgIllustrator}>
                <AddFilesSVG />
              </Pressable>
            )}
          </ScrollView>
        </View>
        <ExpenseCategoryModal
          showModal={showModal}
          setShowModal={setShowModal}
          modalPayload={modalPayload}
        />
      </>
    </TouchableWithoutFeedback>
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
    top: 25,
    marginBottom: 55,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  svgIllustrator: {
    height: window.window.height <= 780 ? 230 : 400,
    width: window.window.height <= 780 ? 220 : 320,
    top: window.window.height <= 780 ? 12 : 70,
  },
  expenseContainer: {
    backgroundColor: "#ffffff",
    width: 333,
    height: 70,
    borderRadius: 40,
    top: 4,
    marginBottom: 12,
    padding: 12,
    shadowColor: "#222222",
    elevation: 4,
    shadowOffset: {
      height: 4,
      width: 0,
    },
    shadowRadius: 6,
    shadowOpacity: 0.26,
  },
  internalContainer: {
    flexDirection: "row",
    backgroundColor: "transparent",
  },
  amountContainer: {
    left: 252,
    backgroundColor: theme.colors.primary,
    padding: 8,
    borderTopRightRadius: 40,
    borderBottomRightRadius: 40,
    height: 70,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    top: -28,
  },
  expenseTitle: {
    fontSize: 14,
    top: 12,
  },
  expenseType: {
    fontSize: 14,
    top: 12,
    left: 12,
  },
  amountText: {
    color: "#ffffff",
  },
});
