import {
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Icon,
  IconButton,
  Link,
  Separator,
  VStack,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useTranslations } from "next-intl";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { FiX } from "react-icons/fi";

import { FormFloorAdd } from "../../../../../components/FormFloorAdd";
import { getMessages } from "../../../../../messages/getMessages";
import { appAuthRedirect } from "../../../../../server/nextMiddleware/appAuthRedirect";
import { useOfficeFloorFormStore } from "../../../../../stores/officeFloorFormStore";
import { trpc } from "../../../../../utils/trpc";

const FloorAddPage = () => {
  const t = useTranslations("OfficePages");
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
          <HStack gap={"3"}>
            <IconButton
              size={"sm"}
              variant={"ghost"}
              aria-label={"close"}
              as={Link}
              asChild
            >
              <NextLink href={`/app/offices/${officeId}`}>
                <Icon as={FiX} />
              </NextLink>
            </IconButton>

            <Box height={"100%"} paddingY={"2"}>
              <Separator orientation="vertical" />
            </Box>
            <Heading
              as={"h1"}
              color={"gray.700"}
              fontWeight={500}
              fontSize={"md"}
            >
              {t("headingAddFloor")}
            </Heading>
          </HStack>
          <HStack>
            {/* <Button variant={"outline"}>Save and add more</Button> */}
            <Button
              colorPalette="orange"
              backgroundColor={"orange.400"}
              color={"white"}
              _hover={{
                backgroundColor: "orange.500",
              }}
              onClick={onSaveClick}
            >
              {t("buttonSaveFloor")}
            </Button>
          </HStack>
        </Box>
      </Box>
      <Separator />
      <Container maxW={"container.xl"} paddingTop={4}>
        <VStack width={"100%"} alignItems={"flex-start"} gap={4}>
          <Heading as={"h1"} fontSize={"lg"} color={"gray.700"}>
            {t("headingFloorInformation")}
          </Heading>

          <VStack width={"100%"} alignItems={"flex-start"} gap={3}>
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
