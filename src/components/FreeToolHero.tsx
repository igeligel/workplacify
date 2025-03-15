import { Box, Container } from "@chakra-ui/react";
import { ReactNode } from "react";

type FreeToolHeroProps = {
  heading: ReactNode;
  text: ReactNode;
};

export const FreeToolHero = (props: FreeToolHeroProps) => {
  return (
    <Box as="section" paddingTop={{ base: 8, md: 16 }}>
      <Container maxW="container.xl">
        <Box maxW={{ base: "xl", md: "2xl" }} marginX="auto" textAlign="center">
          {props.heading}
          {props.text}
        </Box>
      </Container>
    </Box>
  );
};
