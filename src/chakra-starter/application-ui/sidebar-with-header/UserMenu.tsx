import { Box, Link, VStack } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import NextLink from "next/link";
import React from "react";
import { FiBriefcase, FiSettings, FiUsers } from "react-icons/fi";

import { MenuItem } from "./MenuItem";
import { MenuItemPopover } from "./MenuItemPopover";
import { UserMenuOfficeSelector } from "./UserMenuOfficeSelector";
import { useMenuStore } from "./menuStore";

const AccountSubMenu = () => {
  const { setIsAccountMenuOpen } = useMenuStore();
  const t = useTranslations("AppMenu");
  const onLogoutClick = async () => {
    signOut({
      callbackUrl: "/",
    });
  };

  return (
    <VStack width={"100%"} gap={"0.5"}>
      <Link
        asChild
        width={"100%"}
        textDecoration={"none"}
        _hover={{ textDecoration: "none" }}
        onClick={() => {
          setIsAccountMenuOpen(false);
        }}
      >
        <NextLink href={"/app/account/settings"}>
          <MenuItem title={t("labelSettings")} icon={FiBriefcase} />
        </NextLink>
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

  const { isAccountMenuOpen, setIsAccountMenuOpen } = useMenuStore();

  return (
    <Box width={"100%"}>
      <VStack gap={"0.5"} marginTop={"2"}>
        {isUserAdmin ? (
          <Link
            asChild
            width={"100%"}
            textDecoration={"none"}
            _hover={{ textDecoration: "none" }}
          >
            <NextLink href={"/app/organization-settings"}>
              <MenuItem title={t("labelOrganizationSettings")} icon={FiUsers} />
            </NextLink>
          </Link>
        ) : null}

        <UserMenuOfficeSelector />

        <MenuItemPopover
          title={t("labelAccount")}
          icon={FiSettings}
          submenu={<AccountSubMenu />}
          controlled={{
            isOpen: isAccountMenuOpen,
            setIsOpen: setIsAccountMenuOpen,
          }}
        />
      </VStack>
    </Box>
  );
};
