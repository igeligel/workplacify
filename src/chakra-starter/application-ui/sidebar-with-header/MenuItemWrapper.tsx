import { Box, ColorProps } from "@chakra-ui/react";

type MenuItemWrapperProps = {
  isActive?: boolean;
  onClick?: () => void;
  color: ColorProps["color"];
  children: React.ReactNode;
};

export const MenuItemWrapper = (props: MenuItemWrapperProps) => {
  return (
    <Box
      width={"100%"}
      paddingX={"2"}
      display={"flex"}
      alignItems={"center"}
      paddingY={"1"}
      borderRadius={"md"}
      justifyContent={"space-between"}
      background={props.isActive ? "gray.200" : "transparent"}
      _hover={{
        background: props.isActive ? "gray.200" : "gray.100",
      }}
      cursor={"pointer"}
      color={props.color}
      onClick={props.onClick}
    >
      {props.children}
    </Box>
  );
};
