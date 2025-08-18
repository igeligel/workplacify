import { Box, Field, Input, Textarea } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import TimezoneSelect from "react-timezone-select";

import { useOfficeFormStore } from "../stores/officeFormStore";

export const FormOfficeAdd = () => {
  const t = useTranslations("OfficePages");
  const { name, setName, timezone, description, setDescription, setTimezone } =
    useOfficeFormStore();

  return (
    <>
      <Field.Root>
        <Field.Label>{t("formLabelOfficeName")}</Field.Label>
        <Input
          value={name}
          placeholder={"Berlin, Unter den Linden"}
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
        <Field.HelperText>{t("formHelperTextOfficeName")}</Field.HelperText>
        <Field.ErrorText />
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("formLabelOfficeDescription")}</Field.Label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={10}
        />
        <Field.HelperText>
          {t("formHelperTextOfficeDescription")}
        </Field.HelperText>
      </Field.Root>
      <Field.Root>
        <Field.Label>{t("formLabelOfficeTimezone")}</Field.Label>
        <Box minW={{ base: "100%", md: "500px" }}>
          <TimezoneSelect
            value={timezone}
            onChange={(timezone) => {
              const parsedTimezone =
                typeof timezone === "string" ? timezone : timezone.value;

              setTimezone(parsedTimezone);
            }}
          />
        </Box>
      </Field.Root>
    </>
  );
};
