import {
  Box,
  Drawer,
  Link,
  Table,
  Tabs,
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
  const { open, onOpen, onClose } = useDisclosure();
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
      <Drawer.Root
        open={open}
        placement="end"
        onOpenChange={(details) => {
          if (!details.open) {
            onCloseDrawer();
          }
        }}
      >
        {selectedDesk && (
          <DrawerDeskEdit
            onCloseDrawer={onCloseDrawer}
            selectedDesk={selectedDesk}
          />
        )}
      </Drawer.Root>
      <Box>
        <Tabs.Root colorPalette="orange" defaultValue={"desk-list"}>
          <Tabs.List>
            <Tabs.Trigger value="desk-list">
              {t("tabTitleDeskList")}
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="desk-list">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>
                    {t("deskTableHeaderDeskId")}
                  </Table.ColumnHeader>
                  <Table.ColumnHeader>
                    {t("deskTableHeaderDeskName")}
                  </Table.ColumnHeader>
                  <Table.ColumnHeader>
                    {t("deskTableHeaderDeskActions")}
                  </Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {floor?.desks
                  .sort((a, b) => {
                    return a.id.localeCompare(b.id);
                  })
                  .map((desk) => (
                    <Table.Row key={desk.id}>
                      <Table.Cell>{desk.publicDeskId || "-/-"}</Table.Cell>
                      <Table.Cell>{desk.name || "-/-"}</Table.Cell>
                      <Table.Cell>
                        <Link
                          colorPalette="orange"
                          onClick={() => {
                            setActiveDeskId(desk.id);
                            onOpen();
                          }}
                        >
                          {t("deskTableButtonEdit")}
                        </Link>
                      </Table.Cell>
                    </Table.Row>
                  ))}
              </Table.Body>
            </Table.Root>
          </Tabs.Content>
        </Tabs.Root>
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
