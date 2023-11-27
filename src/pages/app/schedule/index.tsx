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
import { useState } from "react";
import { DayPicker } from "react-day-picker";

import { trpc } from "../../../utils/trpc";

const SchedulePage = () => {
  const utils = trpc.useUtils();
  const toast = useToast();
  const [day, setDay] = useState(new Date());
  const formattedDate = formatISO(day, { representation: "date" });

  const userQuery = trpc.user.get.useQuery();
  const bookDeskMutation = trpc.schedule.bookDeskForDay.useMutation({});
  const getDeskSchedulesForDayQuery =
    trpc.schedule.getDeskSchedulesForDay.useQuery({
      day: formattedDate,
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
        <DayPicker
          mode="single"
          selected={day}
          onSelect={(newDay) => {
            if (!newDay) return;
            setDay(newDay);
          }}
          // footer={footer}
        />
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

            return (
              <VStack
                spacing={1}
                key={freeDeskSchedules.desk.id}
                alignItems={"flex-start"}
              >
                <HStack>
                  <Heading fontSize={"md"} fontWeight={500} color={"gray.700"}>
                    Desk: {freeDeskSchedules.desk.publicDeskId}
                  </Heading>
                  <Box>
                    <Badge
                      colorScheme={
                        freeDeskSchedules.wholeDayFree ? "green" : "red"
                      }
                    >
                      {freeDeskSchedules.wholeDayFree ? "Available" : "Booked"}
                    </Badge>
                  </Box>
                </HStack>
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
              </VStack>
            );
          })}
        </VStack>
      </Box>
    </Container>
  );
};

export default SchedulePage;
