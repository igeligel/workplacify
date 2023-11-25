// import { signOut } from "next-auth/react";
import { Link } from "@chakra-ui/next-js";
import { Box, VStack } from "@chakra-ui/react";
import React from "react";
import { FiBriefcase, FiSettings, FiUsers } from "react-icons/fi";

import { trpc } from "../../../utils/trpc";
import { MenuItem } from "./MenuItem";
import { MenuItemPopover } from "./MenuItemPopover";

const AccountSubMenu = () => {
  const onLogoutClick = async () => {
    // signOut({
    //   callbackUrl: "/",
    // });
  };

  return (
    <VStack width={"100%"} spacing={"0.5"}>
      <Link
        href={"#"}
        width={"100%"}
        textDecoration={"none"}
        _hover={{ textDecoration: "none" }}
      >
        <MenuItem
          title={"Settings"}
          icon={FiBriefcase}
          onClick={onLogoutClick}
        />
      </Link>

      <MenuItem title={"Logout"} icon={FiBriefcase} onClick={onLogoutClick} />
    </VStack>
  );
};

type Props = {
  isUserAdmin: boolean;
};

export const UserMenu = ({ isUserAdmin }: Props) => {
  const userQuery = trpc.user.get.useQuery();
  const officeQuery = trpc.office.getById.useQuery(
    { id: userQuery.data!.currentOfficeId! },
    {
      enabled: !!userQuery.data?.currentOfficeId,
    },
  );
  return (
    <Box width={"100%"}>
      <VStack spacing={"0.5"} marginTop={"2"}>
        {isUserAdmin ? (
          <Link
            href={"/app/organization-settings"}
            width={"100%"}
            textDecoration={"none"}
            _hover={{ textDecoration: "none" }}
          >
            <MenuItem title={"Organization Settings"} icon={FiUsers} />
          </Link>
        ) : null}
        {(userQuery.isFetched || officeQuery.isFetched) &&
        officeQuery.data?.name ? (
          <MenuItemPopover
            title={`Selected Office: ${officeQuery.data.name}`}
            icon={FiSettings}
            submenu={<AccountSubMenu />}
          />
        ) : (
          <MenuItemPopover
            title={`Select Office`}
            icon={FiSettings}
            submenu={<AccountSubMenu />}
          />
        )}

        <MenuItemPopover
          title={"Account"}
          icon={FiSettings}
          submenu={<AccountSubMenu />}
        />
      </VStack>
    </Box>
  );
};
