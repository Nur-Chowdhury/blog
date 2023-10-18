import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Center,
  Spinner,
  Stack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogCard from "../components/BlogCard";
import { getBlogs } from "../redux/actions/blogActions";

const BlogsScreens = () => {
  const dispatch = useDispatch();
  const blogList = useSelector((state) => state.blogs);
  const { loading, error, blogs } = blogList;

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  return (
    <Wrap spacing={"30px"} justify={"center"} minH={"100vh"}>
      {loading ? (
        <Stack direction={"row"} spacing={4}>
          <Spinner
            mt={20}
            thickness="2px"
            speed=".65s"
            emptyColor="gray.200"
            color="orange.600"
            size={"xl"}
          />
        </Stack>
      ) : error ? (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Upps!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        blogs.map((blog) => (
          <WrapItem key={blog._id}>
            <Center h={"500px"}>
              <BlogCard blog={blog} />
            </Center>
          </WrapItem>
        ))
      )}
    </Wrap>
  );
};

export default BlogsScreens;
