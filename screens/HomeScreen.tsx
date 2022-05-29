import {
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { useState } from "react";
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
export default function HomeScreen({
  navigation,
}: RootTabScreenProps<"HomeScreen">) {
  const [query, setQuery] = useState<string>("");
  const expenseDataTx = useContext(ExpenseContext);

  const expenseInfo = expenseDataTx.expenses;

  //  sum the results
  const expenseTotal = expenseInfo.map((expense: IExpense) =>
    Number(expense.amount)
  );

  const reducer = (accumulator: number, currentValue: number) =>
    accumulator + currentValue;

  const options = {
    includeScore: true,
    keys: ["title", "expenseCategory"],
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
              {expenseTotal.length > 0 ? expenseTotal.reduce(reducer) : "😅"}
            </Text>

            {expenseTotal.length > 0 ? (
              expensesResults.map((item: IExpense, index) => {
                return (
                  <View style={styles.expenseContainer} key={index}>
                    <View style={styles.internalContainer}>
                      <Text style={styles.expenseTitle}>{item.title}</Text>
                      <Text style={styles.expenseType}>
                        {item.expenseCategory}
                      </Text>
                    </View>
                    <View style={styles.amountContainer}>
                      <Text style={styles.amountText}>{item.amount}</Text>
                    </View>
                  </View>
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
    height: window.window.height <= 780 ? 230 : 300,
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
    backgroundColor: "#7f7d7d",
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
