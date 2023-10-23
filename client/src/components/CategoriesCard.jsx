import {
  Box,
  Link,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as ReactLink } from "react-router-dom";
import { getCategories } from "../redux/actions/blogActions";

const CategoriesCard = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const dispatch = useDispatch();
  const blogList = useSelector((state) => state.blogs);
  const { error, loading, categories } = blogList;

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <Box>
      <Stack>
        <Text fontSize="xl" fontWeight="bold">
          Categories
        </Text>
        <Box pl={10}>
          <Stack spacing={"10px"}>
            <ul>
              {categories.map((category) => (
                <Box key={category}>
                  <Link
                    as={ReactLink}
                    to={`/blogs/?category=${category}`}
                    p={2}
                    rounded={"md"}
                    _hover={{
                      textDecoration: "bold",
                      color: useColorModeValue("green.300", "green.700"),
                    }}
                    fontSize={"lg"}
                    fontWeight={"semibold"}
                  >
                    <li>{category}</li>
                  </Link>
                </Box>
              ))}
            </ul>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default CategoriesCard;
