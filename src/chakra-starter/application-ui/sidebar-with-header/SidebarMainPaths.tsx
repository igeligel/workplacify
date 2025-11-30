import { VStack } from "@chakra-ui/react";
import { UserRole } from "@prisma/client";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
// import { VscGraphLine } from "react-icons/vsc";
import { FiHome } from "react-icons/fi";
import { GrSchedules } from "react-icons/gr";
import { HiOutlineBuildingOffice } from "react-icons/hi2";
import { IoAnalytics } from "react-icons/io5";

import { trpc } from "../../../utils/trpc";
import { MenuItem } from "./MenuItem";

export const SidebarMainPaths = () => {
  const router = useRouter();
  const userQuery = trpc.user.get.useQuery();
  const t = useTranslations("AppMenu");

  return (
    <VStack gap={"0.5"} marginTop={"2"}>
      <MenuItem
        title={t("labelHome")}
        icon={FiHome}
        href={"/app"}
        isActive={router.pathname === "/app"}
      />
      {userQuery.data?.userRole === UserRole.ADMIN ? (
        <MenuItem
          title={t("labelOffices")}
          icon={HiOutlineBuildingOffice}
          href={"/app/offices"}
          isActive={router.pathname === "/app/offices"}
        />
      ) : (
        <></>
      )}

      {/* <MenuItem
        title={"Analytics"}
        icon={VscGraphLine}
        href={"/app/analytics"}
        isActive={router.pathname === "/app/analytics"}
      /> */}
      <MenuItem
        title={t("labelSchedule")}
        icon={GrSchedules}
        href={"/app/schedule"}
        isActive={router.pathname === "/app/schedule"}
      />
      {userQuery.data?.userRole === UserRole.ADMIN ? (
        <MenuItem
          title={t("labelAnalytics")}
          icon={IoAnalytics}
          href={"/app/analytics"}
          isActive={router.pathname.startsWith("/app/analytics")}
        />
      ) : (
        <></>
      )}
    </VStack>
  );
};
