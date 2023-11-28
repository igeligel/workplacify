import {
  Badge,
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  HStack,
  Heading,
  Icon,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { MdOutlineFeedback, MdOutlineTry } from "react-icons/md";

import { useGetStartedModules } from "../../hooks/useGetStartedModules";
import { appAuthRedirect } from "../../server/nextMiddleware/appAuthRedirect";

const AppPage = () => {
  const { isLoading, modules } = useGetStartedModules();
  return (
    <Container maxW={"container.2xl"} paddingX={{ base: "2", lg: "4" }}>
      <Box
        paddingX={{ base: "6", lg: "16" }}
        paddingTop={{ base: "4", lg: "12" }}
        background={"gray.50"}
        borderRadius={4}
        overflow={"hidden"}
        boxShadow={"xl"}
      >
        <Box>
          <Heading
            as={"h2"}
            fontSize={{ base: "lg", lg: "2xl" }}
            color={"gray.700"}
          >
            Get started with workplacify
          </Heading>
        </Box>
        <Box paddingTop={4}>
          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(3, 1fr)" }}
            gap={2}
          >
            {modules.map((module) => {
              const { uuid, Component } = module;

              return (
                <GridItem key={uuid} w="100%" h={"100%"}>
                  {isLoading ? (
                    <Box
                      minHeight={"350px"}
                      height={"100%"}
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      maxWidth={"80%"}
                    >
                      <Spinner />
                    </Box>
                  ) : (
                    <Component />
                  )}
                </GridItem>
              );
            })}
            <GridItem w="100%">
              <VStack
                paddingY={{ base: 4, lg: 0 }}
                spacing={{ base: 2, lg: 4 }}
                alignItems={"flex-start"}
              >
                <HStack spacing={{ base: 2, lg: 4 }} alignItems={"flex-start"}>
                  <Icon
                    transform={"translateY(8px)"}
                    color={"gray.500"}
                    as={MdOutlineTry}
                  />
                  <Box>
                    <Badge colorScheme="yellow">Trial</Badge>
                    <Text>90/90 days left</Text>
                  </Box>
                </HStack>
                <HStack spacing={{ base: 2, lg: 4 }} alignItems={"flex-start"}>
                  <Icon
                    transform={"translateY(4px)"}
                    color={"gray.500"}
                    as={MdOutlineFeedback}
                  />
                  <VStack
                    spacing={{ base: 1, lg: 3 }}
                    alignItems={"flex-start"}
                  >
                    <Heading as={"h3"} fontSize={"sm"} color={"gray.700"}>
                      Missing something?
                    </Heading>
                    <Button
                      size={"sm"}
                      variant={"outline"}
                      colorScheme="orange"
                      color={"orange.400"}
                      textDecoration={"none"}
                      _hover={{
                        textDecoration: "none",
                        color: "orange.500",
                      }}
                    >
                      Request feature
                    </Button>
                  </VStack>
                </HStack>
              </VStack>
            </GridItem>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { redirect, session } = await appAuthRedirect({
    context,
  });
  if (redirect) return { redirect };

  return {
    props: {
      session,
    },
  };
};

export default AppPage;
