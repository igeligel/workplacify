import { Box, Collapse } from "@chakra-ui/react";
import React, { ReactNode, useState } from "react";

import { MenuItem, MenuItemProps } from "./MenuItem";

type Controlled = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

type MenuItemPopoverProps = MenuItemProps & {
  submenu?: ReactNode;
  controlled?: Controlled;
  isHighlighted?: boolean;
};

export const MenuItemPopover: React.FC<MenuItemPopoverProps> = (props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const derivedIsOpen = props.controlled?.isOpen ?? isOpen;

  const onToggleOpen = () => {
    if (props.controlled?.setIsOpen) {
      props.controlled.setIsOpen(!derivedIsOpen);
      return;
    }
    setIsOpen(!isOpen);
  };

  return (
    <Box width={"100%"}>
      <Collapse in={derivedIsOpen} animateOpacity>
        <Box
          color="gray.800"
          bg="gray.50"
          rounded="md"
          shadow="md"
          borderColor={props.isHighlighted ? "orange.500" : "gray.100"}
          borderWidth={props.isHighlighted ? "2px" : "1px"}
          paddingY={"4"}
          paddingX={"2"}
        >
          {props.submenu}
        </Box>
      </Collapse>
      <MenuItem {...props} onClick={onToggleOpen} />
    </Box>
  );
};
