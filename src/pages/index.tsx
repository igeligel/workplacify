import { Container } from "@chakra-ui/react";

import { CallToActionWithAnnotation } from "../chakra-starter/marketing-ui/call-to-action-with-annotation";

const IndexPage = () => {
  return (
    <>
      <Container maxW={"container.xl"}>
        <CallToActionWithAnnotation />
      </Container>
    </>
  );
};

export default IndexPage;
