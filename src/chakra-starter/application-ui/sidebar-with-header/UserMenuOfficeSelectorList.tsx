import { VStack } from "@chakra-ui/react";
import { Office } from "@prisma/client";
import { FiBriefcase, FiCheckCircle } from "react-icons/fi";

import { trpc } from "../../../utils/trpc";
import { MenuItem } from "./MenuItem";
import { useMenuStore } from "./menuStore";

type UserMenuOfficeSelectorListProps = {
  offices: Office[];
};

export const UserMenuOfficeSelectorList = (
  props: UserMenuOfficeSelectorListProps,
) => {
  const { setIsOfficeSelectorOpen, setIsOfficeSelectorHighlighted } =
    useMenuStore();
  const utils = trpc.useUtils();
  const { offices } = props;
  const userQuery = trpc.user.get.useQuery();
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
          setIsOfficeSelectorHighlighted(false);
          setIsOfficeSelectorOpen(false);
        };

        const isOfficeSelected = userQuery.data?.currentOfficeId === office.id;

        return (
          <MenuItem
            key={office.id}
            title={office.name}
            isIconSelected={isOfficeSelected}
            icon={isOfficeSelected ? FiCheckCircle : FiBriefcase}
            onClick={updateSelectedOffice}
          />
        );
      })}
    </VStack>
  );
};
