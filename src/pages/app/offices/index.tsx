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
import { FiPlus } from "react-icons/fi";

import { TableOfficeList } from "../../../components/TableOfficeList";

const OfficesPage = () => {
  return (
    <Container maxW={"container.2xl"}>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Heading>Offices</Heading>

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
          >
            Add office
          </Button>
        </HStack>
      </Box>
      <Box>
        <Tabs colorScheme="orange">
          <TabList>
            <Tab>All offices</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <TableOfficeList />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default OfficesPage;
