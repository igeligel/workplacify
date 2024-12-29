import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import TimezoneSelect from "react-timezone-select";

import { useOfficeFormStore } from "../stores/officeFormStore";

export const FormOfficeAdd = () => {
  const { name, setName, timezone, description, setDescription, setTimezone } =
    useOfficeFormStore();

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
