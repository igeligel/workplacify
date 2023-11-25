import { VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
// import { VscGraphLine } from "react-icons/vsc";
import { FiHome } from "react-icons/fi";
import { GrSchedules } from "react-icons/gr";
import { HiOutlineBuildingOffice } from "react-icons/hi2";

import { MenuItem } from "./MenuItem";

export const SidebarMainPaths = () => {
  const router = useRouter();

  return (
    <VStack spacing={"0.5"} marginTop={"2"}>
      <MenuItem
        title={"Home"}
        icon={FiHome}
        href={"/app"}
        isActive={router.pathname === "/app"}
      />
      <MenuItem
        title={"Offices"}
        icon={HiOutlineBuildingOffice}
        href={"/app/offices"}
        isActive={router.pathname === "/app/offices"}
      />
      {/* <MenuItem
        title={"Analytics"}
        icon={VscGraphLine}
        href={"/app/analytics"}
        isActive={router.pathname === "/app/analytics"}
      /> */}
      <MenuItem
        title={"Schedule"}
        icon={GrSchedules}
        href={"/app/schedule"}
        isActive={router.pathname === "/app/schedule"}
      />
    </VStack>
  );
};
