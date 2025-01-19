import { Link } from "@chakra-ui/next-js";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Icon,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { Office, Prisma } from "@prisma/client";
import { useTranslations } from "next-intl";
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
            as={Link}
            href={`/app/offices/${props.office.id}/floors/new`}
            colorScheme="orange"
            backgroundColor={"orange.400"}
            textColor={"white"}
            textDecoration={"none"}
            _hover={{ backgroundColor: "orange.500", textDecoration: "none" }}
          >
            {t("addFloor")}
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
      <TableContainer width={"100%"}>
        <Table variant="simple" width={"100%"}>
          <Thead>
            <Tr>
              <Th>{t("floorTableHeaderName")}</Th>
              <Th>{t("floorTableHeaderDescription")}</Th>
              <Th>{t("floorTableHeaderHasFloorPlan")}</Th>
              <Th>{t("floorTableHeaderNumberOfDesks")}</Th>
              <Th>{t("floorTableHeaderOccupancyPast7d")}</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {props.floors.map((floor) => (
              <Tr
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
                <Td>{floor.name}</Td>
                <Td maxW={"500px"}>
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
                </Td>
                <Td>
                  {floor.floorPlan ? <Icon as={FiCheck} /> : <Icon as={FiX} />}
                </Td>
                <Th>{floor.desks?.length || "N/A"}</Th>
                <Th>-/-</Th>
                <Th>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      setRemoveFloorId(floor.id);
                      setRemoveModalOpen(true);
                    }}
                    colorScheme="red"
                  >
                    {t("floorTableButtonRemove")}
                  </Button>
                </Th>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Drawer
        isOpen={removeModalOpen}
        placement="right"
        onClose={() => {
          setRemoveModalOpen(false);
        }}
        // finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton
            onClick={() => {
              setRemoveModalOpen(false);
            }}
          />
          <DrawerHeader>
            {t("floorRemoveModalHeader", { floorName: floorToRemove?.name })}
          </DrawerHeader>

          <DrawerBody />

          <DrawerFooter>
            <Button
              variant="outline"
              mr={3}
              isLoading={deleteFloorMutation.isLoading}
              colorScheme="red"
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
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
