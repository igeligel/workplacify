import { Heading } from "@chakra-ui/react";
import { ReactNode } from "react";

type FreeToolHeroHeadingProps = {
  children: ReactNode;
};

export const FreeToolHeroHeading = (props: FreeToolHeroHeadingProps) => {
  return (
    <Heading
      as="h1"
      size={{ base: "2xl", md: "3xl" }}
      fontWeight="extrabold"
      marginBottom={4}
    >
      {props.children}
    </Heading>
  );
};
