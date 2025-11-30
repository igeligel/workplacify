import {
  Badge,
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Spinner,
  Stack,
  Tabs,
  Tag,
  VStack,
} from "@chakra-ui/react";
import { Locale, formatISO } from "date-fns";
import { GetServerSideProps } from "next";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { de, it } from "react-day-picker/locale";

import { FloorDeskBooker } from "../../../components/FloorDeskBooker";
import { ScheduleNoOfficeSelected } from "../../../components/ScheduleNoOfficeSelected";
import { toaster } from "../../../components/ui/toaster";
import { Tooltip } from "../../../components/ui/tooltip";
import { useGetDisabledDays } from "../../../hooks/useGetDisabledDays";
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

  const getOfficeSettingQuery =
    trpc.officeSetting.getForCurrentOffice.useQuery();

  const isLoading =
    userQuery.isLoading ||
    getDeskSchedulesForDayQuery.isLoading ||
    getFloorsForCurrentOfficeQuery.isLoading ||
    getOfficeSettingQuery.isLoading;

  const { disabledDays } = useGetDisabledDays({
    getOfficeSettingQueryData: getOfficeSettingQuery.data,
    isLoading: getOfficeSettingQuery.isLoading,
  });

  if (!userQuery.data) {
    return <div>{t("notLoggedIn")}</div>;
  }

  if (userQuery.data.currentOfficeId === null) {
    return <ScheduleNoOfficeSelected />;
  }

  if (!getDeskSchedulesForDayQuery.data) {
    return <div>{t("noSchedules")}</div>;
  }

  const localesMap: Record<string, Locale> = {
    de: de,
    it: it,
  };
  const locale = localesMap[currentLocale] || undefined;

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
        gap={{ base: 4, lg: 12 }}
        direction={{ base: "column", lg: "row" }}
      >
        <style>{css}</style>
        <DayPicker
          mode="single"
          selected={day}
          defaultMonth={day}
          disabled={disabledDays}
          onSelect={(newDay) => {
            if (!newDay) return;
            setDay(newDay);
          }}
          style={{
            margin: "0 !important",
          }}
          locale={locale}
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
            <Tabs.Root
              width={"100%"}
              colorPalette="orange"
              lazyMount
              unmountOnExit
              defaultValue={"list-of-desks"}
            >
              <Tabs.List>
                <Tabs.Trigger value="list-of-desks">
                  {t("listOfDesks")}
                </Tabs.Trigger>
                {getFloorsForCurrentOfficeQuery.data?.map((floor) => {
                  return (
                    <Tabs.Trigger key={floor.id} value={floor.id}>
                      {floor.name}
                    </Tabs.Trigger>
                  );
                })}
              </Tabs.List>

              <Tabs.Content value="list-of-desks">
                <VStack gap={3} alignItems={"flex-start"}>
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
                          toaster.create({
                            title: t("errorTitleWhileBooking"),
                            description: t("errorDescriptionWhileBooking"),
                            type: "error",
                            duration: 5000,
                            closable: true,
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

                      const numberOfFloors =
                        getFloorsForCurrentOfficeQuery.data?.length || 0;

                      let floorDeskName = t("floorDeskNameSoloFloor", {
                        deskId: freeDeskSchedules.desk.publicDeskId,
                      });

                      if (numberOfFloors >= 2) {
                        floorDeskName = t("floorDeskName", {
                          floorName: freeDeskSchedules.desk.floor.name,
                          deskId: freeDeskSchedules.desk.publicDeskId,
                        });
                      }

                      return (
                        <VStack
                          gap={1}
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
                                {floorDeskName}
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
                                <Tooltip content={t("customNameForThisDesk")}>
                                  <Tag.Root>
                                    <Tag.Label>
                                      {freeDeskSchedules.desk.name}
                                    </Tag.Label>
                                  </Tag.Root>
                                </Tooltip>
                              )}
                            </VStack>
                            <Box>
                              <Badge
                                colorPalette={
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
                              colorPalette="orange"
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
                              colorPalette="orange"
                              backgroundColor={"orange.400"}
                              _hover={{
                                backgroundColor: "orange.500",
                              }}
                              size={"sm"}
                              onClick={onBookClick}
                              disabled={!freeDeskSchedules.wholeDayFree}
                            >
                              {t("bookDesk")}
                            </Button>
                          )}
                        </VStack>
                      );
                    })}
                </VStack>
              </Tabs.Content>

              {getFloorsForCurrentOfficeQuery.data?.map((floor) => {
                return (
                  <Tabs.Content key={floor.id} value={floor.id}>
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
                  </Tabs.Content>
                );
              })}
            </Tabs.Root>
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
