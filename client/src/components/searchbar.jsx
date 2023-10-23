import { SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Input,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex align="center">
      <Input
        placeholder="Find blogs..."
        value={query}
        onChange={handleInputChange}
        marginRight="1"
        borderWidth={2}
        borderColor={useColorModeValue("gray.900", "gray.300")}
      />
      <Button
        colorScheme="teal"
        leftIcon={<SearchIcon />}
        onClick={handleSearch}
      >
        Search
      </Button>
    </Flex>
  );
}

export default SearchBar;
