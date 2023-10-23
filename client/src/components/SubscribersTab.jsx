import { DeleteIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Spinner,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Wrap,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSubscriber,
  getAllSubscribers,
  resetErrorAndRemoval,
} from "../redux/actions/adminActions";
import ConfirmRemovalAlert from "./ConfirmRemovalAlert";

const SubscribersTab = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const [subscriberToDelete, setSubscriberToDelete] = useState("");
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);
  const user = useSelector((state) => state.user);
  const { error, loading, subRemoval, subList } = admin;
  console.log(subList);
  const { userInfo } = user;
  const toast = useToast();
  useEffect(() => {
    dispatch(getAllSubscribers());
    dispatch(resetErrorAndRemoval());
    if (subRemoval) {
      toast({
        description: "Subscriber has been removed!",
        status: "success",
        isClosable: true,
      });
    }
  }, [subRemoval, toast, dispatch]);

  const openDeleteConfirmBox = (subscriber) => {
    setSubscriberToDelete(subscriber);
    onOpen();
  };

  return (
    <div>
      <Box>
        {error && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>Upps!</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {loading ? (
          <Wrap justify={"center"}>
            <Stack direction={"row"} spacing={4}>
              <Spinner
                mt={20}
                thickness="2px"
                speed=".65s"
                emptyColor="gray.200"
                color="green.500"
                size={"xl"}
              />
            </Stack>
          </Wrap>
        ) : (
          <Box>
            <TableContainer>
              <Table variant={"simple"}>
                <Thead>
                  <Tr>
                    <Th>Email</Th>
                    <Th>Subscribed at</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {subList &&
                    subList.map((sub) => (
                      <Tr key={sub._id}>
                        <Td>{sub.email}</Td>
                        <Td>{new Date(sub.createdAt).toDateString()}</Td>
                        <Td>
                          <Button
                            variant={"outline"}
                            onClick={() => openDeleteConfirmBox(sub)}
                          >
                            <DeleteIcon mr={"5px"} />
                            Remove Subscriber
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </TableContainer>
            <ConfirmRemovalAlert
              isOpen={isOpen}
              onOpen={onOpen}
              onClose={onClose}
              cancelRef={cancelRef}
              itemToDelete={subscriberToDelete}
              deleteAction={deleteSubscriber}
            />
          </Box>
        )}
      </Box>
    </div>
  );
};

export default SubscribersTab;
