import { useContext } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { LineChart, PieChart } from "react-native-chart-kit";
import SwipeableViews from "react-swipeable-views-native";

import { AntDesign } from "@expo/vector-icons";
import { Text, View } from "../components/Themed";
import { ExpenseContext } from "../store/ExenpenseProvider";
import theme from "../utils/theme";

export default function TabTwoScreen() {
  const expenseDataTx = useContext(ExpenseContext);

  const expensesDistributionList = expenseDataTx.expenses;

  const screenWidth = Dimensions.get("window").width;

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  return (
    <View style={styles.container}>
      <SwipeableViews style={styles.slideContainer}>
        <View style={[styles.slide]}>
          <View style={styles.nameContainer}>
            <Text style={styles.text}>Expenditure Trend </Text>
            {/* @ts-ignore */}
            <AntDesign
              name="swapright"
              size={24}
              color="black"
              style={{ left: 72, fontSize: 30 }}
            />
          </View>

          <LineChart
            data={{
              labels: ["January", "February", "March", "April", "May", "June"],
              datasets: [
                {
                  data: [123, 0, 20, 450, 27500, 20],
                },
              ],
            }}
            width={340} // from react-native
            height={220}
            yAxisLabel="Ave "
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: theme.colors.secondary,
              backgroundGradientFrom: theme.colors.primary,
              backgroundGradientTo: "#5a4f4f",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#555555",
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
        <View style={[styles.slide]}>
          <View style={styles.nameContainer}>
            {/* @ts-ignore */}
            <AntDesign
              name="swapleft"
              size={24}
              color="black"
              style={{ right: 65, fontSize: 30 }}
            />
            <Text style={styles.text}>Expenditure Distrbution </Text>
          </View>

          <PieChart
            data={expensesDistributionList}
            width={screenWidth}
            height={300}
            chartConfig={chartConfig}
            accessor={"amount"}
            backgroundColor={"transparent"}
            paddingLeft={"15"}
            center={[10, 0]}
            absolute
          />
        </View>
      </SwipeableViews>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    height: Dimensions.get("screen").height,
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
  slideContainer: {
    height: Dimensions.get("screen").height,
  },
  slide: {
    height: Dimensions.get("screen").height,
    alignItems: "center",
    flex: 1,
  },
  text: {
    fontSize: 16,
    fontStyle: "italic",
  },
  nameContainer: {
    top: 50,
    marginBottom: 100,
    flexDirection: "row",
  },
});
