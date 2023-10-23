import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  FormControl,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import TextField from "../components/Textfield";
import {
  createBlogCommnet,
  resetBlogError,
} from "../redux/actions/blogActions";

const CommentCard = ({ id }) => {
  console.log(id);
  const dispatch = useDispatch();
  const toast = useToast();
  const blogPost = useSelector((state) => state.blogs);
  const { loading, error, commentSend } = blogPost;

  useEffect(() => {
    if (commentSend) {
      toast({
        description: "Comment saved!",
        status: "success",
        isClosable: true,
      });
    }
  }, [commentSend, toast]);

  return (
    <Formik
      initialValues={{ name: "", email: "", commentText: "" }}
      validationSchema={Yup.object({
        name: Yup.string(),
        email: Yup.string()
          .email("Invalid email.")
          .required("An email is required."),
        commentText: Yup.string().required("Comment is required."),
      })}
      onSubmit={(values) => {
        dispatch(
          createBlogCommnet(id, values.name, values.email, values.commentText)
        );
        dispatch(resetBlogError);
      }}
    >
      {(formik) => (
        <Box>
          <Stack spacing={6}>
            <Box
              px={{ base: 4, md: 10 }}
              py={{ base: 0, md: 8 }}
              boxShadow={{ base: "none", md: "xl" }}
            >
              <Stack spacing={6} as={"form"} onSubmit={formik.handleSubmit}>
                {error && (
                  <Alert
                    status="error"
                    flexDirection={"column"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    textAlign={"center"}
                  >
                    <AlertIcon />
                    <AlertTitle>Upps!</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <Stack spacing={5}>
                  <FormControl>
                    <TextField
                      type={"text"}
                      name={"name"}
                      placeholder={"Name (Optional)"}
                      label={"name"}
                    />
                    <TextField
                      type="text"
                      name="email"
                      placeholder="you@example.com"
                      label="Email*"
                    />
                    <TextField
                      type="text"
                      name="commentText"
                      placeholder="Your Comment..."
                      label="Comment*"
                    />
                  </FormControl>
                </Stack>
                <Stack spacing={6}>
                  <Button
                    colorScheme="green"
                    size={"lg"}
                    fontSize={"md"}
                    isLoading={loading}
                    type="submit"
                  >
                    Publish
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Box>
      )}
    </Formik>
  );
};

export default CommentCard;
