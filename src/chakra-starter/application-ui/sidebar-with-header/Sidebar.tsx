import { Box, Drawer, Portal, VStack } from "@chakra-ui/react";

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
            <VStack gap={"8"} width={"100%"} paddingTop={"8"}>
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
    <>
      <Drawer.Root
        open={isOpen}
        placement="start"
        onOpenChange={(details) => {
          if (!details.open) {
            onClose;
          }
        }}
      >
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.Header>workplacify.com</Drawer.Header>
              <Drawer.Body>
                <SidebarContent
                  isUserAdmin={isUserAdmin}
                  isUserSetup={isUserSetup}
                  onClick={onClose}
                />
              </Drawer.Body>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </>
  );
};
