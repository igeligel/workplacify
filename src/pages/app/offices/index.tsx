import { Link } from "@chakra-ui/next-js";
import {
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { FiPlus } from "react-icons/fi";

import { TableOfficeList } from "../../../components/TableOfficeList";
import { getMessages } from "../../../messages/getMessages";
import { appAuthRedirect } from "../../../server/nextMiddleware/appAuthRedirect";

const OfficesPage = () => {
  return (
    <Container maxW={"container.2xl"}>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Heading
          fontSize={{
            base: "xl",
            md: "2xl",
          }}
        >
          Offices
        </Heading>

        <HStack>
          <Button
            as={Link}
            leftIcon={<Icon as={FiPlus} />}
            href={"/app/offices/new"}
            colorScheme="orange"
            backgroundColor={"orange.400"}
            textColor={"white"}
            textDecoration={"none"}
            _hover={{
              backgroundColor: "orange.500",
              textDecoration: "none",
            }}
            size={{ base: "sm", md: "md" }}
          >
            Add office
          </Button>
        </HStack>
      </Box>
      <Box>
        <Tabs
          colorScheme="orange"
          size={{
            base: "sm",
            md: "md",
          }}
        >
          <TabList>
            <Tab>All offices</Tab>
          </TabList>

          <TabPanels>
            <TabPanel paddingX={{ base: 0, lg: 4 }}>
              <TableOfficeList />
            </TabPanel>
          </TabPanels>
        </Tabs>
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
