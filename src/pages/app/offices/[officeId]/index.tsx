import {
  Box,
  Button,
  Container,
  Heading,
  Icon,
  Link,
  Separator,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useTranslations } from "next-intl";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { FiChevronLeft, FiPlus } from "react-icons/fi";

import { DisplayFloors } from "../../../../components/DisplayFloors";
import { DisplayOfficeSettings } from "../../../../components/DisplayOfficeSettings";
import { getMessages } from "../../../../messages/getMessages";
import { appAuthRedirect } from "../../../../server/nextMiddleware/appAuthRedirect";
import { trpc } from "../../../../utils/trpc";

const OfficePage = () => {
  const t = useTranslations("OfficePages");
  const router = useRouter();

  const officeId = router.query.officeId;
  const getOfficeQuery = trpc.office.get.useQuery(
    {
      id: officeId as string,
    },
    {
      enabled: typeof officeId === "string",
    },
  );

  if (getOfficeQuery.isLoading) {
    return <Spinner />;
  }

  if (!getOfficeQuery.data) {
    return (
      <VStack>
        <Text>{t("labelOfficeNotFound")}</Text>
        <Button
          asChild
          backgroundColor={"orange.400"}
          color={"white"}
          textDecoration={"none"}
          _hover={{
            textDecoration: "none",
            backgroundColor: "orange.500",
          }}
        >
          <NextLink href={"/app/offices/new"}>{t("buttonAddOffice")}</NextLink>
        </Button>
      </VStack>
    );
  }

  return (
    <Container maxW={"container.2xl"}>
      <Link
        asChild
        textDecoration={"none"}
        color={"orange.400"}
        _hover={{
          textDecoration: "none",
          color: "orange.600",
        }}
      >
        <NextLink href={"/app/offices"}>
          <Icon as={FiChevronLeft} />
          {t("buttonBackToOffices")}
        </NextLink>
      </Link>
      <Box display={"flex"} justifyContent={"space-between"}>
        <VStack paddingTop={4} alignItems={"flex-start"}>
          <Heading as={"h1"} fontSize={"lg"} color={"gray.700"}>
            {t("headingOfficeName", { officeName: getOfficeQuery.data.name })}
          </Heading>
          <Text>
            {t("officeDescription", {
              officeDescription: getOfficeQuery.data.description,
            })}
          </Text>
        </VStack>
        <VStack>
          <Button
            asChild
            colorPalette="orange"
            backgroundColor={"orange.400"}
            color={"white"}
            textDecoration={"none"}
            _hover={{ backgroundColor: "orange.500", textDecoration: "none" }}
          >
            <NextLink
              href={`/app/offices/${getOfficeQuery.data.id}/floors/new`}
            >
              <Icon as={FiPlus} />
              {t("buttonAddFloor")}
            </NextLink>
          </Button>
        </VStack>
      </Box>
      <VStack marginTop={4} alignItems={"flex-start"} gap={1}>
        <Heading as={"h2"} fontSize={"md"} color={"gray.700"}>
          {t("headingFloors")}
        </Heading>
        <Separator />
        <DisplayFloors
          office={getOfficeQuery.data}
          floors={getOfficeQuery.data.floors}
        />
      </VStack>
      <Separator marginTop={4} />
      <Box marginTop={8}>
        <DisplayOfficeSettings />
      </Box>
    </Container>
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

export default OfficePage;
