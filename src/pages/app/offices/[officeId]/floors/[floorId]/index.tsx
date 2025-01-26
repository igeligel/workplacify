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
import { GetServerSideProps } from "next";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useState } from "react";

import { DrawerDeskEdit } from "../../../../../../components/DrawerDeskEdit";
import { getMessages } from "../../../../../../messages/getMessages";
import { appAuthRedirect } from "../../../../../../server/nextMiddleware/appAuthRedirect";
import { trpc } from "../../../../../../utils/trpc";

const FloorPage = () => {
  const t = useTranslations("OfficePages");
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
            <Tab>{t("tabTitleDeskList")}</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <TableContainer>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>{t("deskTableHeaderDeskId")}</Th>
                      <Th>{t("deskTableHeaderDeskName")}</Th>
                      <Th>{t("deskTableHeaderDeskActions")}</Th>
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
                              {t("deskTableButtonEdit")}
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

export default FloorPage;
