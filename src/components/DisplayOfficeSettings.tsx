import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Collapsible,
  Field,
  Fieldset,
  Group,
  Input,
  Skeleton,
  Stack,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { trpc } from "../utils/trpc";
import { toaster } from "./ui/toaster";

export const DisplayOfficeSettings = () => {
  const t = useTranslations("OfficePages");
  const createOrUpdateOfficeSettingMutation =
    trpc.officeSetting.createOrUpdate.useMutation();
  const [allowSchedulingInThePast, setAllowSchedulingInThePast] =
    useState(false);
  const [durationSchedulingFuture, setDurationSchedulingFuture] = useState<
    number | null | undefined
  >(null);
  const [
    restrictSchedulingToSpecificDays,
    setRestrictSchedulingToSpecificDays,
  ] = useState(false);
  const [weekdaysAllowed, setWeekdaysAllowed] = useState<string[] | null>(null);
  const [initialiazed, setInitialiazed] = useState(false);

  const router = useRouter();
  const officeId = router.query.officeId;

  const getOfficeSettingQuery = trpc.officeSetting.get.useQuery(
    {
      officeId: officeId as string,
    },
    {
      enabled: typeof officeId === "string",
    },
  );

  const isLoading = getOfficeSettingQuery.isLoading;

  useEffect(() => {
    if (initialiazed) {
      return;
    }
    if (!getOfficeSettingQuery.data) {
      return;
    }

    setAllowSchedulingInThePast(
      getOfficeSettingQuery.data.allowSchedulingInThePast,
    );
    setDurationSchedulingFuture(
      getOfficeSettingQuery.data.durationSchedulingFuture,
    );

    if (getOfficeSettingQuery.data.officeSettingWeekdaysAllowed) {
      const defaultWeekdaysAllowed: string[] = [];
      if (getOfficeSettingQuery.data.officeSettingWeekdaysAllowed.allowMonday) {
        defaultWeekdaysAllowed.push("monday");
      }
      if (
        getOfficeSettingQuery.data.officeSettingWeekdaysAllowed.allowTuesday
      ) {
        defaultWeekdaysAllowed.push("tuesday");
      }
      if (
        getOfficeSettingQuery.data.officeSettingWeekdaysAllowed.allowWednesday
      ) {
        defaultWeekdaysAllowed.push("wednesday");
      }
      if (
        getOfficeSettingQuery.data.officeSettingWeekdaysAllowed.allowThursday
      ) {
        defaultWeekdaysAllowed.push("thursday");
      }
      if (getOfficeSettingQuery.data.officeSettingWeekdaysAllowed.allowFriday) {
        defaultWeekdaysAllowed.push("friday");
      }
      if (
        getOfficeSettingQuery.data.officeSettingWeekdaysAllowed.allowSaturday
      ) {
        defaultWeekdaysAllowed.push("saturday");
      }
      if (getOfficeSettingQuery.data.officeSettingWeekdaysAllowed.allowSunday) {
        defaultWeekdaysAllowed.push("sunday");
      }
      setWeekdaysAllowed(defaultWeekdaysAllowed);
      if (defaultWeekdaysAllowed.length > 0) {
        setRestrictSchedulingToSpecificDays(true);
      }
    }
    setInitialiazed(true);
  }, [
    getOfficeSettingQuery.data,
    durationSchedulingFuture,
    weekdaysAllowed,
    initialiazed,
  ]);

  const onSubmit = async () => {
    let weekdaysToUpdate: null | string[] = null;
    if (restrictSchedulingToSpecificDays) {
      weekdaysToUpdate = weekdaysAllowed || null;
    }
    await createOrUpdateOfficeSettingMutation.mutateAsync({
      officeId: officeId as string,
      allowSchedulingInThePast,
      durationSchedulingFuture: durationSchedulingFuture || undefined,
      officeSettingWeekdaysAllowed: weekdaysToUpdate,
    });
    toaster.create({
      title: "Office settings updated",
      description: "We've updated the office settings.",
      type: "success",
      duration: 5000,
      closable: true,
    });
  };

  const weekdaysMap = {
    monday: t("weekdays.monday"),
    tuesday: t("weekdays.tuesday"),
    wednesday: t("weekdays.wednesday"),
    thursday: t("weekdays.thursday"),
    friday: t("weekdays.friday"),
    saturday: t("weekdays.saturday"),
    sunday: t("weekdays.sunday"),
  } as const;

  const weekdays = Object.keys(weekdaysMap);

  return (
    <Box colorPalette="orange">
      <Fieldset.Root size="lg" maxW="md">
        <Stack>
          <Fieldset.Legend>{t("officeSettings")}</Fieldset.Legend>
          <Fieldset.HelperText>
            {t("officeSettingsDescription")}
          </Fieldset.HelperText>
        </Stack>

        <Fieldset.Content>
          <Field.Root>
            <Field.Label>{t("allowSchedulingInThePast")}</Field.Label>
            <Skeleton asChild={isLoading} loading={isLoading}>
              <Checkbox.Root
                size={"md"}
                checked={allowSchedulingInThePast}
                onCheckedChange={(e) => {
                  setAllowSchedulingInThePast(!!e.checked);
                }}
              >
                <Checkbox.HiddenInput />
                <Checkbox.Control />
                <Checkbox.Label>{t("allow")}</Checkbox.Label>
              </Checkbox.Root>
            </Skeleton>
            <Field.HelperText>
              {t("helperTextAllowSchedulingInThePast")}
            </Field.HelperText>
          </Field.Root>

          <Field.Root>
            <Field.Label>{t("durationSchedulingFuture")}</Field.Label>

            <Skeleton asChild={isLoading} loading={isLoading} width="100%">
              <Group attached w="full" maxW="sm">
                <Input
                  name="duration-future-scheduling"
                  type="number"
                  max={365}
                  min={1}
                  value={durationSchedulingFuture ?? ""}
                  onChange={(e) => {
                    setDurationSchedulingFuture(Number(e.target.value));
                  }}
                />
                <Button
                  variant="surface"
                  onClick={() => setDurationSchedulingFuture(undefined)}
                >
                  {t("reset")}
                </Button>
              </Group>
            </Skeleton>
            <Field.HelperText>
              {t("helperTextDurationSchedulingFuture")}
            </Field.HelperText>
          </Field.Root>

          <Field.Root>
            <Skeleton asChild={isLoading} loading={isLoading} width="100%">
              <Checkbox.Root
                size={"md"}
                checked={restrictSchedulingToSpecificDays}
                onCheckedChange={(e) => {
                  setRestrictSchedulingToSpecificDays(!!e.checked);
                  if (weekdaysAllowed === null) {
                    setWeekdaysAllowed([
                      "monday",
                      "tuesday",
                      "wednesday",
                      "thursday",
                      "friday",
                    ]);
                  }
                }}
              >
                <Checkbox.HiddenInput />
                <Checkbox.Control />
                <Checkbox.Label>
                  {t("restrictSchedulingToSpecificDays")}
                </Checkbox.Label>
              </Checkbox.Root>
            </Skeleton>
            <Field.HelperText>
              {t("helperTextRestrictSchedulingToSpecificDays")}
            </Field.HelperText>
          </Field.Root>

          <Collapsible.Root open={restrictSchedulingToSpecificDays}>
            <Collapsible.Content>
              <Box padding="4" borderWidth="1px">
                <CheckboxGroup
                  value={weekdaysAllowed ?? []}
                  onValueChange={(e) => {
                    setWeekdaysAllowed(e);
                  }}
                >
                  <Stack gap={6}>
                    {weekdays.map((day) => {
                      return (
                        <Checkbox.Root value={day} key={day}>
                          <Checkbox.HiddenInput />
                          <Checkbox.Control />
                          <Checkbox.Label>
                            {weekdaysMap[day as keyof typeof weekdaysMap]}
                          </Checkbox.Label>
                        </Checkbox.Root>
                      );
                    })}
                  </Stack>
                </CheckboxGroup>
              </Box>
            </Collapsible.Content>
          </Collapsible.Root>
        </Fieldset.Content>

        <Button type="submit" alignSelf="flex-start" onClick={onSubmit}>
          {t("submit")}
        </Button>
      </Fieldset.Root>
    </Box>
  );
};
