import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Spinner,
  Stack,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  Wrap,
  useToast,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs, resetBlogError } from "../redux/actions/blogActions";

import AddNewBlog from "./AddNewBlog";
import BlogTableItem from "./BlogTableItem";

const BlogsTab = () => {
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);
  const { error, loading } = admin;
  const blogInfo = useSelector((state) => state.blogs);
  const { blogs, blogUpdate } = blogInfo;
  const toast = useToast();

  useEffect(() => {
    dispatch(getBlogs());
    dispatch(resetBlogError());
    if (blogUpdate) {
      toast({
        description: "Blog has been updated.",
        status: "success",
        isClosable: true,
      });
    }
  }, [dispatch, toast, blogUpdate]);

  return (
    <Box>
      {error && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Upps!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {loading ? (
        <Wrap justify="center">
          <Stack direction="row" spacing="4">
            <Spinner
              mt="20"
              thickness="2px"
              speed="0.65s"
              emptyColor="gray.200"
              color="orange.500"
              size="xl"
            />
          </Stack>
        </Wrap>
      ) : (
        <Box>
          <Accordion allowToggle>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="right">
                    <Box>
                      <Text mr="8px" fontWeight="bold">
                        Add a new Blog
                      </Text>
                    </Box>
                  </Box>
                </AccordionButton>
              </h2>
              <AccordionPanel pb="4">
                <Table>
                  <Tbody>
                    <AddNewBlog />
                  </Tbody>
                </Table>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
          <Table variant="simple" size="lg">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Category</Th>
                <Th>Images</Th>
                <Th>Description</Th>
                <Th>New Badge</Th>
              </Tr>
            </Thead>
            <Tbody>
              {blogs.length > 0 &&
                blogs.map((blog) => (
                  <BlogTableItem key={blog._id} blog={blog} />
                ))}
            </Tbody>
          </Table>
        </Box>
      )}
    </Box>
  );
};

export default BlogsTab;
