import {
  Badge,
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Spinner,
  Stack,
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
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { de } from "react-day-picker/locale";

import { FloorDeskBooker } from "../../../components/FloorDeskBooker";
import { ScheduleNoOfficeSelected } from "../../../components/ScheduleNoOfficeSelected";
import { getMessages } from "../../../messages/getMessages";
import { appAuthRedirect } from "../../../server/nextMiddleware/appAuthRedirect";
import { trpc } from "../../../utils/trpc";

const css = `
  .rdp {
    margin: 0 !important;
  }
`;

const SchedulePage = () => {
  const t = useTranslations("SchedulePages");
  const currentLocale = useLocale();

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

  const getFloorsForCurrentOfficeQuery =
    trpc.schedule.getFloorsForCurrentOffice.useQuery({});

  const isLoading =
    userQuery.isLoading ||
    getDeskSchedulesForDayQuery.isLoading ||
    getFloorsForCurrentOfficeQuery.isLoading;

  if (!userQuery.data) {
    return <div>{t("notLoggedIn")}</div>;
  }

  if (userQuery.data.currentOfficeId === null) {
    return <ScheduleNoOfficeSelected />;
  }

  if (!getDeskSchedulesForDayQuery.data) {
    return <div>{t("noSchedules")}</div>;
  }

  return (
    <Container maxW={"container.2xl"} paddingX={{ base: 2, lg: 4 }}>
      <Heading
        fontSize={{
          base: "xl",
          lg: "3xl",
        }}
      >
        {t("headingSchedule")}
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
          locale={currentLocale === "de" ? de : undefined}
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
              {t("headingAllDesks")}
            </Heading>
            <Tabs width={"100%"} colorScheme="orange" isLazy>
              <TabList>
                <Tab>{t("listOfDesks")}</Tab>
                {getFloorsForCurrentOfficeQuery.data?.map((floor) => {
                  return <Tab key={floor.id}>{floor.name}</Tab>;
                })}
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
                              title: t("errorTitleWhileBooking"),
                              description: t("errorDescriptionWhileBooking"),
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
                            (period) => period.id === userQuery.data?.id,
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
                                  {t("floorDeskName", {
                                    floorName:
                                      freeDeskSchedules.desk.floor.name,
                                    deskId: freeDeskSchedules.desk.publicDeskId,
                                  })}
                                  {freeDeskSchedules.usedPeriods.map(
                                    (usedPeriod) => {
                                      const isOccupiedWholeDay =
                                        usedPeriod.wholeDay;

                                      const wholeDayText = t(
                                        "isOccupiedWholeday",
                                        {
                                          userCount: usedPeriod.name ? 1 : 0,
                                          userName: usedPeriod.name,
                                        },
                                      );

                                      const specificTimeText = t(
                                        "isOccupiedSpecificTime",
                                        {
                                          userCount: usedPeriod.name ? 1 : 0,
                                          userName: usedPeriod.name,
                                          startTime:
                                            usedPeriod.start.toLocaleTimeString(),
                                          endTime:
                                            usedPeriod.end.toLocaleTimeString(),
                                        },
                                      );
                                      const label = isOccupiedWholeDay
                                        ? wholeDayText
                                        : specificTimeText;

                                      const key = `${isOccupiedWholeDay.toString()}-${usedPeriod.id}`;

                                      return <Box key={key}>{label}</Box>;
                                    },
                                  )}
                                </Heading>
                                {freeDeskSchedules.desk.name && (
                                  <Tooltip label={t("customNameForThisDesk")}>
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
                                    ? t("badgeLabelAvailable")
                                    : t("badgeLabelBooked")}
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
                                {t("cancelReservation")}
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
                                {t("bookDesk")}
                              </Button>
                            )}
                          </VStack>
                        );
                      })}
                  </VStack>
                </TabPanel>

                {getFloorsForCurrentOfficeQuery.data?.map((floor) => {
                  return (
                    <TabPanel key={floor.id}>
                      {floor.floorPlan && userQuery.data?.id && (
                        <FloorDeskBooker
                          floor={floor}
                          deskSchedulesMapped={
                            getDeskSchedulesForDayQuery.data?.deskSchdulesMapped
                          }
                          userId={userQuery.data.id}
                          day={day}
                        />
                      )}
                    </TabPanel>
                  );
                })}
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

  const messages = await getMessages(context);

  return {
    props: {
      session,
      messages,
    },
  };
};

export default SchedulePage;
