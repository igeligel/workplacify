import {
  Box,
  Button,
  Center,
  Container,
  Field,
  Grid,
  GridItem,
  Icon,
  Input,
  Steps,
  Text,
  VStack,
} from "@chakra-ui/react";
import { WorkplacifyPreference } from "@prisma/client";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PiChartLineFill, PiDesktopTowerFill } from "react-icons/pi";
import { useDebounce } from "react-use";

import { toaster } from "../../../components/ui/toaster";
import { getMessages } from "../../../messages/getMessages";
import { appAuthRedirect } from "../../../server/nextMiddleware/appAuthRedirect";
import { trpc } from "../../../utils/trpc";

const SetupPage = () => {
  const router = useRouter();
  const [isCreated, setIsCreated] = useState<boolean>(false);
  const [initialLoadComplete, isInitialLoadComplete] = useState<boolean>(false);
  const [inviteCode, setInviteCode] = useState<string>("");
  const onboardingSelection = trpc.onboardingSelection.get.useQuery();
  const updateOnboardingSelectionMutation =
    trpc.onboardingSelection.update.useMutation();
  const createOnboardingSelectionMutation =
    trpc.onboardingSelection.add.useMutation();
  const submitOnboardingSelectionMutation =
    trpc.onboardingSelection.submit.useMutation();

  const [selectedOptions, setSelectedOptions] = useState<
    WorkplacifyPreference[]
  >([]);
  const steps = [
    { title: "Configuration", description: "Choose how workplacify works" },
    { title: "Get Started", description: "Directly get started" },
  ];

  useDebounce(
    () => {
      if (onboardingSelection.data?.submitted) return;
      if (!onboardingSelection.isFetched) return;
      updateOnboardingSelection({
        submitted: false,
        workplacifyPreferences: selectedOptions,
        inviteCode: inviteCode,
      });
    },
    100,
    [inviteCode],
  );

  const [step, setStep] = useState(1);

  useEffect(() => {
    const createOnboardingSelectionAction = async () => {
      // Create onboarding selection with default state
      await createOnboardingSelectionMutation.mutateAsync({
        submitted: false,
        workplacifyPreferences: [],
        temporaryInviteCode: undefined,
      });
      setIsCreated(true);
      onboardingSelection.refetch();
    };

    if (onboardingSelection.isLoading) return;
    if (!onboardingSelection.isFetched) return;
    if (createOnboardingSelectionMutation.isLoading) return;
    if (onboardingSelection.data) return;
    if (isCreated) return;
    createOnboardingSelectionAction();
  }, [
    createOnboardingSelectionMutation,
    onboardingSelection.data,
    onboardingSelection.isFetched,
    onboardingSelection,
    isCreated,
    setIsCreated,
  ]);

  type UpdateOnboardingSelectionProps = {
    inviteCode?: string;
    submitted?: boolean;
    workplacifyPreferences: WorkplacifyPreference[];
  };
  const updateOnboardingSelection = async (
    props: UpdateOnboardingSelectionProps,
  ) => {
    try {
      await updateOnboardingSelectionMutation.mutateAsync({
        submitted: props.submitted || false,
        workplacifyPreferences: props.workplacifyPreferences,
        temporaryInviteCode: props.inviteCode,
      });
    } catch (error) {}
  };

  const onDeskBookingClick = () => {
    const resettedOptions = selectedOptions.filter(
      (option) => option !== "JOIN_ORGANIZATION",
    );

    let newOptions: WorkplacifyPreference[] = [];
    if (resettedOptions.includes("DESK_BOOKING")) {
      newOptions = resettedOptions.filter(
        (option) => option !== "DESK_BOOKING",
      );
    } else {
      newOptions = [...resettedOptions, "DESK_BOOKING"];
    }
    setSelectedOptions(newOptions);

    updateOnboardingSelection({
      submitted: false,
      workplacifyPreferences: newOptions,
      inviteCode: inviteCode,
    });
  };

  const onWorkplaceAnalyticsClick = () => {
    const resettedOptions = selectedOptions.filter(
      (option) => option !== "JOIN_ORGANIZATION",
    );
    let newOptions: WorkplacifyPreference[] = [];
    if (resettedOptions.includes("WORKPLACE_ANALYTICS")) {
      newOptions = resettedOptions.filter(
        (option) => option !== "WORKPLACE_ANALYTICS",
      );
    } else {
      newOptions = [...resettedOptions, "WORKPLACE_ANALYTICS"];
    }
    setSelectedOptions(newOptions);

    updateOnboardingSelection({
      submitted: false,
      workplacifyPreferences: newOptions,
      inviteCode: inviteCode,
    });
  };

  const onJoinOrganizationClick = () => {
    let newOptions: WorkplacifyPreference[] = [];
    if (selectedOptions.includes("JOIN_ORGANIZATION")) {
      newOptions = selectedOptions.filter(
        (option) => option !== "JOIN_ORGANIZATION",
      );
    } else {
      newOptions = ["JOIN_ORGANIZATION"];
    }
    setSelectedOptions(newOptions);

    updateOnboardingSelection({
      submitted: false,
      workplacifyPreferences: newOptions,
      inviteCode: inviteCode,
    });
  };

  const submitForm = async () => {
    try {
      await submitOnboardingSelectionMutation.mutateAsync();
      console.log({ HERE: 1 });
      router.push("/app");
    } catch (error) {
      debugger;
      toaster.create({
        title: "Error",
        description: "Please try again",
        type: "error",
        duration: 9000,
        closable: true,
      });
    }
  };

  useEffect(() => {
    if (!onboardingSelection.isFetched) return;
    if (!onboardingSelection.data) return;
    if (initialLoadComplete) return;
    setSelectedOptions(onboardingSelection.data.workplacifyPreferences);
    setInviteCode(onboardingSelection.data.temporaryInviteCode || "");

    isInitialLoadComplete(true);
    if (onboardingSelection.data.submitted) {
      setStep(2);
    }
  }, [
    initialLoadComplete,
    onboardingSelection.isFetched,
    onboardingSelection.data,
    setStep,
  ]);

  return (
    <Container
      maxW={"container.lg"}
      flex={1}
      display={"flex"}
      flexDirection={"column"}
    >
      <Container maxW={"container.md"}>
        {/* <Steps.Root defaultStep={1} count={steps.length}>

        </Steps.Root> */}
        <Steps.Root defaultStep={1} count={steps.length} colorPalette="orange">
          <Steps.List>
            {steps.map((step, index) => (
              <Steps.Item key={index} index={index} title={step.title}>
                <Steps.Indicator />
                <Steps.Title>{step.title}</Steps.Title>
                <Steps.Separator />
              </Steps.Item>
            ))}
          </Steps.List>

          {steps.map((step, index) => (
            <Steps.Content key={index} index={index}>
              {step.description}
            </Steps.Content>
          ))}
          <Steps.CompletedContent>
            All steps are complete!
          </Steps.CompletedContent>
        </Steps.Root>
      </Container>
      {step === 1 && (
        <Box
          paddingTop={12}
          flex={1}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
        >
          <VStack gap={1}>
            <Text textAlign={"center"} fontSize={"xl"} fontWeight={600}>
              Hi, what brings you to workplacify?
            </Text>
            <Text textAlign={"center"} fontSize={"md"}>
              This will help us get to know you and recommend a solution for
              your needs.
            </Text>
          </VStack>
          <Grid paddingTop={4} templateColumns="repeat(2, 1fr)" gap={8}>
            <GridItem
              w="100%"
              borderRadius={"md"}
              borderColor={
                selectedOptions.includes("DESK_BOOKING")
                  ? "orange.500"
                  : "gray.300"
              }
              paddingY={6}
              paddingX={4}
              borderWidth={
                selectedOptions.includes("DESK_BOOKING") ? "2px" : "1px"
              }
              cursor={"pointer"}
              onClick={onDeskBookingClick}
            >
              <Center>
                <Icon color={"gray.600"} boxSize={12} as={PiDesktopTowerFill} />
              </Center>
              <Text
                paddingTop={4}
                textAlign={"center"}
                color={"gray.700"}
                fontWeight={700}
              >
                Desk booking
              </Text>
              <Text textAlign={"center"} color={"gray.600"}>
                Assign desks or hot desks
              </Text>
            </GridItem>
            <GridItem
              w="100%"
              borderRadius={"md"}
              borderColor={
                selectedOptions.includes("WORKPLACE_ANALYTICS")
                  ? "orange.500"
                  : "gray.300"
              }
              paddingY={6}
              paddingX={4}
              borderWidth={
                selectedOptions.includes("WORKPLACE_ANALYTICS") ? "2px" : "1px"
              }
              cursor={"pointer"}
              onClick={onWorkplaceAnalyticsClick}
            >
              <Center>
                <Icon color={"gray.600"} boxSize={12} as={PiChartLineFill} />
              </Center>
              <Text
                paddingTop={4}
                textAlign={"center"}
                color={"gray.700"}
                fontWeight={700}
              >
                Workplace analytics
              </Text>
              <Text textAlign={"center"} color={"gray.600"}>
                Get occupancy & space insights
              </Text>
            </GridItem>
            <GridItem
              w="100%"
              colSpan={2}
              borderRadius={"md"}
              borderColor={
                selectedOptions.includes("JOIN_ORGANIZATION")
                  ? "orange.500"
                  : "gray.300"
              }
              paddingY={3}
              paddingX={4}
              borderWidth={
                selectedOptions.includes("JOIN_ORGANIZATION") ? "2px" : "1px"
              }
              cursor={"pointer"}
              onClick={onJoinOrganizationClick}
            >
              <Text textAlign={"center"} color={"gray.700"} fontWeight={700}>
                Join organization
              </Text>
              <Text textAlign={"center"} color={"gray.600"}>
                Received an invitation code? Continue with this option.
              </Text>
            </GridItem>
          </Grid>
          {selectedOptions.includes("JOIN_ORGANIZATION") ? (
            <Box paddingTop={4}>
              <Field.Root>
                <Field.Label>Invite code</Field.Label>
                <Input
                  value={inviteCode}
                  placeholder={""}
                  type="text"
                  onChange={(e) => {
                    setInviteCode(e.target.value);
                  }}
                />
                <Field.HelperText>
                  Paste the code sent by your administrator
                </Field.HelperText>
              </Field.Root>
            </Box>
          ) : (
            <></>
          )}
          <Button
            marginTop={4}
            colorPalette={"orange"}
            backgroundColor={"orange.400"}
            onClick={() => {
              submitForm();
            }}
            _hover={{ backgroundColor: "orange.500" }}
          >
            Next
          </Button>
        </Box>
      )}
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  context.req.url = "/app/setup";
  const { redirect, session } = await appAuthRedirect({
    context,
    shouldRedirectToSetup: false,
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

export default SetupPage;
