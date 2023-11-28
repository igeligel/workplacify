import { Link } from "@chakra-ui/next-js";
import { Box, VStack } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import React from "react";
import { FiBriefcase, FiSettings, FiUsers } from "react-icons/fi";

import { MenuItem } from "./MenuItem";
import { MenuItemPopover } from "./MenuItemPopover";
import { UserMenuOfficeSelector } from "./UserMenuOfficeSelector";

const AccountSubMenu = () => {
  const onLogoutClick = async () => {
    debugger;
    signOut({
      callbackUrl: "/",
    });
  };

  return (
    <VStack width={"100%"} spacing={"0.5"}>
      <Link
        href={"/app/account/settings"}
        width={"100%"}
        textDecoration={"none"}
        _hover={{ textDecoration: "none" }}
      >
        <MenuItem title={"Settings"} icon={FiBriefcase} />
      </Link>

      <MenuItem title={"Logout"} icon={FiBriefcase} onClick={onLogoutClick} />
    </VStack>
  );
};

type Props = {
  isUserAdmin: boolean;
};

export const UserMenu = ({ isUserAdmin }: Props) => {
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

        <UserMenuOfficeSelector />

        <MenuItemPopover
          title={"Account"}
          icon={FiSettings}
          submenu={<AccountSubMenu />}
        />
      </VStack>
    </Box>
  );
};
