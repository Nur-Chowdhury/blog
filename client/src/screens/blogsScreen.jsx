import { Center, Wrap, WrapItem } from "@chakra-ui/react";
import { blogs } from "../blogs";
import BlogCard from "../components/blogCard";

const BlogsScreen = () => {
  return (
    <Wrap spacing={"30px"} justify={"center"} minH={"100vh"}>
      {blogs.map((blog) => (
        <WrapItem key={blog._id}>
          <Center w={"300px"} h={"600px"}>
            <BlogCard blog={blog} />
          </Center>
        </WrapItem>
      ))}
    </Wrap>
  );
};

export default BlogsScreen;
