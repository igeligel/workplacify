import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import TimezoneSelect from "react-timezone-select";

import { useOfficeFormStore } from "../stores/officeFormStore";

export const FormOfficeAdd = () => {
  const t = useTranslations("OfficePages");
  const { name, setName, timezone, description, setDescription, setTimezone } =
    useOfficeFormStore();

  return (
    <>
      <FormControl>
        <FormLabel>{t("formLabelOfficeName")}</FormLabel>
        <Input
          value={name}
          placeholder={"Berlin, Unter den Linden"}
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
        <FormHelperText>{t("formHelperTextOfficeName")}</FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>{t("formLabelOfficeDescription")}</FormLabel>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={10}
        />
        <FormHelperText>{t("formHelperTextOfficeDescription")}</FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>{t("formLabelOfficeTimezone")}</FormLabel>
        <TimezoneSelect
          value={timezone}
          onChange={(timezone) => {
            const parsedTimezone =
              typeof timezone === "string" ? timezone : timezone.value;

            setTimezone(parsedTimezone);
          }}
        ></TimezoneSelect>
      </FormControl>
    </>
  );
};
