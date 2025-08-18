import { Box, Collapsible } from "@chakra-ui/react";
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

  const derivedIsOpen = props.controlled?.isOpen || isOpen;

  const onToggleOpen = () => {
    if (props.controlled?.setIsOpen) {
      props.controlled.setIsOpen(!derivedIsOpen);
      return;
    }
    setIsOpen(!isOpen);
  };

  return (
    //   <Collapsible.Root>
    //   <Collapsible.Trigger paddingY="3">Toggle Collapsible</Collapsible.Trigger>
    //   <Collapsible.Content>
    //     <Box padding="4" borderWidth="1px">
    //       <strong>Chakra UI</strong> embraces this philosophy in the world of
    //       design and development. Just like chakras align energy in the body,
    //       Chakra UI aligns your design system — bringing flow, consistency, and
    //       peace of mind to your codebase. It helps developers focus on creating
    //       beautiful, accessible UIs without friction.
    //       <br />
    //       <br />
    //       Think of each component as a wheel in your app’s UI — smooth, connected,
    //       and full of potential. Build with harmony. Build with
    //       <strong>Chakra UI</strong>.
    //     </Box>
    //   </Collapsible.Content>
    // </Collapsible.Root>
    <Collapsible.Root open={derivedIsOpen} width={"100%"} asChild>
      <Box width={"100%"}>
        <Collapsible.Content>
          {/* <Collapse in={derivedIsOpen} animateOpacity> */}
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
          {/* </Collapse> */}
        </Collapsible.Content>
        <Collapsible.Trigger asChild>
          <MenuItem {...props} onClick={onToggleOpen} />
        </Collapsible.Trigger>
      </Box>
    </Collapsible.Root>
  );
};
