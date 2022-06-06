import { useContext } from "react";
import { StyleSheet, Dimensions, Button } from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import SwipeableViews from "react-swipeable-views-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { ExpenseContext } from "../store/ExenpenseProvider";
import theme from "../utils/theme";

export default function TabTwoScreen() {
  const expenseDataTx = useContext(ExpenseContext);

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

  const data = [
    {
      name: "Seoul",
      population: 21500000,
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: theme.colors.primary,
      legendFontSize: 12,
    },
    {
      name: "Toronto",
      population: 2800000,
      color: "#F00",
      legendFontColor: theme.colors.primary,
      legendFontSize: 12,
    },
    {
      name: "Beijing",
      population: 527612,
      color: "red",
      legendFontColor: theme.colors.primary,
      legendFontSize: 12,
    },
    {
      name: "New York",
      population: 8538000,
      color: "pink",
      legendFontColor: theme.colors.primary,
      legendFontSize: 12,
    },
    {
      name: "Moscow",
      population: 11920000,
      color: "rgb(0, 0, 255)",
      legendFontColor: theme.colors.primary,
      legendFontSize: 12,
    },
  ];

  console.log("Yes Man", expenseDataTx);
  return (
    <View style={styles.container}>
      <SwipeableViews style={styles.slideContainer}>
        <View style={[styles.slide]}>
          <Text style={styles.text}>Consumption </Text>
          <LineChart
            data={{
              labels: ["January", "February", "March", "April", "May", "June"],
              datasets: [
                {
                  data: [20, 20, 20, 20, 20, 20],
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
          <Text style={styles.text}>slide n°2</Text>

          <PieChart
            data={data}
            width={screenWidth}
            height={300}
            chartConfig={chartConfig}
            accessor={"population"}
            backgroundColor={"transparent"}
            paddingLeft={"15"}
            center={[10, 0]}
            absolute
          />
        </View>
      </SwipeableViews>

      {/* <Text>Bezier Line Chart</Text>
      <LineChart
        data={{
          labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
              data: [20, 20, 20, 20, 20, 20],
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
      /> */}
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
    color: "#fff",
    fontSize: 16,
  },
});
