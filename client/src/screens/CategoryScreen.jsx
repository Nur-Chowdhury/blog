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
import { useParams } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import { getBlogsByCategory } from "../redux/actions/blogActions";

const CategoryScreen = () => {
  const dispatch = useDispatch();
  const { category } = useParams();
  const blogList = useSelector((state) => state.blogs);
  const { error, loading, blogsByCategory } = blogList;

  useEffect(() => {
    dispatch(getBlogsByCategory(category));
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
        blogsByCategory.map((blog) => (
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

export default CategoryScreen;
