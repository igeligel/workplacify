import {
  Box,
  Button,
  Container,
  Divider,
  HStack,
  Heading,
  Icon,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FiX } from "react-icons/fi";

const OfficesNewPage = () => {
  return (
    <VStack alignItems={"flex-start"}>
      <Box width={"100%"}>
        <Box display={"flex"} justifyContent={"space-between"}>
          <HStack spacing={"3"}>
            <IconButton
              size={"sm"}
              variant={"ghost"}
              aria-label={"close"}
              icon={<Icon as={FiX} />}
            />
            <Box height={"100%"} paddingY={"2"}>
              <Divider orientation="vertical" />
            </Box>
            <Heading
              as={"h1"}
              color={"gray.700"}
              fontWeight={500}
              fontSize={"md"}
            >
              Add a office
            </Heading>
          </HStack>
          <HStack>
            <Button variant={"outline"}>Save and add more</Button>
            <Button
              colorScheme="orange"
              backgroundColor={"orange.400"}
              textColor={"white"}
              _hover={{
                backgroundColor: "orange.500",
              }}
            >
              Save office
            </Button>
          </HStack>
        </Box>
      </Box>
      <Divider />
      <Container maxW={"container.sm"}>
        <Box>Office Information</Box>
      </Container>
    </VStack>
  );
};

export default OfficesNewPage;
