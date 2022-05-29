import { StyleSheet } from "react-native";
import Theme from "../utils/theme";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { IExpense } from "../constants/types";
import { MaterialIcons } from "@expo/vector-icons";
import { ExpenseContext } from "../store/ExenpenseProvider";
import { useContext } from "react";
import { VStack, Box, Divider, Input, Icon } from "native-base";
import AddFilesSVG from "../assets/SVG/AddFilesSVG";
const SearchBar = () => {
  return (
    <VStack
      my="4"
      space={5}
      w="100%"
      maxW="300px"
      divider={
        <Box px="2">
          <Divider />
        </Box>
      }>
      <VStack w="100%" space={5} alignSelf="center">
        <Input
          placeholder="Search Expenses "
          width="100%"
          borderRadius="4"
          py="3"
          px="1"
          fontSize="14"
          InputLeftElement={
            <Icon
              m="2"
              ml="3"
              size="6"
              color="gray.400"
              as={<MaterialIcons name="search" />}
            />
          }
        />
      </VStack>
    </VStack>
  );
};

export default function HomeScreen({
  navigation,
}: RootTabScreenProps<"HomeScreen">) {
  const expenseDataTx = useContext(ExpenseContext);

  const expenseInfo = expenseDataTx.expenses;

  //  sum the results
  const expenseTotal = expenseInfo.map((expense: IExpense) =>
    Number(expense.amount)
  );

  const reducer = (accumulator: number, currentValue: number) =>
    accumulator + currentValue;

  return (
    <View style={styles.container}>
      <>
        <SearchBar />
        <Text style={styles.title}>
          Track Expenses{" "}
          {expenseTotal.length > 0 ? expenseTotal.reduce(reducer) : "😅"}
        </Text>
        {expenseTotal.length > 0 ? (
          expenseInfo.map((item: IExpense, index) => {
            return (
              <View>
                <View style={styles.expenseContainer} key={index}>
                  <View style={styles.internalContainer}>
                    {/* if(snippet.length > 1024) {
text = snippet.substring(0, 1024)//cuts to 1024
last = text.lastIndexOf(" ")//gets last space (to avoid cutting the middle of a word)
text = text.substring(0, last)//cuts from last space (to avoid cutting the middle of a word)
text = text + ` (...)`//adds (...) at the end to show that it's cut
} */}
                    <Text style={styles.expenseTitle}>{item.title}</Text>
                    <Text style={styles.expenseType}>
                      {item.expenseCategory}
                    </Text>
                  </View>
                  <View style={styles.amountContainer}>
                    <Text style={styles.amountText}>{item.amount}</Text>
                  </View>
                </View>
              </View>
            );
          })
        ) : (
          <View style={styles.svgIllustrator}>
            <AddFilesSVG />
          </View>
        )}
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
    top: 25,
    marginBottom: 55,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  svgIllustrator: {
    height: 450,
    width: 280,
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
    left: 252,
    backgroundColor: "#7f7d7d",
    padding: 8,
    borderTopRightRadius: 40,
    borderBottomRightRadius: 40,
    height: 70,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    top: -29,
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
