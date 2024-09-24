import {
  Badge,
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Icon,
  IconButton,
  Spinner,
  Stack,
  Switch,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  Tooltip,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { formatISO } from "date-fns";
import { GetServerSideProps } from "next";
import { useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import { FiMinus, FiPlus, FiX } from "react-icons/fi";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

import { ScheduleNoOfficeSelected } from "../../../components/ScheduleNoOfficeSelected";
import { appAuthRedirect } from "../../../server/nextMiddleware/appAuthRedirect";
import { trpc } from "../../../utils/trpc";

const css = `
  .rdp {
    margin: 0 !important;
  }
`;

const SchedulePage = () => {
  const utils = trpc.useUtils();
  const toast = useToast();
  const [day, setDay] = useState(new Date());
  const formattedDate = formatISO(day, { representation: "date" });
  const imageRef = useRef<HTMLImageElement>(null);

  const userQuery = trpc.user.get.useQuery();
  const bookDeskMutation = trpc.schedule.bookDeskForDay.useMutation({});
  const cancelDeskForDayMutation = trpc.schedule.cancelDeskForDay.useMutation(
    {},
  );
  const getDeskSchedulesForDayQuery =
    trpc.schedule.getDeskSchedulesForDay.useQuery({
      day: formattedDate,
    });

  const getFloorsForCurrentOfficeQuery =
    trpc.schedule.getFloorsForCurrentOffice.useQuery({});

  const isLoading =
    userQuery.isLoading ||
    getDeskSchedulesForDayQuery.isLoading ||
    getFloorsForCurrentOfficeQuery.isLoading;

  if (!userQuery.data) {
    return <div>Not logged in</div>;
  }

  if (userQuery.data.currentOfficeId === null) {
    return <ScheduleNoOfficeSelected />;
  }

  if (!getDeskSchedulesForDayQuery.data) {
    return <div>No schedules</div>;
  }

  return (
    <Container maxW={"container.2xl"} paddingX={{ base: 2, lg: 4 }}>
      <Heading
        fontSize={{
          base: "xl",
          lg: "3xl",
        }}
      >
        Schedule
      </Heading>
      <Stack
        display={"flex"}
        spacing={{ base: 4, lg: 12 }}
        direction={{ base: "column", lg: "row" }}
      >
        <style>{css}</style>
        <DayPicker
          mode="single"
          selected={day}
          defaultMonth={day}
          onSelect={(newDay) => {
            if (!newDay) return;
            setDay(newDay);
          }}
          style={{
            margin: "0 !important",
          }}
          // footer={footer}
        />
        {isLoading ? (
          <Spinner />
        ) : (
          <VStack alignItems={"flex-start"} width={"100%"}>
            <Heading
              fontSize={{
                base: "xl",
                lg: "3xl",
              }}
            >
              All desks
            </Heading>
            <Tabs width={"100%"} colorScheme="orange">
              <TabList>
                <Tab>List of desks</Tab>
                <Tab>Map of desks</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <VStack spacing={3} alignItems={"flex-start"}>
                    {Object.values(
                      getDeskSchedulesForDayQuery.data.deskSchdulesMapped,
                    )
                      .sort((a, b) => {
                        const floorComparison = a.desk.floor.name.localeCompare(
                          b.desk.floor.name,
                        );
                        if (floorComparison !== 0) return floorComparison;
                        return a.desk.id.localeCompare(b.desk.id);
                      })
                      .map((freeDeskSchedules) => {
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
                          const periodToCancel =
                            freeDeskSchedules.usedPeriods.find(
                              (e) => e.wholeDay === true,
                            );
                          const deskScheduleIdToCancel =
                            periodToCancel?.deskScheduleId;
                          if (!deskScheduleIdToCancel) return;
                          await cancelDeskForDayMutation.mutateAsync({
                            deskScheduleId: deskScheduleIdToCancel,
                            day: formattedDate,
                          });
                          utils.schedule.getDeskSchedulesForDay.invalidate();
                        };

                        const canCancelReservation =
                          freeDeskSchedules.usedPeriods.some(
                            (period) => period.id === userQuery.data.id,
                          );

                        return (
                          <VStack
                            spacing={1}
                            key={freeDeskSchedules.desk.id}
                            alignItems={"flex-start"}
                          >
                            <HStack alignItems={"flex-start"}>
                              <VStack
                                alignItems={"flex-start"}
                                justifyContent={"flex-start"}
                              >
                                <Heading
                                  fontSize={"md"}
                                  fontWeight={500}
                                  color={"gray.700"}
                                >
                                  {freeDeskSchedules.desk.floor.name} - Desk{" "}
                                  {freeDeskSchedules.desk.publicDeskId}
                                  {freeDeskSchedules.usedPeriods.map(
                                    (usedPeriod) => {
                                      const isOccupiedWholeDay =
                                        usedPeriod.wholeDay;

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
                                    },
                                  )}
                                </Heading>
                                {freeDeskSchedules.desk.name && (
                                  <Tooltip label="Custom name for this desk">
                                    <Tag>{freeDeskSchedules.desk.name}</Tag>
                                  </Tooltip>
                                )}
                              </VStack>
                              <Box>
                                <Badge
                                  colorScheme={
                                    freeDeskSchedules.wholeDayFree
                                      ? "green"
                                      : "red"
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
                </TabPanel>

                <TabPanel>
                  <Box>
                    <TransformWrapper
                      initialScale={1}
                      initialPositionX={0}
                      initialPositionY={0}
                      onTransformed={(props) => {
                        setScale(props.state.scale);
                      }}
                    >
                      {(props) => {
                        const { zoomIn, zoomOut, resetTransform } = props;

                        return (
                          <>
                            <Box display={"flex"} flexDirection={"column"}>
                              <Box
                                display={"flex"}
                                justifyContent={"space-between"}
                              >
                                <Box>
                                  <FormControl
                                    display="flex"
                                    alignItems="flex-start"
                                    flexDirection={"column"}
                                  >
                                    <FormLabel htmlFor="zoom-controls" mb="0">
                                      Zoom controls
                                    </FormLabel>
                                    <HStack id={"zoom-controls"} paddingTop={1}>
                                      <IconButton
                                        colorScheme="blue"
                                        aria-label="zoom in"
                                        icon={<Icon as={FiPlus} />}
                                        onClick={() => {
                                          zoomIn();
                                        }}
                                      />
                                      <IconButton
                                        colorScheme="blue"
                                        aria-label="zoom out"
                                        icon={<Icon as={FiMinus} />}
                                        onClick={() => {
                                          zoomOut();
                                        }}
                                      />
                                      <IconButton
                                        colorScheme="blue"
                                        aria-label="reset zoom"
                                        icon={<Icon as={FiX} />}
                                        onClick={() => {
                                          resetTransform();
                                        }}
                                      />
                                    </HStack>
                                  </FormControl>
                                </Box>
                              </Box>
                            </Box>

                            <TransformComponent>
                              <Box
                                position={"relative"}
                                onClick={(e) => {
                                  // if (!isAddMarkerMode) return;
                                  // const target = e.target as HTMLElement;
                                  // const rect = target.getBoundingClientRect();
                                  // const x = e.clientX - rect.left; //x position within the element.
                                  // const y = e.clientY - rect.top; //y position within the element.
                                  // if (!imageRef?.current) return;
                                  // const imageScale =
                                  //   imageRef.current.naturalWidth /
                                  //   imageRef.current.width;
                                  // const maximumNumber = desks
                                  //   .map((desk) => Number(desk.publicDeskId))
                                  //   .sort((a, b) => {
                                  //     return b - a;
                                  //   })[0];
                                  // const newId = maximumNumber ? maximumNumber + 1 : 1;
                                  // const offsetOfMarker = 10 * imageScale;
                                  // setDesks([
                                  //   ...desks,
                                  //   {
                                  //     x: (x * imageScale) / scale - offsetOfMarker,
                                  //     y: (y * imageScale) / scale - offsetOfMarker,
                                  //     publicDeskId: newId.toString(),
                                  //   },
                                  // ]);
                                }}
                              >
                                <img ref={imageRef} src={imageUrl} alt="test" />
                              </Box>
                            </TransformComponent>
                          </>
                        );
                      }}
                    </TransformWrapper>
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </VStack>
        )}
      </Stack>
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
