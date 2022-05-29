import { StyleSheet } from "react-native";
import Theme from "../utils/theme";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { ExpenseContext } from "../store/ExenpenseProvider";
import { useContext } from "react";

export default function HomeScreen({
  navigation,
}: RootTabScreenProps<"HomeScreen">) {
  const expenseDataTx = useContext(ExpenseContext);

  const expenseInfo = expenseDataTx.expenses;

  return (
    <View style={styles.container}>
      <>
        <Text style={styles.title}>Track Expenses </Text>
        {expenseInfo.map((item, index) => {
          return (
            <View>
              <View style={styles.expenseContainer} key={index}>
                <View style={styles.internalContainer}>
                  <Text>{item.title}</Text>
                  <Text>{item.expenseCategory}</Text>
                </View>
                <View style={styles.amountContainer}>
                  <Text>{item.amount}</Text>
                </View>
              </View>
            </View>
          );
        })}
      </>
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
    width: 333,
    height: 70,
    borderRadius: 40,
    top: 12,
    marginBottom: 10,
    padding: 12,
  },
  internalContainer: {
    flexDirection: "row",
    backgroundColor: "transparent",
  },
  amountContainer: {
    left: 250,
    backgroundColor: "pink",
    padding: 8,
    borderTopRightRadius: 40,
    borderBottomRighttRadius: 40,
    height: 70,
    width: 70,
    top: -30,
  },
});