import {
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Icon,
  Tabs,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useTranslations } from "next-intl";
import NextLink from "next/link";
import { FiPlus } from "react-icons/fi";

import { TableOfficeList } from "../../../components/TableOfficeList";
import { getMessages } from "../../../messages/getMessages";
import { appAuthRedirect } from "../../../server/nextMiddleware/appAuthRedirect";

const OfficesPage = () => {
  const t = useTranslations("OfficePages");
  return (
    <Container maxW={"container.2xl"}>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Heading
          fontSize={{
            base: "xl",
            md: "2xl",
          }}
        >
          {t("headingOfficeList")}
        </Heading>

        <HStack>
          <Button
            asChild
            colorPalette="orange"
            backgroundColor={"orange.400"}
            color={"white"}
            textDecoration={"none"}
            _hover={{
              backgroundColor: "orange.500",
              textDecoration: "none",
            }}
            size={{ base: "sm", md: "md" }}
          >
            <NextLink href={"/app/offices/new"}>
              <Icon as={FiPlus} />
              {t("labelAddOffice")}
            </NextLink>
          </Button>
        </HStack>
      </Box>
      <Box>
        <Tabs.Root defaultValue="all-offices" colorPalette={"orange"}>
          <Tabs.List>
            <Tabs.Trigger value="all-offices">
              {t("labelAllOffices")}
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="all-offices" paddingX={{ base: 0, lg: 4 }}>
            <TableOfficeList />
          </Tabs.Content>
        </Tabs.Root>
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

export default OfficesPage;
