import { Link } from "@chakra-ui/next-js";
import {
  Button,
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
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";

import { trpc } from "../utils/trpc";

export const TableOfficeList = () => {
  const t = useTranslations("OfficePages");
  const router = useRouter();
  const officesQuery = trpc.office.list.useQuery();

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
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};
