import {
  Box,
  Center,
  Divider,
  HStack,
  IconButton,
  Link,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import SubscriptionCard from "./Sub";

const Footer = () => {
  // Share function (you can implement sharing logic here)
  const shareWebsite = () => {
    // Implement your sharing logic here
    alert("Share the website");
  };
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box>
      <Box marginY={5} display={{ base: "block", md: "none" }}>
        <SubscriptionCard />
      </Box>
      <Box
        bg={useColorModeValue("gray.300", "gray.900")}
        color={useColorModeValue("gray.900", "gray.300")}
        py={4}
      >
        <Center>
          <HStack spacing={4}>
            <Link href="#" fontSize="xl">
              <FaFacebook />
            </Link>
            <Link href="#" fontSize="xl">
              <FaTwitter />
            </Link>
            <Link href="#" fontSize="xl">
              <FaInstagram />
            </Link>
            <Link href="#" fontSize="xl">
              <FaLinkedin />
            </Link>
          </HStack>
        </Center>
        <Divider my={4} borderColor="gray.700" />
        <Center flexDirection="column">
          <Text fontSize="sm" my={2}>
            &copy; {new Date().getFullYear()} Your Website. All rights reserved.
          </Text>
          <HStack spacing={4}>
            <Link href="#" fontSize="sm">
              Terms of Use
            </Link>
            <Link href="#" fontSize="sm">
              Privacy Policy
            </Link>
          </HStack>
        </Center>
        <Box position="absolute" right="2" bottom="2">
          <IconButton
            aria-label="Share website"
            icon={<FiShare2 />}
            size="sm"
            colorScheme="teal"
            onClick={shareWebsite}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
