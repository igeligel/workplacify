import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  VStack,
} from "@chakra-ui/react";

import { SidebarActiveItems } from "./SidebarActiveItems";
import { SidebarMainPaths } from "./SidebarMainPaths";
import { UserMenu } from "./UserMenu";

interface Props {
  onClose: () => void;
  isOpen: boolean;
  variant: "drawer" | "sidebar";
  isUserSetup: boolean;
  isUserAdmin: boolean;
}

type SidebarContentProps = {
  onClick: () => void;
  isUserSetup: boolean;
  isUserAdmin: boolean;
};

const SidebarContent = (props: SidebarContentProps) => {
  const { isUserSetup, isUserAdmin } = props;

  return (
    <Box
      display="flex"
      height="100%"
      flexDirection={"column"}
      justifyContent={"space-between"}
    >
      {isUserSetup ? (
        <>
          <VStack>
            <Box width={"100%"}>
              <SidebarMainPaths />
            </Box>
            <VStack spacing={"8"} width={"100%"} paddingTop={"8"}>
              <SidebarActiveItems />
            </VStack>
          </VStack>
          <UserMenu isUserAdmin={isUserAdmin} />
        </>
      ) : null}
    </Box>
  );
};

export const Sidebar = ({
  isOpen,
  variant,
  onClose,
  isUserAdmin,
  isUserSetup,
}: Props) => {
  return variant === "sidebar" ? (
    <Box
      position="fixed"
      left={0}
      p={5}
      w="300px"
      top={0}
      h="100%"
      bg={isUserSetup ? "gray.50" : "transparent"}
    >
      <SidebarContent
        isUserAdmin={isUserAdmin}
        isUserSetup={isUserSetup}
        onClick={onClose}
      />
    </Box>
  ) : (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>workplacify.com</DrawerHeader>
          <DrawerBody>
            <SidebarContent
              isUserAdmin={isUserAdmin}
              isUserSetup={isUserSetup}
              onClick={onClose}
            />
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};
