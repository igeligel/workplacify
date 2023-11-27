import {
  Badge,
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Spinner,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { formatISO } from "date-fns";
import { GetServerSideProps } from "next";
import { useState } from "react";
import { DayPicker } from "react-day-picker";

import { appAuthRedirect } from "../../../server/nextMiddleware/appAuthRedirect";
import { trpc } from "../../../utils/trpc";

const SchedulePage = () => {
  const utils = trpc.useUtils();
  const toast = useToast();
  const [day, setDay] = useState(new Date());
  const formattedDate = formatISO(day, { representation: "date" });

  const userQuery = trpc.user.get.useQuery();
  const bookDeskMutation = trpc.schedule.bookDeskForDay.useMutation({});
  const cancelDeskForDayMutation = trpc.schedule.cancelDeskForDay.useMutation(
    {},
  );
  const getDeskSchedulesForDayQuery =
    trpc.schedule.getDeskSchedulesForDay.useQuery({
      day: formattedDate,
    });

  const isLoading =
    userQuery.isLoading || getDeskSchedulesForDayQuery.isLoading;

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
        <DayPicker
          mode="single"
          selected={day}
          defaultMonth={day}
          onSelect={(newDay) => {
            if (!newDay) return;
            setDay(newDay);
          }}
          // footer={footer}
        />
        {isLoading ? (
          <Spinner />
        ) : (
          <VStack spacing={3} alignItems={"flex-start"}>
            {Object.values(
              getDeskSchedulesForDayQuery.data.deskSchdulesMapped,
            ).map((freeDeskSchedules) => {
              const onBookClick = async () => {
                try {
                  await bookDeskMutation.mutateAsync({
                    deskId: freeDeskSchedules.desk.id,
                    day: formattedDate,
                  });
                  utils.schedule.getDeskSchedulesForDay.invalidate();
                } catch (e) {
                  toast({
                    title: "Error while booking a desk",
                    description:
                      "You have booked a desk already in this office for this day.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                  });
                }
              };

              const onCancelReservationClick = async () => {
                const periodToCancel = freeDeskSchedules.usedPeriods.find(
                  (e) => e.wholeDay === true,
                );
                const deskScheduleIdToCancel = periodToCancel?.deskScheduleId;
                if (!deskScheduleIdToCancel) return;
                console.log({ deskScheduleIdToCancel });
                await cancelDeskForDayMutation.mutateAsync({
                  deskScheduleId: deskScheduleIdToCancel,
                  day: formattedDate,
                });
                utils.schedule.getDeskSchedulesForDay.invalidate();
              };

              const canCancelReservation = freeDeskSchedules.usedPeriods.some(
                (period) => period.id === userQuery.data.id,
              );

              return (
                <VStack
                  spacing={1}
                  key={freeDeskSchedules.desk.id}
                  alignItems={"flex-start"}
                >
                  <HStack>
                    <Heading
                      fontSize={"md"}
                      fontWeight={500}
                      color={"gray.700"}
                    >
                      Desk: {freeDeskSchedules.desk.publicDeskId}
                      {freeDeskSchedules.usedPeriods.map((usedPeriod) => {
                        const isOccupiedWholeDay = usedPeriod.wholeDay;

                        const occupationPeriod = `from ${usedPeriod.start.toLocaleTimeString()} to ${usedPeriod.end.toLocaleTimeString()}`;
                        const occupationLabel = isOccupiedWholeDay
                          ? "whole day"
                          : occupationPeriod;
                        const isOccupiedByWhom = usedPeriod.name
                          ? ` by ${usedPeriod.name}`
                          : ``;
                        const label = `Is occupied ${occupationLabel}${isOccupiedByWhom}`;
                        const key = `${occupationPeriod}-${isOccupiedByWhom}`;
                        return <Box key={key}>{label}</Box>;
                      })}
                    </Heading>
                    <Box>
                      <Badge
                        colorScheme={
                          freeDeskSchedules.wholeDayFree ? "green" : "red"
                        }
                      >
                        {freeDeskSchedules.wholeDayFree
                          ? "Available"
                          : "Booked"}
                      </Badge>
                    </Box>
                  </HStack>
                  {canCancelReservation ? (
                    <Button
                      colorScheme="orange"
                      backgroundColor={"orange.400"}
                      _hover={{
                        backgroundColor: "orange.500",
                      }}
                      size={"sm"}
                      onClick={onCancelReservationClick}
                    >
                      Cancel reservation
                    </Button>
                  ) : (
                    <Button
                      colorScheme="orange"
                      backgroundColor={"orange.400"}
                      _hover={{
                        backgroundColor: "orange.500",
                      }}
                      size={"sm"}
                      onClick={onBookClick}
                      isDisabled={!freeDeskSchedules.wholeDayFree}
                    >
                      Book
                    </Button>
                  )}
                </VStack>
              );
            })}
          </VStack>
        )}
      </Box>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { redirect, session } = await appAuthRedirect({
    context,
  });
  if (redirect) return { redirect };

  return {
    props: {
      session,
    },
  };
};

export default SchedulePage;
