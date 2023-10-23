import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Spinner,
  Stack,
  Tag,
  Text,
  VStack,
  Wrap,
  WrapItem,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CommentCard from "../components/CommentCard";
import { getBlog } from "../redux/actions/blogActions";

const SingleBlogScreen = () => {
  const [commentBoxOpen, setCommentBoxOpen] = useState(false);
  const toast = useToast();
  const { id } = useParams();
  const blogPost = useSelector((state) => state.blogs);
  const { blog, loading, error } = blogPost;
  const dispatch = useDispatch();

  useEffect(() => {
    window.scroll(0, 0);
    dispatch(getBlog(id));
  }, [dispatch, id]);

  return (
    <VStack spacing="30px" minH="100vh">
      {loading ? (
        <Stack directin="row" spacing="4">
          <Spinner
            mt="20"
            thickness="2px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Stack>
      ) : error ? (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>We are sorry!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        blog && (
          <Container maxW="4xl" px={{ base: "0", md: "8" }} minH="4xl">
            <Image src={blog.image} w={"100vW"} h={"500px"} />
            <Heading marginY={5} textAlign="center" size="lg">
              {blog.title}
            </Heading>
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
            <Flex width="full" py="2" justifyContent="left" px="2">
              <Text>{new Date(blog.updatedAt).toDateString()}</Text>
            </Flex>
            <Text
              px="2"
              mt="5"
              lineHeight={{ base: "7", md: "8" }}
              fontSize={{ base: "md", md: "lg" }}
            >
              {blog.description}
            </Text>
            <>
              <Button
                my="20px"
                w="200px"
                colorScheme="green"
                onClick={() => setCommentBoxOpen(!commentBoxOpen)}
              >
                Write a Comment
              </Button>
              {commentBoxOpen && <CommentCard id={blog._id} />}
              <Stack>
                <Text fontSize="xl" fontWeight="bold">
                  Comments
                </Text>
                <Stack spacing="10px">
                  {blog.comments.map((cmnt) => (
                    <Box key={cmnt._id}>
                      <Flex spacing="2px" alignItems="center">
                        <Text fontSize="lg" color="gray.400">
                          By {cmnt.name},{" "}
                          {new Date(cmnt.createdAt).toDateString()}
                        </Text>
                      </Flex>
                      <Box py="12px">{cmnt.commentText}</Box>
                    </Box>
                  ))}
                </Stack>
              </Stack>
            </>
          </Container>
        )
      )}
    </VStack>
  );
};

export default SingleBlogScreen;
