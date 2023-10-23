import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  HStack,
  Icon,
  IconButton,
  Link,
  Spacer,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { GiTechnoHeart } from "react-icons/gi";
import { Link as ReactLink } from "react-router-dom";
import SearchBar from "./searchbar";

const links = [
  { linkName: "Blogs", path: "/blogs" },
  { linkName: "My Gallery", path: "/gallery" },
  { linkName: "About Me", path: "/about_me" },
  { linkName: "Contact Me", path: "/notify" },
];

const NavLink = ({ path, children }) => (
  <Link
    as={ReactLink}
    to={path}
    p={2}
    rounded={"md"}
    _hover={{
      textDecoration: "bold",
      color: useColorModeValue("green.300", "green.700"),
    }}
  >
    {children}
  </Link>
);

const Navbar = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box>
      <Box
        bg={useColorModeValue("gray.300", "gray.900")}
        color={useColorModeValue("gray.900", "gray.300")}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <Box p={6}>
            <Link as={ReactLink} to={"/"}>
              <Flex alignItems={"center"}>
                <Icon as={GiTechnoHeart} h={6} w={6} color={"green.700"} />
                <Text fontWeight={"extrabold"} color={"green.700"}>
                  LOGO
                </Text>
              </Flex>
            </Link>
          </Box>
          <Spacer />
          <HStack p={10}>
            <Box display={{ base: "none", md: "flex" }}>
              <SearchBar />
            </Box>
            <Box p={6}>
              <Flex alignItems={"center"}>
                <NavLink>
                  <Icon
                    as={colorMode === "light" ? MoonIcon : SunIcon}
                    alignSelf={"center"}
                    onClick={() => toggleColorMode()}
                  />
                </NavLink>
              </Flex>
            </Box>
          </HStack>
        </Flex>
      </Box>
      <Flex
        w={"100%"}
        alignItems={"center"}
        justifyContent={"space-around"}
        py={5}
        display={{ base: "none", md: "flex" }}
      >
        <Flex
          w={"70%"}
          alignItems={"center"}
          justifyContent={"space-around"}
          borderBottomWidth={"5px"}
          borderBottomColor={useColorModeValue("green.300", "green.700")}
          py={2}
        >
          <HStack as="nav" spacing={65}>
            {links.map((link) => (
              <NavLink key={link.linkName} path={link.path}>
                {link.linkName}
              </NavLink>
            ))}
          </HStack>
        </Flex>
      </Flex>
      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            <Box>
              <SearchBar />
            </Box>
            {links.map((link) => (
              <NavLink key={link.linkName} path={link.path}>
                {link.linkName}
              </NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default Navbar;
