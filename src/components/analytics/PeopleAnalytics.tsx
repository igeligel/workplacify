import { Box, Skeleton, Stack, Table, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";

import { trpc } from "../../utils/trpc";
import {
  WorkplacifyFilters,
  useAnalyticsQueryParams,
} from "./WorkplacifyFilters";
import { useAnalyticsFiltersStore } from "./useAnalyticsFiltersStore";

export const PeopleAnalytics = () => {
  const t = useTranslations("Analytics");
  const officeValue = useAnalyticsFiltersStore((s) => s.officeValue);
  const dateRangeValue = useAnalyticsFiltersStore((s) => s.dateRangeValue);

  const queryParams = useAnalyticsQueryParams();

  const getPeopleAnalyticsQuery = trpc.analytics.getPeopleAnalytics.useQuery(
    queryParams,
    {
      enabled: Boolean(officeValue?.[0] && dateRangeValue?.[0]),
    },
  );

  return (
    <Box>
      <Stack
        direction={{ base: "column", md: "row" }}
        justifyContent={"space-between"}
      >
        <Box>
          <Text fontSize="lg" fontWeight="semibold">
            {t("peopleAnalyticsHeading")}
          </Text>
          <Text>{t("peopleAnalyticsDescription")}</Text>
        </Box>
        <WorkplacifyFilters />
      </Stack>
      <Box maxW={"900px"} marginTop={4}>
        <Table.Root size="sm">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>{t("tableHeaderUser")}</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="center">
                {t("tableHeaderTotalBookings")}
              </Table.ColumnHeader>
              <Table.ColumnHeader textAlign="center">
                {t("tableHeaderAvgWeeklyVisits")}
              </Table.ColumnHeader>
              <Table.ColumnHeader textAlign="center">
                {t("tableHeaderFavoriteDay")}
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {getPeopleAnalyticsQuery.isLoading ? (
              // Loading skeleton rows
              Array.from({ length: 3 }).map((_, index) => (
                <Table.Row key={`skeleton-${index}`}>
                  <Table.Cell>
                    <Skeleton height="20px" width="150px" />
                  </Table.Cell>
                  <Table.Cell>
                    <Skeleton height="20px" width="80px" />
                  </Table.Cell>
                  <Table.Cell>
                    <Skeleton height="20px" width="80px" />
                  </Table.Cell>
                  <Table.Cell>
                    <Skeleton height="20px" width="100px" />
                  </Table.Cell>
                </Table.Row>
              ))
            ) : getPeopleAnalyticsQuery.data &&
              getPeopleAnalyticsQuery.data.length > 0 ? (
              getPeopleAnalyticsQuery.data.map((person) => (
                <Table.Row key={person.userId}>
                  <Table.Cell fontWeight="medium">{person.userName}</Table.Cell>
                  <Table.Cell textAlign="center">
                    {person.totalBookings}
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    {person.avgWeeklyVisits}
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    {person.favoriteDay}
                  </Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell colSpan={4} textAlign="center" py={8}>
                  <Text color="fg.muted">
                    {officeValue?.[0] && dateRangeValue?.[0]
                      ? t("tableNoBookingDataFound")
                      : t("tableSelectOfficeAndDateRangeToViewPeopleAnalytics")}
                  </Text>
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Root>
      </Box>
    </Box>
  );
};
