import {
  Badge,
  Button,
  FormControl,
  FormLabel,
  Input,
  Switch,
  Td,
  Text,
  Textarea,
  Tooltip,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdDriveFolderUpload } from "react-icons/md";
import { useDispatch } from "react-redux";
import { uploadBlog } from "../redux/actions/adminActions";

const AddNewBlog = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [blogIsNew, setBlogIsNew] = useState(true);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const createNewBlog = () => {
    dispatch(uploadBlog({ name, category, image, blogIsNew, description }));
  };

  return (
    <Tr>
      <Td>
        <Text fontSize="sm">Name</Text>
        <Input
          size="sm"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
      </Td>
      <Td>
        <Text fontSize="sm">Category</Text>
        <Input
          size="sm"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
        />
      </Td>
      <Td>
        <Text fontSize="sm">Image File Name</Text>
        <Tooltip
          label={"Set the name of your image e.g., iPhone.jpg"}
          fontSize="sm"
        >
          <Input
            size="sm"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="e.g., myphoto.jpg"
          />
        </Tooltip>
      </Td>
      <Td>
        <Text fontSize="sm">Description</Text>
        <Textarea
          value={description}
          w="270px"
          h="120px"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          placeholder="Description"
          size="sm"
        />
      </Td>
      <Td>
        <Text fontSize="sm">New badge shown on blog card</Text>
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
            badge?
          </FormLabel>
          <Switch
            id="blogIsNewFlag"
            onChange={() => setBlogIsNew(!blogIsNew)}
            isChecked={blogIsNew}
          />
        </FormControl>
      </Td>
      <Td>
        <VStack>
          <Button
            variant="outline"
            w="160px"
            colorScheme="green"
            onClick={() => createNewBlog()}
          >
            <MdDriveFolderUpload />
            <Text ml="2">Save Blog</Text>
          </Button>
        </VStack>
      </Td>
    </Tr>
  );
};

export default AddNewBlog;
