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
import { useRouter } from "next/router";

import { trpc } from "../utils/trpc";

export const TableOfficeList = () => {
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
        <Text>No offices there yet</Text>
        <Button
          as={Link}
          href={"/app/offices/new"}
          colorScheme="orange"
          backgroundColor={"orange.400"}
          textColor={"white"}
          _hover={{
            backgroundColor: "orange.500",
          }}
        >
          Add office
        </Button>
      </VStack>
    );
  }

  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Number of Desks</Th>
              <Th>Occupancy past 7d</Th>
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
                <Td>{"N/A"}</Td>
                <Td>{"N/A"}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};
