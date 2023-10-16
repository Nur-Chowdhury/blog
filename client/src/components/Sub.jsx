// src/components/SubscriptionCard.js
import { Button, Container, Input, Stack, useToast } from "@chakra-ui/react";
import React, { useState } from "react";

function SubscriptionCard() {
  const [email, setEmail] = useState("");
  const toast = useToast();

  const handleSubscribe = async () => {
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.status === 201) {
        // Subscription successful
        console.log("Subscription successful");
        setEmail("");
        toast({
          description: "Subscription Successful!",
          status: "success",
          isClosable: true,
        });
      } else {
        // Subscription failed
        console.error("Subscription failed");
        toast({
          description: "Subscribtion failed!",
          status: "failed",
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        description: "Subscribtion failed! Enter a Valid email.",
        status: "success",
        isClosable: true,
      });
    }
  };

  return (
    <Container p={4} borderWidth="1px" borderRadius="md">
      <Stack>
        <Stack>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            mb={2}
          />
        </Stack>
        <Stack>
          <Button colorScheme="red" onClick={handleSubscribe}>
            Subscribe
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}

export default SubscriptionCard;
