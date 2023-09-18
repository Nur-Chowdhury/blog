import {
  Box,
  Button,
  Center,
  Circle,
  Flex,
  HStack,
  Image,
  Link,
  Stack,
  Tag,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const arr = blog.category;
  return (
    <Stack
      p={2}
      spacing={3}
      bg={useColorModeValue("white", "gray.800")}
      minW={"300px"}
      h={"600px"}
      borderWidth={"1px"}
      rounded={"lg"}
      shadow={"lg"}
      position={"relative"}
    >
      {blog.isNew && (
        <Circle
          size={"10px"}
          position={"absolute"}
          top={2}
          right={2}
          bg={"green.400"}
        />
      )}
      <Image src={blog.image} alt={blog.name} roundedTop={"lg"} h={"50%"} />
      <HStack mt={2} spacing={3}>
        {blog.isNew && (
          <Tag key={"New"} variant={"outline"}>
            New
          </Tag>
        )}
        {arr.map((item) => (
          <Tag key={item} variant={"outline"}>
            {item}
          </Tag>
        ))}
      </HStack>
      <Flex mt={1} justifyContent={"space-between"} alignContent={"center"}>
        <Link
          as={ReactLink}
          to={`/blogs/${blog._id}`}
          pt={2}
          cursor={"pointer"}
        >
          <Box fontSize={"2xl"} fontWeight={"semibold"} lineHeight={"tight"}>
            {blog.name}
          </Box>
        </Link>
      </Flex>
      <Flex mt={1} justifyContent={"space-between"} alignContent={"center"}>
        <Text noOfLines={[1, 2, 3]} fontSize={"sm"}>
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
          <Button colorScheme="green">Read More</Button>
        </Link>
      </Center>
    </Stack>
  );
};

export default BlogCard;
