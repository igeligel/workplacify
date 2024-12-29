import { Box, Button, Heading } from "@chakra-ui/react";

import { useMenuStore } from "../chakra-starter/application-ui/sidebar-with-header/menuStore";

export const ScheduleNoOfficeSelected = () => {
  const {
    setIsOfficeSelectorOpen,
    setIsOfficeSelectorHighlighted,
    setIsSidebarOpen,
  } = useMenuStore();

  const openSidebarAndOfficeSelector = () => {
    setIsSidebarOpen(true);
    setIsOfficeSelectorOpen(true);
    setIsOfficeSelectorHighlighted(true);
  };

  const handleSelectOfficeClick = () => {
    openSidebarAndOfficeSelector();
  };

  return (
    <Box>
      <Heading
        fontSize={{
          base: "xl",
          lg: "3xl",
        }}
      >
        Schedule
      </Heading>
      <Box>You are not assigned to any office.</Box>
      <Button
        colorScheme="orange"
        backgroundColor={"orange.400"}
        _hover={{
          backgroundColor: "orange.500",
        }}
        onClick={handleSelectOfficeClick}
      >
        Select an office
      </Button>
    </Box>
  );
};
