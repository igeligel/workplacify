import { Box, Container, Grid, GridItem } from "@chakra-ui/react";
import { GetServerSideProps } from "next";

import { getMessages } from "../../messages/getMessages";
import { appAuthRedirect } from "../../server/nextMiddleware/appAuthRedirect";

const OnboardingPage = () => {
  return (
    <Container maxW={"container.xl"}>
      <Box maxW={"3xl"}>
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          <GridItem w="100%" h="10" bg="blue.500" />
          <GridItem w="100%" h="10" bg="blue.500" />
        </Grid>
      </Box>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { redirect, session } = await appAuthRedirect({
    context,
  });
  if (redirect) return { redirect };

  const messages = await getMessages(context);

  return {
    props: {
      session,
      messages,
    },
  };
};

export default OnboardingPage;
