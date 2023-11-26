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
  Text,
  VStack,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { MdOutlineFeedback, MdOutlineTry } from "react-icons/md";

import { GetStartedModuleInviteEmployees } from "../../components/GetStartedModule/GetStartedModuleInviteEmployees";
import { GetStartedModuleOfficeCreate } from "../../components/GetStartedModule/GetStartedModuleOfficeCreate";
import { appAuthRedirect } from "../../server/nextMiddleware/appAuthRedirect";

const AppPage = () => {
  return (
    <Container maxW={"container.2xl"}>
      <Box
        paddingX={"16"}
        paddingTop={"12"}
        background={"gray.50"}
        borderRadius={4}
        overflow={"hidden"}
        boxShadow={"xl"}
      >
        <Box>
          <Heading as={"h2"} fontSize={"2xl"} color={"gray.700"}>
            Get started with workplacify
          </Heading>
        </Box>
        <Box paddingTop={4}>
          <Grid templateColumns="repeat(3, 1fr)" gap={2}>
            <GridItem w="100%">
              <GetStartedModuleOfficeCreate />
            </GridItem>
            <GridItem w="100%" h="10">
              <GetStartedModuleInviteEmployees />
            </GridItem>
            <GridItem w="100%" h="10">
              <VStack spacing={4} alignItems={"flex-start"}>
                <HStack spacing={4} alignItems={"flex-start"}>
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
                <HStack spacing={4} alignItems={"flex-start"}>
                  <Icon
                    transform={"translateY(4px)"}
                    color={"gray.500"}
                    as={MdOutlineFeedback}
                  ></Icon>
                  <VStack spacing={3} alignItems={"flex-start"}>
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
