import { DeleteIcon } from "@chakra-ui/icons";
import {
  Badge,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Switch,
  Td,
  Textarea,
  Tooltip,
  Tr,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { MdOutlineDataSaverOn } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteBlog, updateBlog } from "../redux/actions/adminActions";
import ConfirmRemovalAlert from "./ConfirmRemovalAlert";

const BlogTableItem = ({ blog }) => {
  const cancelRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, settitle] = useState(blog.title);
  const [category, setCategory] = useState(blog.category);
  const [blogIsNew, setBlogIsNew] = useState(blog.blogIsNew);
  const [description, setDescription] = useState(blog.description);
  const [image, setImage] = useState(blog.image.substring(8));
  const dispatch = useDispatch();

  const onSaveBlog = () => {
    console.log(blog);
    dispatch(
      updateBlog(title, image, category, description, blogIsNew, blog._id)
    );
  };

  const openDeleteConfirmBox = () => {
    onOpen();
  };

  return (
    <>
      <Tr>
        <Td>
          <Flex direction="column" gap="2">
            <Input
              size="sm"
              value={title}
              onChange={(e) => setName(e.target.value)}
            />
          </Flex>
        </Td>
        <Td>
          <Flex direction="column" gap="2">
            <Input
              size="sm"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Flex>
        </Td>
        <Td>
          <Input
            size="sm"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <Tooltip label={blog.image} fontSize="sm">
            <Image src={blog.image} boxSize="100px" fit="contain" />
          </Tooltip>
        </Td>
        <Td>
          <Textarea
            w="270px"
            h="120px"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            size="sm"
          />
        </Td>
        <Td>
          <Flex direction="column" gap="2">
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="blogIsNewFlag" mb="0" fontSize="sm">
                Enable
                <Badge
                  rounded="full"
                  px="1"
                  mx="1"
                  fontSize="0.8em"
                  colorScheme="green"
                >
                  New
                </Badge>
                badge ?
              </FormLabel>
              <Switch
                id="blogIsNewFlag"
                onChange={() => setBlogIsNew(!blogIsNew)}
                isChecked={blogIsNew}
              />
            </FormControl>
          </Flex>
        </Td>
        <Td>
          <VStack>
            <Button
              colorScheme="red"
              w="160px"
              variant="outline"
              onClick={openDeleteConfirmBox}
            >
              <DeleteIcon mr="5px" />
              Remove Blog
            </Button>
            <Button
              colorScheme="Gray"
              w="160px"
              variant="outline"
              onClick={onSaveBlog}
            >
              <MdOutlineDataSaverOn style={{ marginRight: "5px" }} />
              Save Changes
            </Button>
          </VStack>
        </Td>
      </Tr>
      <ConfirmRemovalAlert
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        cancelRef={cancelRef}
        itemToDelete={blog}
        deleteAction={deleteBlog}
      />
    </>
  );
};

export default BlogTableItem;
