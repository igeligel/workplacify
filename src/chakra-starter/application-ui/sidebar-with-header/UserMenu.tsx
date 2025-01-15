import { Link } from "@chakra-ui/next-js";
import { Box, VStack } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import React from "react";
import { FiBriefcase, FiSettings, FiUsers } from "react-icons/fi";

import { MenuItem } from "./MenuItem";
import { MenuItemPopover } from "./MenuItemPopover";
import { UserMenuOfficeSelector } from "./UserMenuOfficeSelector";

const AccountSubMenu = () => {
  const t = useTranslations("AppMenu");
  const onLogoutClick = async () => {
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
        <MenuItem title={t("labelSettings")} icon={FiBriefcase} />
      </Link>

      <MenuItem
        title={t("labelLogout")}
        icon={FiBriefcase}
        onClick={onLogoutClick}
      />
    </VStack>
  );
};

type Props = {
  isUserAdmin: boolean;
};

export const UserMenu = ({ isUserAdmin }: Props) => {
  const t = useTranslations("AppMenu");
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
            <MenuItem title={t("labelOrganizationSettings")} icon={FiUsers} />
          </Link>
        ) : null}

        <UserMenuOfficeSelector />

        <MenuItemPopover
          title={t("labelAccount")}
          icon={FiSettings}
          submenu={<AccountSubMenu />}
        />
      </VStack>
    </Box>
  );
};
