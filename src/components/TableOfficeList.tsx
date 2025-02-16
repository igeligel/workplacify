import { Link } from "@chakra-ui/next-js";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useState } from "react";

import { trpc } from "../utils/trpc";

export const TableOfficeList = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
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
          as={Link}
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
          {t("labelAddOffice")}
        </Button>
      </VStack>
    );
  }

  return (
    <>
      <TableContainer>
        <Table size={{ base: "sm", lg: "md" }} variant="simple">
          <Thead>
            <Tr>
              <Th>{t("tableHeaderName")}</Th>
              <Th>{t("tableHeaderNumberOfDesks")}</Th>
              <Th>{t("tableHeaderOccupancy")}</Th>
              <Th />
            </Tr>
          </Thead>
          <Tbody>
            {officesQuery.data?.map((office) => (
              <Tr
                key={office.id}
                cursor={"pointer"}
                _hover={{
                  backgroundColor: "gray.100",
                }}
                onClick={() => {
                  router.push(`/app/offices/${office.id}`);
                }}
              >
                <Td>{office.name}</Td>
                <Td>{"-/-"}</Td>
                <Td>{"-/-"}</Td>
                <Td>
                  <Button
                    colorScheme="red"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOfficeToBeRemoved(office);
                      onOpen();
                    }}
                  >
                    {t("buttonLabelRemove")}
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            {t("labelRemoveOffice", { officeName: officeToBeRemoved?.name })}
          </DrawerHeader>

          <DrawerBody>{t("confirmRemoveOffice")}</DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={async () => {
                if (!officeToBeRemoved) {
                  return;
                }
                // remove
                await removeOfficeMutation.mutateAsync({
                  id: officeToBeRemoved.id,
                });
                toast({
                  title: "Office removed",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                });
                utils.office.invalidate();
                onClose();
              }}
            >
              {t("buttonLabelRemoveOffice")}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
