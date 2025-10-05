import { Box, Table } from "@chakra-ui/react";

export const PeopleAnalytics = () => {
  return (
    <Box>
      <Box>Filters</Box>
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
