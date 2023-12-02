import { VStack } from "@chakra-ui/react";
import { Office } from "@prisma/client";
import { FiBriefcase } from "react-icons/fi";

import { trpc } from "../../../utils/trpc";
import { MenuItem } from "./MenuItem";

type UserMenuOfficeSelectorListProps = {
  offices: Office[];
};

export const UserMenuOfficeSelectorList = (
  props: UserMenuOfficeSelectorListProps,
) => {
  const utils = trpc.useUtils();
  const { offices } = props;
  const updateSelectedOfficeMutation =
    trpc.user.selectCurrentOffice.useMutation();

  return (
    <VStack width={"100%"} spacing={"0.5"}>
      {offices.map((office) => {
        const updateSelectedOffice = async () => {
          await updateSelectedOfficeMutation.mutateAsync({
            id: office.id,
          });
          utils.invalidate();
        };

        return (
          <MenuItem
            key={office.id}
            title={office.name}
            icon={FiBriefcase}
            onClick={updateSelectedOffice}
          />
        );
      })}
    </VStack>
  );
};
