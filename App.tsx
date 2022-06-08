import { StatusBar } from "expo-status-bar";
import { SSRProvider } from "@react-aria/ssr";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ExpenseProvider from "./store/ExenpenseProvider";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { NativeBaseProvider } from "native-base";
import { RootSiblingParent } from "react-native-root-siblings";
export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SSRProvider>
        <SafeAreaProvider>
          <ExpenseProvider>
            <RootSiblingParent>
              <NativeBaseProvider>
                <Navigation colorScheme={colorScheme} />
                <StatusBar />
              </NativeBaseProvider>
            </RootSiblingParent>
          </ExpenseProvider>
        </SafeAreaProvider>
      </SSRProvider>
    );
  }
}
