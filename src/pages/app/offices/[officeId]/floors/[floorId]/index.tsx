import {
  Box,
  Button,
  Drawer,
  DrawerOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Table,
  TableContainer,
  Tabs,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

import { DrawerDeskEdit } from "../../../../../../components/DrawerDeskEdit";
import { trpc } from "../../../../../../utils/trpc";

const FloorPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeDeskId, setActiveDeskId] = useState<string | null>(null);

  const router = useRouter();

  const officeId = router.query.officeId;
  const floorId = router.query.floorId;
  const getOfficeQuery = trpc.office.get.useQuery(
    {
      id: officeId as string,
    },
    {
      enabled: typeof officeId === "string",
    },
  );

  const floor = getOfficeQuery.data?.floors.find(
    (floor) => floor.id === floorId,
  );

  const selectedDesk = floor?.desks.find((desk) => desk.id === activeDeskId);

  const onCloseDrawer = () => {
    setActiveDeskId(null);
    onClose();
  };

  return (
    <div>
      <Drawer isOpen={isOpen} placement="right" onClose={onCloseDrawer}>
        <DrawerOverlay />
        {selectedDesk && (
          <DrawerDeskEdit
            onCloseDrawer={onCloseDrawer}
            selectedDesk={selectedDesk}
          />
        )}
      </Drawer>
      <Box>
        <Tabs colorScheme="orange">
          <TabList>
            <Tab>Desk list</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <TableContainer>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Id</Th>
                      <Th>Name</Th>
                      <Th>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {floor?.desks
                      .sort((a, b) => {
                        return a.id.localeCompare(b.id);
                      })
                      .map((desk) => (
                        <Tr key={desk.id}>
                          <Td>{desk.publicDeskId || "-/-"}</Td>
                          <Td>{desk.name || "-/-"}</Td>
                          <Td>
                            <Button
                              variant={"link"}
                              colorScheme="orange"
                              onClick={() => {
                                setActiveDeskId(desk.id);
                                onOpen();
                              }}
                            >
                              Edit
                            </Button>
                          </Td>
                        </Tr>
                      ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </div>
  );
};

export default FloorPage;
