import {
  Badge,
  Box,
  Button,
  CloseButton,
  Container,
  Drawer,
  Grid,
  GridItem,
  HStack,
  Heading,
  Icon,
  Portal,
  Spinner,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { MdOutlineFeedback, MdOutlineTry } from "react-icons/md";

import { useGetStartedModules } from "../../hooks/useGetStartedModules";
import { getMessages } from "../../messages/getMessages";
import { appAuthRedirect } from "../../server/nextMiddleware/appAuthRedirect";
import { trpc } from "../../utils/trpc";

const AppPage = () => {
  const t = useTranslations("AppPage");
  const sendFeedbackMutation = trpc.discord.sendFeedback.useMutation();
  const [isFeedbackDrawerOpen, setIsFeedbackDrawerOpen] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const { isLoading, modules } = useGetStartedModules();
  return (
    <Drawer.Root
      size={"md"}
      open={isFeedbackDrawerOpen}
      placement={"end"}
      onOpenChange={(details) => {
        setIsFeedbackDrawerOpen(details.open);
      }}
    >
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
              {t("startBoxHeading")}
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
                  gap={{ base: 2, lg: 4 }}
                  alignItems={"flex-start"}
                >
                  <HStack gap={{ base: 2, lg: 4 }} alignItems={"flex-start"}>
                    <Icon
                      transform={"translateY(8px)"}
                      color={"gray.500"}
                      as={MdOutlineTry}
                    />
                    <Box>
                      <Badge colorPalette="yellow">{t("trialLabel")}</Badge>
                      <Text>
                        {t("trialDaysLeft", {
                          daysLeft: 90,
                          trialDuration: 90,
                        })}
                      </Text>
                    </Box>
                  </HStack>
                  <HStack gap={{ base: 2, lg: 4 }} alignItems={"flex-start"}>
                    <Icon
                      transform={"translateY(4px)"}
                      color={"gray.500"}
                      as={MdOutlineFeedback}
                    />
                    <VStack gap={{ base: 1, lg: 3 }} alignItems={"flex-start"}>
                      <Heading as={"h3"} fontSize={"sm"} color={"gray.700"}>
                        {t("feedbackHeading")}
                      </Heading>
                      <Drawer.Trigger asChild>
                        <Button
                          size={"sm"}
                          variant={"outline"}
                          colorPalette="orange"
                          color={"orange.400"}
                          textDecoration={"none"}
                          _hover={{
                            textDecoration: "none",
                            color: "orange.500",
                          }}
                          onClick={() => {
                            setIsFeedbackDrawerOpen(true);
                          }}
                        >
                          {t("feedbackButton")}
                        </Button>
                      </Drawer.Trigger>
                    </VStack>
                  </HStack>
                </VStack>
              </GridItem>
            </Grid>
          </Box>
        </Box>
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.Header>
                <Drawer.Title>Request a feature</Drawer.Title>
              </Drawer.Header>
              <Drawer.Body>
                <Textarea
                  value={feedbackText}
                  onChange={(e) => {
                    setFeedbackText(e.target.value);
                  }}
                  rows={10}
                  placeholder="Type here..."
                />
              </Drawer.Body>
              <Drawer.Footer>
                <Button
                  variant="outline"
                  mr={3}
                  onClick={() => {
                    setIsFeedbackDrawerOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  colorPalette="orange"
                  backgroundColor={"orange.400"}
                  _hover={{
                    backgroundColor: "orange.500",
                  }}
                  onClick={async () => {
                    await sendFeedbackMutation.mutateAsync({
                      feedback: feedbackText,
                    });
                    setIsFeedbackDrawerOpen(false);
                  }}
                >
                  Send
                </Button>
              </Drawer.Footer>
              <Drawer.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Drawer.CloseTrigger>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Container>
    </Drawer.Root>
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

export default AppPage;
