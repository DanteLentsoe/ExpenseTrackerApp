import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

import { RootStackParamList } from "../types";

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Root: {
        screens: {
          HomeScreen: {
            screens: {
              HomeScreen: "one",
            },
          },
          TabTwo: {
            screens: {
              ExpenseAnalytics: "two",
            },
          },
        },
      },
      ExpenseAdditionScreen: "ExpenseAdditionScreen",
      NotFound: "*",
    },
  },
};

export default linking;
