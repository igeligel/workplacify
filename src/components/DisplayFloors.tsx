import {
  Box,
  Button,
  CloseButton,
  Drawer,
  Icon,
  Portal,
  Table,
  VStack,
} from "@chakra-ui/react";
import { Office, Prisma } from "@prisma/client";
import { useTranslations } from "next-intl";
import NextLink from "next/link";
import router from "next/router";
import { useState } from "react";
import { FiCheck, FiX } from "react-icons/fi";

import { trpc } from "../utils/trpc";

type Floor = Prisma.FloorGetPayload<{
  include: {
    desks: true;
  };
}>;

type DisplayFloorsProps = {
  floors: Floor[];
  office: Office;
};

export const DisplayFloors = (props: DisplayFloorsProps) => {
  const t = useTranslations("OfficePages");
  const utils = trpc.useUtils();
  const deleteFloorMutation = trpc.floor.delete.useMutation();
  const [removeModalOpen, setRemoveModalOpen] = useState(false);
  const [removeFloorId, setRemoveFloorId] = useState<string | null>(null);

  if (props.floors.length === 0) {
    return (
      <Box>
        <VStack>
          {t("noFloorsThereYet")}

          <Button
            asChild
            colorPalette="orange"
            backgroundColor={"orange.400"}
            color={"white"}
            textDecoration={"none"}
            _hover={{ backgroundColor: "orange.500", textDecoration: "none" }}
          >
            <NextLink href={`/app/offices/${props.office.id}/floors/new`}>
              {t("addFloor")}
            </NextLink>
          </Button>
        </VStack>
      </Box>
    );
  }

  const floorToRemove = props.floors.find(
    (floor) => floor.id === removeFloorId,
  );

  return (
    <Box width={"100%"}>
      <Table.Root width={"100%"}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>{t("floorTableHeaderName")}</Table.ColumnHeader>
            <Table.ColumnHeader>
              {t("floorTableHeaderDescription")}
            </Table.ColumnHeader>
            <Table.ColumnHeader>
              {t("floorTableHeaderHasFloorPlan")}
            </Table.ColumnHeader>
            <Table.ColumnHeader>
              {t("floorTableHeaderNumberOfDesks")}
            </Table.ColumnHeader>
            <Table.ColumnHeader>
              {t("floorTableHeaderOccupancyPast7d")}
            </Table.ColumnHeader>
            <Table.ColumnHeader></Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {props.floors.map((floor) => (
            <Table.Row
              key={floor.id}
              cursor={"pointer"}
              _hover={{
                backgroundColor: "gray.100",
              }}
              onClick={() => {
                router.push(
                  `/app/offices/${props.office.id}/floors/${floor.id}`,
                );
              }}
            >
              <Table.Cell>{floor.name}</Table.Cell>
              <Table.Cell maxW={"500px"}>
                <Box
                  overflowWrap={"break-word"}
                  wordBreak={"break-all"}
                  // overflow={"clip"}
                  style={{
                    textOverflow: "ellipsis",
                  }}
                  maxW={"500px"}
                  overflowX={"auto"}
                >
                  {floor.description}
                </Box>
              </Table.Cell>
              <Table.Cell>
                {floor.floorPlan ? <Icon as={FiCheck} /> : <Icon as={FiX} />}
              </Table.Cell>
              <Table.Cell>{floor.desks?.length || "N/A"}</Table.Cell>
              <Table.Cell>-/-</Table.Cell>
              <Table.Cell>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    setRemoveFloorId(floor.id);
                    setRemoveModalOpen(true);
                  }}
                  colorPalette="red"
                >
                  {t("floorTableButtonRemove")}
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <Drawer.Root
        open={removeModalOpen}
        placement="end"
        onOpenChange={(details) => {
          if (!details.open) {
            setRemoveModalOpen(false);
          }
        }}
      >
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.Header>
                {t("floorRemoveModalHeader", {
                  floorName: floorToRemove?.name,
                })}
              </Drawer.Header>

              <Drawer.Body>{t("floorRemovalDescription")}</Drawer.Body>

              <Drawer.Footer>
                <Button
                  variant="outline"
                  mr={3}
                  loading={deleteFloorMutation.isLoading}
                  colorPalette="red"
                  onClick={async () => {
                    if (!floorToRemove?.id) return;

                    await deleteFloorMutation.mutateAsync({
                      id: floorToRemove.id,
                    });
                    utils.office.get.invalidate();
                    setRemoveModalOpen(false);
                  }}
                >
                  {t("floorRemoveModalButtonRemove")}
                </Button>
              </Drawer.Footer>
              <Drawer.CloseTrigger asChild>
                <CloseButton
                  onClick={() => {
                    setRemoveModalOpen(false);
                  }}
                />
              </Drawer.CloseTrigger>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </Box>
  );
};
