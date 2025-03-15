import { Text } from "@chakra-ui/react";
import { ReactNode } from "react";

type FreeToolHeroTextProps = {
  children: ReactNode;
};

export const FreeToolHeroText = (props: FreeToolHeroTextProps) => {
  return (
    <Text
      fontSize={{ base: "lg", md: "xl" }}
      maxW="2xl"
      marginX="auto"
      color="gray.600"
    >
      {props.children}
    </Text>
  );
};
