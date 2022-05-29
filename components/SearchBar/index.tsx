import { Dispatch, SetStateAction } from "react";
import { VStack, Box, Divider, Input, Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

interface IQuerysetQuery {
  setQuery: Dispatch<SetStateAction<string>>;
  searchQuery: string;
}

const SearchBar = ({ searchQuery, setQuery }: IQuerysetQuery) => {
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
