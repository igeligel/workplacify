import {
  Box,
  Button,
  Container,
  Divider,
  HStack,
  Heading,
  Icon,
  IconButton,
  VStack,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { FiX } from "react-icons/fi";

import { FormOfficeAdd } from "../../../../components/FormOfficeAdd";
import { appAuthRedirect } from "../../../../server/nextMiddleware/appAuthRedirect";
import { useOfficeFormStore } from "../../../../stores/officeFormStore";

const OfficesNewPage = () => {
  const name = useOfficeFormStore((state) => state.name);
  const description = useOfficeFormStore((state) => state.description);

  const onSaveClick = () => {
    console.log("name", name);
    console.log("description", description);
  };

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
              onClick={onSaveClick}
            >
              Save office
            </Button>
          </HStack>
        </Box>
      </Box>
      <Divider />
      <Container maxW={"container.sm"} paddingTop={4}>
        <VStack width={"100%"} alignItems={"flex-start"} spacing={4}>
          <Heading as={"h1"} fontSize={"lg"} color={"gray.700"}>
            Office Information
          </Heading>

          <VStack width={"100%"} alignItems={"flex-start"} spacing={3}>
            <FormOfficeAdd />
          </VStack>
        </VStack>
      </Container>
    </VStack>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { redirect, session } = await appAuthRedirect({
    context,
  });
  if (redirect) return { redirect };

  return {
    props: {
      session,
    },
  };
};

export default OfficesNewPage;
