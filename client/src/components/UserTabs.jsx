import { CheckCircleIcon, DeleteIcon } from "@chakra-ui/icons";
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
  deleteUser,
  getAllUsers,
  resetErrorAndRemoval,
} from "../redux/actions/adminActions";
import ConfirmRemovalAlert from "./ConfirmRemovalAlert";

const UserTabs = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const [userToDelete, setUserToDelete] = useState("");
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);
  const user = useSelector((state) => state.user);
  const { error, loading, userRemoval, userList } = admin;
  const { userInfo } = user;
  const toast = useToast();
  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(resetErrorAndRemoval());
    if (userRemoval) {
      toast({
        description: "User has been removed!",
        status: "success",
        isClosable: true,
      });
    }
  }, [userRemoval, toast, dispatch]);

  const openDeleteConfirmBox = (user) => {
    setUserToDelete(user);
    console.log(userToDelete);
    console.log(setUserToDelete);
    onOpen();
  };

  return (
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
                  <Th>Name</Th>
                  <Th>Registered</Th>
                  <Th>Admin</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {userList &&
                  userList.map((user) => (
                    <Tr key={user._id}>
                      <Td>
                        {user.name}{" "}
                        {user._id === userInfo._id ? (
                          <CheckCircleIcon color={"green.500"} />
                        ) : (
                          ""
                        )}
                      </Td>
                      <Td>{new Date(user.createdAt).toDateString()}</Td>
                      <Td>{user.is_admin === true ? "Admin" : "Not Admin"}</Td>
                      <Td>
                        <Button
                          isDisabled={user._id == userInfo._id}
                          variant={"outline"}
                          onClick={() => openDeleteConfirmBox(user)}
                        >
                          <DeleteIcon mr={"5px"} />
                          Remove User
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
            itemToDelete={userToDelete}
            deleteAction={deleteUser}
          />
        </Box>
      )}
    </Box>
  );
};

export default UserTabs;
