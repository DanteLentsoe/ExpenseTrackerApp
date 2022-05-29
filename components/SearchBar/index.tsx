import { Dispatch, SetStateAction } from "react";
import { VStack, Box, Divider, Input, Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

interface IQuerysetQuery {
  setQuery: Dispatch<SetStateAction<string>>;
  searchQuery: string;
}

const SearchBar = ({ searchQuery, setQuery }: IQuerysetQuery) => {
  return (
    <VStack my="4" space={5} w="100%" maxW="330px" style={styles.inputStyles}>
      <VStack w="100%" space={5} alignSelf="center">
        <Input
          placeholder="Search Expenses "
          width="100%"
          py="3"
          px="1"
          fontSize="15"
          borderWidth="0"
          borderRadius={40}
          overflowX={"hidden"}
          overflow="hidden"
          value={searchQuery}
          onChangeText={(text) => setQuery(text)}
          InputLeftElement={
            <Icon
              m="2"
              ml="3"
              size="6"
              color="gray.400"
              //   @ts-ignore
              as={<MaterialIcons name="search" />}
            />
          }
        />
      </VStack>
    </VStack>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  inputStyles: {
    borderRadius: 40,
    backgroundColor: "#ffffff",
    shadowColor: "#222222",
    elevation: 4,
    shadowOffset: {
      height: 4,
      width: 0,
    },
    shadowRadius: 6,
    shadowOpacity: 0.26,
  },
});
