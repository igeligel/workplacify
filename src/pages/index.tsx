import { Box, Container } from "@chakra-ui/react";

import { CallToActionWithAnnotation } from "../chakra-starter/marketing-ui/call-to-action-with-annotation";
import { ThreeTierPricing } from "../chakra-starter/marketing-ui/pricing-table.tsx";
import { SimpleCardWrapper } from "../components/SimpleCardWrapper";

const IndexPage = () => {
  return (
    <>
      <Container maxW={"container.xl"}>
        <CallToActionWithAnnotation />
      </Container>
      <Container maxW={"container.xl"}>
        <Box paddingTop={{ base: 4, lg: 16 }}>
          <SimpleCardWrapper />
        </Box>
      </Container>
      <Container maxW={"container.xl"}>
        <Box paddingTop={{ base: 8, lg: 16 }}>
          <ThreeTierPricing />
        </Box>
      </Container>
      {/* Mention Excel list */}
    </>
  );
};

export default IndexPage;
