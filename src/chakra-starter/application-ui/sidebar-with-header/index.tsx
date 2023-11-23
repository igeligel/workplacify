import { Box, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { useState } from "react";
import { FiChevronRight } from "react-icons/fi";

import { Sidebar } from "./Sidebar";

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
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const variants = useBreakpointValue({ base: smVariant, md: mdVariant });

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  if (!variants) return null;

  return (
    <>
      <Sidebar
        variant={variants.navigation}
        isOpen={isSidebarOpen}
        onClose={toggleSidebar}
        isUserAdmin={true}
        isUserSetup={true}
      />
      <Box marginLeft={(!variants.navigationButton && 300) || 0} flex={1}>
        {variants.navigationButton && (
          <Box>
            <IconButton
              aria-label="Toggle sidebar"
              icon={<FiChevronRight />}
              colorScheme="blackAlpha"
              variant="outline"
              onClick={toggleSidebar}
            />
          </Box>
        )}
        <Box
          padding={"4"}
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
