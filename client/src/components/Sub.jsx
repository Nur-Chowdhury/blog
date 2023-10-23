import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Container,
  FormControl,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { subscribe } from "../redux/actions/subsActions";
import TextField from "./Textfield";

function SubscriptionCard() {
  const dispatch = useDispatch();
  const toast = useToast();

  const sub = useSelector((state) => state.subs);
  const { loading, error, subsInfo } = sub;

  useEffect(() => {
    if (subsInfo) {
      toast({
        description: "Subscription successful.",
        status: "success",
        isClosable: true,
      });
    }
  }, [subsInfo, error, toast]);

  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Invalid email.")
          .required("An email is required."),
      })}
      onSubmit={(values) => {
        dispatch(subscribe(values.email));
      }}
    >
      {(formik) => (
        <Container p={4} borderWidth="1px" borderRadius="md">
          <Stack>
            <Stack as="form" onSubmit={formik.handleSubmit}>
              {error && (
                <Alert
                  status="error"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  textAlign="center"
                >
                  <AlertIcon />
                  <AlertTitle>Upps!</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <Stack>
                <FormControl>
                  <TextField
                    type="text"
                    name="email"
                    placeholder="you@example.com"
                    label="Email"
                  />
                </FormControl>
              </Stack>
              <Stack>
                <Button
                  colorScheme="red"
                  fontSize="md"
                  isLoading={loading}
                  type="submit"
                >
                  Subscribe
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Container>
      )}
    </Formik>
  );
}

export default SubscriptionCard;
