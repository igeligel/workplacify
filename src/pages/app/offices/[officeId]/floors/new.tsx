import { Link } from "@chakra-ui/next-js";
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
import { useRouter } from "next/router";
import { FiX } from "react-icons/fi";

import { FormFloorAdd } from "../../../../../components/FormFloorAdd";
import { getMessages } from "../../../../../messages/getMessages";
import { appAuthRedirect } from "../../../../../server/nextMiddleware/appAuthRedirect";
import { useOfficeFloorFormStore } from "../../../../../stores/officeFloorFormStore";
import { trpc } from "../../../../../utils/trpc";

const FloorAddPage = () => {
  const router = useRouter();
  const { name, description, desks, imageUrl } = useOfficeFloorFormStore();
  const createFloorMutation = trpc.floor.createFloor.useMutation();

  const officeId =
    typeof router.query.officeId === "string" ? router.query.officeId : null;

  const onSaveClick = async () => {
    if (!officeId) return;
    await createFloorMutation.mutateAsync({
      officeId: officeId,
      name: name,
      description,
      imageUrl,
      desks: desks,
    });
    router.push(`/app/offices/${officeId}`);
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
              as={Link}
              href={`/app/offices/${officeId}`}
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
              Add a floor
            </Heading>
          </HStack>
          <HStack>
            {/* <Button variant={"outline"}>Save and add more</Button> */}
            <Button
              colorScheme="orange"
              backgroundColor={"orange.400"}
              textColor={"white"}
              _hover={{
                backgroundColor: "orange.500",
              }}
              onClick={onSaveClick}
            >
              Save floor
            </Button>
          </HStack>
        </Box>
      </Box>
      <Divider />
      <Container maxW={"container.xl"} paddingTop={4}>
        <VStack width={"100%"} alignItems={"flex-start"} spacing={4}>
          <Heading as={"h1"} fontSize={"lg"} color={"gray.700"}>
            Floor Information
          </Heading>

          <VStack width={"100%"} alignItems={"flex-start"} spacing={3}>
            <FormFloorAdd />
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

  const messages = await getMessages(context);

  return {
    props: {
      session,
      messages,
    },
  };
};

export default FloorAddPage;
