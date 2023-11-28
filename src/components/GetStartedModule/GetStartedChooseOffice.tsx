import { Link } from "@chakra-ui/next-js";
import {
  Badge,
  Box,
  Button,
  HStack,
  Heading,
  Icon,
  Image,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { FiChevronRight } from "react-icons/fi";

import { useMenuStore } from "../../chakra-starter/application-ui/sidebar-with-header/menuStore";
import { GetStartedBadge } from "./GetStartedBadge";
import { GetStartedButtonLink } from "./GetStartedButtonLink";

export const GetStartedChooseOffice = () => {
  const {
    setIsOfficeSelectorOpen,
    setIsOfficeSelectorHighlighted,
    setIsSidebarOpen,
  } = useMenuStore((state) => ({
    setIsOfficeSelectorOpen: state.setIsOfficeSelectorOpen,
    setIsOfficeSelectorHighlighted: state.setIsOfficeSelectorHighlighted,
    setIsSidebarOpen: state.setIsSidebarOpen,
  }));

  const openSidebarAndOfficeSelector = () => {
    setIsSidebarOpen(true);
    setIsOfficeSelectorOpen(true);
    setIsOfficeSelectorHighlighted(true);
  };

  return (
    <GetStartedButtonLink
      badges={<GetStartedBadge>new</GetStartedBadge>}
      heading={"Choose your office"}
      imageSource={"/get-started-select-office.png"}
      imageAlt={"A preview on how it looks like to select an office"}
      onClick={openSidebarAndOfficeSelector}
    />
  );
};
