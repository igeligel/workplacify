import { Box, Collapse } from "@chakra-ui/react";
import React, { ReactNode, useState } from "react";

import { MenuItem, MenuItemProps } from "./MenuItem";

type MenuItemPopoverProps = MenuItemProps & {
  submenu?: ReactNode;
};

export const MenuItemPopover: React.FC<MenuItemPopoverProps> = (props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <Box width={"100%"}>
      <Collapse in={isOpen} animateOpacity>
        <Box
          color="gray.800"
          bg="gray.50"
          rounded="md"
          shadow="md"
          borderColor={"gray.100"}
          borderWidth={"1px"}
          paddingY={"4"}
          paddingX={"2"}
        >
          {props.submenu}
        </Box>
      </Collapse>
      <MenuItem
        {...props}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      />
    </Box>
  );
};
