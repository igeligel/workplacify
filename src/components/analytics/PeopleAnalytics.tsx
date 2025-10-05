import { Box, Stack, Table, Text } from "@chakra-ui/react";

import { WorkplacifyFilters } from "./WorkplacifyFilters";
import { useAnalyticsFiltersStore } from "./useAnalyticsFiltersStore";

export const PeopleAnalytics = () => {
  const officeValue = useAnalyticsFiltersStore((s) => s.officeValue);
  const dateRangeValue = useAnalyticsFiltersStore((s) => s.dateRangeValue);
  return (
    <Box>
      <Stack
        direction={{ base: "column", md: "row" }}
        justifyContent={"space-between"}
      >
        <Box>
          <Text fontSize="lg" fontWeight="semibold">
            People Analytics
          </Text>
          <Text>Analyze user booking behavior.</Text>
        </Box>
        <WorkplacifyFilters />
      </Stack>
      <Box mt={4}>
        <Text color="fg.muted" fontSize="sm">
          {officeValue?.[0]
            ? `Office selected: ${officeValue[0]}`
            : "Select an office"}
          {dateRangeValue?.[0] ? ` · Range: ${dateRangeValue[0]}` : ""}
        </Text>
      </Box>
      <Box>
        {/* User                 Total Bookings   Avg. Weekly Visits   Favorite Day    │
│ -------------------- --------------   --------------------   ------------    │
│ Alice Johnson        18               4.5                    Wednesday       │
│ Bob Williams         15               3.8                    Tuesday         │
│ Charlie Brown        12               3.0                    Wednesday       │
│ Diana Prince         5                1.2                    Friday   */}
        <Table.Root size="sm">
          <Table.Caption>
            Product inventory and pricing information
          </Table.Caption>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>User</Table.ColumnHeader>
              <Table.ColumnHeader>Total Bookings</Table.ColumnHeader>
              <Table.ColumnHeader>Avg. Weekly Visits</Table.ColumnHeader>
              <Table.ColumnHeader>Favorite Day</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {/* {items.map((item) => (
              <Table.Row key={item.id}>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{item.category}</Table.Cell>
                <Table.Cell textAlign="end">{item.price}</Table.Cell>
              </Table.Row>
            ))} */}
          </Table.Body>
        </Table.Root>
      </Box>
    </Box>
  );
};
