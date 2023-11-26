import { Box, Container, Heading, Spinner } from "@chakra-ui/react";

import { MultiDatePicker } from "../../../components/MultiDatePicker";
import { trpc } from "../../../utils/trpc";

const SchedulePage = () => {
  const userQuery = trpc.user.get.useQuery();
  const getDeskSchedulesForDayQuery =
    trpc.schedule.getDeskSchedulesForDay.useQuery({
      day: "2023-11-26",
    });
  if (userQuery.isLoading) {
    return <Spinner />;
  }
  if (getDeskSchedulesForDayQuery.isLoading) {
    return <Spinner />;
  }
  if (!userQuery.data) {
    return <div>Not logged in</div>;
  }

  if (!getDeskSchedulesForDayQuery.data) {
    return <div>No schedules</div>;
  }

  return (
    <Container maxW={"container.2xl"}>
      <Heading>Schedule</Heading>
      <Box display={"flex"}>
        <MultiDatePicker />
        <Box>Schedule Box</Box>
        <Box>
          {Object.values(
            getDeskSchedulesForDayQuery.data.deskSchdulesMapped,
          ).map((freeDeskSchedules) => {
            return (
              <Box key={freeDeskSchedules.desk.id}>
                <Box>Public desk id: {freeDeskSchedules.desk.publicDeskId}</Box>
                <Box>
                  Is free: {freeDeskSchedules.wholeDayFree ? "Yes" : "No"}
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Container>
  );
};

export default SchedulePage;
