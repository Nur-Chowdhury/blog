import {
  Box,
  Button,
  Center,
  Circle,
  Flex,
  Image,
  Link,
  Stack,
  Tag,
  Text,
  Wrap,
  WrapItem,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <Stack
      p={2}
      spacing={3}
      bg={useColorModeValue("white", "gray.800")}
      w={"300px"}
      h={"100%"}
      borderWidth={"1px"}
      rounded={"lg"}
      shadow={"lg"}
      position={"relative"}
    >
      {blog.blogIsNew && (
        <Circle
          size={"10px"}
          position={"absolute"}
          top={3}
          right={3}
          bg={"green.400"}
        />
      )}
      <Image
        src={blog.image}
        alt={blog.title}
        roundedTop={"lg"}
        w={"100%"}
        h={"40%"}
      />
      <Wrap spacing={"3px"} justify={"center"} minH={"5vh"}>
        {blog.blogIsNew && (
          <WrapItem mt={1} spacing={2} key={"key"}>
            <Tag key={"New"} variant={"outline"}>
              New
            </Tag>
          </WrapItem>
        )}
        <WrapItem mt={1} spacing={2} key={blog.category}>
          <Tag key={blog.category} variant={"outline"}>
            {blog.category}
          </Tag>
        </WrapItem>
      </Wrap>
      <Flex mt={1} justifyContent={"space-between"} alignContent={"center"}>
        <Link
          as={ReactLink}
          to={`/blogs/${blog._id}`}
          pt={2}
          cursor={"pointer"}
        >
          <Box fontSize={"2xl"} fontWeight={"semibold"} lineHeight={"tight"}>
            {blog.title}
          </Box>
        </Link>
      </Flex>
      <Flex mt={1} justifyContent={"space-between"} alignContent={"center"}>
        <Text noOfLines={[1, 2]} fontSize={"sm"}>
          {blog.description}
        </Text>
      </Flex>
      <Center my={2}>
        <Link
          as={ReactLink}
          to={`/blogs/${blog._id}`}
          pt={2}
          cursor={"pointer"}
        >
          <Button colorScheme={"gray"}>Read More</Button>
        </Link>
      </Center>
    </Stack>
  );
};

export default BlogCard;
