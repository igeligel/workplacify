import {
  Button,
  CloseButton,
  Drawer,
  Portal,
  Spinner,
  Table,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import { trpc } from "../utils/trpc";
import { toaster } from "./ui/toaster";

export const TableOfficeList = () => {
  const { open, onOpen, onClose } = useDisclosure();
  const utils = trpc.useUtils();
  const officesQuery = trpc.office.list.useQuery();
  const removeOfficeMutation = trpc.office.remove.useMutation();
  type Office = NonNullable<typeof officesQuery.data>[number];

  const [officeToBeRemoved, setOfficeToBeRemoved] = useState<null | Office>(
    null,
  );
  const t = useTranslations("OfficePages");
  const router = useRouter();

  if (officesQuery.isLoading) {
    return <Spinner />;
  }

  if (
    officesQuery.isFetched &&
    (!officesQuery.data || officesQuery.data.length === 0)
  ) {
    return (
      <VStack>
        <Text>{t("displayNoOffices")}</Text>
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
        >
          <NextLink href={"/app/offices/new"}>{t("labelAddOffice")}</NextLink>
        </Button>
      </VStack>
    );
  }

  return (
    <>
      <Table.Root size={{ base: "sm", lg: "md" }}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>{t("tableHeaderName")}</Table.ColumnHeader>
            <Table.ColumnHeader>
              {t("tableHeaderNumberOfDesks")}
            </Table.ColumnHeader>
            <Table.ColumnHeader>{t("tableHeaderOccupancy")}</Table.ColumnHeader>
            <Table.ColumnHeader />
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {officesQuery.data
            ?.sort((a, b) => {
              return b.createdAt.getTime() - a.createdAt.getTime();
            })
            .map((office) => {
              return (
                <Table.Row
                  key={office.id}
                  cursor={"pointer"}
                  _hover={{
                    backgroundColor: "gray.100",
                  }}
                  onClick={() => {
                    router.push(`/app/offices/${office.id}`);
                  }}
                >
                  <Table.Cell>{office.name}</Table.Cell>
                  <Table.Cell>{"-/-"}</Table.Cell>
                  <Table.Cell>{"-/-"}</Table.Cell>
                  <Table.Cell>
                    <Button
                      colorPalette="red"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOfficeToBeRemoved(office);
                        onOpen();
                      }}
                    >
                      {t("buttonLabelRemove")}
                    </Button>
                  </Table.Cell>
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table.Root>
      <Drawer.Root
        open={open}
        placement={"end"}
        onOpenChange={(details) => {
          if (!details.open) {
            onClose();
          }
        }}
      >
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.Header>
                {t("labelRemoveOffice", {
                  officeName: officeToBeRemoved?.name,
                })}
              </Drawer.Header>

              <Drawer.Body>{t("confirmRemoveOffice")}</Drawer.Body>

              <Drawer.Footer>
                <Button variant="outline" mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  colorPalette="red"
                  onClick={async () => {
                    if (!officeToBeRemoved) {
                      return;
                    }
                    // remove
                    await removeOfficeMutation.mutateAsync({
                      id: officeToBeRemoved.id,
                    });
                    toaster.create({
                      title: "Office removed",
                      type: "success",
                      duration: 5000,
                      closable: true,
                    });
                    utils.office.invalidate();
                    onClose();
                  }}
                >
                  {t("buttonLabelRemoveOffice")}
                </Button>
              </Drawer.Footer>
              <Drawer.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Drawer.CloseTrigger>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </>
  );
};
