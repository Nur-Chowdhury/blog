import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Container,
  Flex,
  Heading,
  Image,
  Spinner,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBlog } from "../redux/actions/blogActions";

const SingleBlogScreen = () => {
  const { id } = useParams();
  const blogPostInfo = useSelector((state) => state.blogPosts);
  const { blogPost, loading, error } = blogPostInfo;
  const dispatch = useDispatch();

  useEffect(() => {
    window.scroll(0, 0);
    dispatch(getBlog(id));
  }, [id]);

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
        blogPost && (
          <Container
            maxW="4xl"
            py={{ base: "12", md: "24" }}
            px={{ base: "0", md: "8" }}
            minH="4xl"
          >
            <Heading textAlign="center" size="lg">
              {blogPost.title}
            </Heading>
            <Flex width="full" py="2" justifyContent="center" px="2">
              <Text> By {blogPost.author}</Text>
              <Text mx="2">|</Text>
              <Text>{new Date(blogPost.createdAt).toDateString()}</Text>
              <Text mx="2">|</Text>
              <Text>
                {blogPost.category.charAt(0).toUpperCase() +
                  blogPost.category.slice(1)}
              </Text>
            </Flex>
            <Stack p="2">
              <Image src={blogPost.image} />
            </Stack>

            <Text
              px="2"
              mt="5"
              lineHeight={{ base: "7", md: "8" }}
              fontSize={{ base: "md", md: "lg" }}
            >
              {blogPost.contentOne}
            </Text>
            <Box m="10"></Box>
            <Text
              px="2"
              mt="5"
              lineHeight={{ base: "7", md: "8" }}
              fontSize={{ base: "md", md: "lg" }}
            >
              {blogPost.contentTwo}
            </Text>
          </Container>
        )
      )}
    </VStack>
  );
};

export default SingleBlogScreen;