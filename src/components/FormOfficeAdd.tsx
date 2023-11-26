import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import TimezoneSelect, { ITimezoneOption } from "react-timezone-select";

import { useOfficeFormStore } from "../stores/officeFormStore";

export const FormOfficeAdd = () => {
  const name = useOfficeFormStore((state) => state.name);
  const setName = useOfficeFormStore((state) => state.setName);
  const timezone = useOfficeFormStore((state) => state.timezone);
  const description = useOfficeFormStore((state) => state.description);
  const setDescription = useOfficeFormStore((state) => state.setDescription);
  const setTimezone = useOfficeFormStore((state) => state.setTimezone);

  return (
    <>
      <FormControl>
        <FormLabel>Office Name</FormLabel>
        <Input
          value={name}
          placeholder={"Berlin, Unter den Linden"}
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
        <FormHelperText>
          Use a name like Berlin, Unter den Linden
        </FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>Description</FormLabel>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={10}
        />
        <FormHelperText>
          Helpful tip: Add a link to your office instructions.
        </FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>Time zone</FormLabel>
        <TimezoneSelect
          value={timezone}
          onChange={(timezone: ITimezoneOption) => {
            setTimezone(timezone.value);
          }}
        ></TimezoneSelect>
      </FormControl>
    </>
  );
};
