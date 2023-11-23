import { Box, Container, Grid, GridItem } from "@chakra-ui/react";

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

export default OnboardingPage;
