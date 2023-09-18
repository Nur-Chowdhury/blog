import { SearchIcon } from "@chakra-ui/icons";
import { Button, Flex, Input } from "@chakra-ui/react";
import { useState } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <Flex align="center">
      <Input
        placeholder="Find blogs..."
        value={query}
        onChange={handleInputChange}
        marginRight="1"
        borderWidth={2}
        borderColor={"gray.300"}
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
