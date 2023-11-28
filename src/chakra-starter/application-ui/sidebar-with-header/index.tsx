import { Box, Button, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { UserRole } from "@prisma/client";
import { FiMenu } from "react-icons/fi";

import { trpc } from "../../../utils/trpc";
import { Sidebar } from "./Sidebar";
import { useMenuStore } from "./menuStore";

type Variant = {
  navigation: "drawer" | "sidebar";
  navigationButton: boolean;
};

const smVariant: Variant = { navigation: "drawer", navigationButton: true };
const mdVariant: Variant = { navigation: "sidebar", navigationButton: false };

type SideNavigationProps = {
  children: React.ReactNode;
};

export const SidebarBrandWithHeader = (props: SideNavigationProps) => {
  const isSidebarOpen = useMenuStore((state) => state.isSidebarOpen);
  const setIsSidebarOpen = useMenuStore((state) => state.setIsSidebarOpen);
  const variants = useBreakpointValue({ base: smVariant, md: mdVariant });

  const userQuery = trpc.user.get.useQuery();
  const isUserAdmin = userQuery.data?.userRole === UserRole.ADMIN;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (!variants) return null;

  return (
    <>
      <Sidebar
        variant={variants.navigation}
        isOpen={isSidebarOpen}
        onClose={toggleSidebar}
        isUserAdmin={isUserAdmin}
        isUserSetup={true}
      />
      <Box marginLeft={(!variants.navigationButton && 300) || 0} flex={1}>
        {variants.navigationButton && (
          <Box paddingLeft={3} paddingTop={2} onClick={toggleSidebar}>
            <IconButton
              aria-label="Toggle sidebar"
              icon={<FiMenu />}
              colorScheme="blackAlpha"
              variant="ghost"
            />
            <Button
              variant={"link"}
              colorScheme="gray"
              textDecoration={"none"}
              _hover={{
                textDecoration: "none",
              }}
            >
              Menu
            </Button>
          </Box>
        )}
        <Box
          paddingX={{ base: 2, lg: "4" }}
          paddingY={{ base: 0, lg: "4" }}
          display={"flex"}
          minHeight={"100vh"}
          flexDirection={"column"}
        >
          {props.children}
        </Box>
      </Box>
    </>
  );
};
