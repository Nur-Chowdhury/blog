import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Container,
  FormControl,
  Heading,
  Stack,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import PasswordTextField from "../components/PasswordTextField";
import TextField from "../components/Textfield";
import { login } from "../redux/actions/adminActions";

const LoginScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const redirect = "/";
  const toast = useToast();

  const admin = useSelector((state) => state.admin);
  const { loading, error, adminInfo } = admin;

  const headingBr = useBreakpointValue({ base: "xs", md: "sm" });
  const boxBr = useBreakpointValue({ base: "transparant", md: "bg-surface" });

  useEffect(() => {
    if (adminInfo) {
      if (location.state?.from) {
        navigate(location.state.from);
      } else {
        navigate(redirect);
      }
      toast({
        description: "Login Successful",
        status: "success",
        isClosable: true,
      });
    }
  }, [adminInfo, redirect, error, navigate, location.state, toast]);

  return (
    <Formik
      initialValues={{ name: "", password: "" }}
      validationSchema={Yup.object({
        name: Yup.string().required("Admin Name is required."),
        password: Yup.string()
          .min(4, "Password is too short.")
          .required("Password is required."),
      })}
      onSubmit={(values) => {
        dispatch(login(values.name, values.password));
      }}
    >
      {(formik) => (
        <Container
          maxW={"lg"}
          py={{ base: 12, md: 24 }}
          px={{ base: 0, md: 8 }}
          minH={"4xl"}
        >
          <Stack spacing={6}>
            <Stack spacing={{ base: 2, md: 3 }} textAlign={"center"}>
              <Heading size={headingBr}>Admin-Login</Heading>
            </Stack>
            <Box
              px={{ base: 4, md: 10 }}
              py={{ base: 0, md: 8 }}
              bg={boxBr}
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
                      placeholder={"Username"}
                      label={"name"}
                    />
                    <PasswordTextField
                      type={"password"}
                      name={"password"}
                      placeholder={"Password"}
                      label={"password"}
                    />
                  </FormControl>
                </Stack>
                <Stack spacing={6}>
                  <Button
                    colorScheme="blue"
                    size={"lg"}
                    fontSize={"md"}
                    isLoading={loading}
                    type="submit"
                  >
                    Login
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Container>
      )}
    </Formik>
  );
};

export default LoginScreen;
