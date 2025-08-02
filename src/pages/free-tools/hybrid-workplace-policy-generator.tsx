// import { FiCheck, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { Link } from "@chakra-ui/next-js";
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";

import { CtaActionContainer } from "../../components/CtaActionContainer";
import { Faq } from "../../components/Faq";
import { FeatureSplitted } from "../../components/FeatureSplitted";
import { FreeToolHero } from "../../components/FreeToolHero";
import { FreeToolHeroHeading } from "../../components/FreeToolHeroHeading";
import { FreeToolHeroText } from "../../components/FreeToolHeroText";
import { getMessages } from "../../messages/getMessages";

const baseUrl = "https://www.workplacify.com";
const url = `${baseUrl}/free-tools/hybrid-workplace-policy-generator`;

const DynamicPolicyPreview = dynamic(
  () => import("../../components/PolicyGenerator/PolicyPreview"),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  },
);

const HybridWorkplacePolicyGenerator = () => {
  const { status } = useSession();
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const t = useTranslations("HybridWorkplacePolicyGenerator");

  // Form state
  const [companyName, setCompanyName] = useState("");
  const [workHours, setWorkHours] = useState("");
  const [remoteWorkDays, setRemoteWorkDays] = useState<string[]>([]);
  const [officeWorkDays, setOfficeWorkDays] = useState<string[]>([]);
  const [communicationTools, setCommunicationTools] = useState("");
  const [performanceExpectations, setPerformanceExpectations] = useState("");
  const [contactInformation, setContactInformation] = useState("");

  const toast = useToast();

  const getExistingCertificateGenerations = () => {
    const workplacePolicyGeneratedV1 = localStorage.getItem(
      "workplace-policy-generated-v1",
    );
    let existingCertificateGenerationsUnmapped: { date: Date }[] = [];
    if (workplacePolicyGeneratedV1) {
      existingCertificateGenerationsUnmapped = JSON.parse(
        workplacePolicyGeneratedV1,
      );
    }
    const existingWorkplacePolicyGenerations =
      existingCertificateGenerationsUnmapped.map((item) => {
        return {
          ...item,
          date: new Date(item.date),
        };
      });
    return existingWorkplacePolicyGenerations;
  };

  // Should delete all entries from local storage older than 24 hours.
  const cleanupOldEntries = useCallback(() => {
    const existingCertificateGenerationsNames =
      getExistingCertificateGenerations();
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const filteredTeamNames = existingCertificateGenerationsNames.filter(
      (item) => {
        return item.date > yesterday;
      },
    );
    localStorage.setItem(
      "workplace-policy-generated-v1",
      JSON.stringify(filteredTeamNames),
    );
  }, []);

  const checkForUpsell = useCallback(() => {
    if (status === "authenticated") {
      setIsInitialLoading(false);
      return false;
    }
    cleanupOldEntries();
    const existingCertificateGenerations = getExistingCertificateGenerations();
    if (existingCertificateGenerations.length >= 3) {
      setIsInitialLoading(true);
      // Show a toast
      // alert('Sign up now!');
      return true;
    }
    return false;
  }, [cleanupOldEntries, status]);

  const onGenerateClick = () => {
    // Validate required fields
    if (
      !companyName ||
      !workHours ||
      remoteWorkDays.length === 0 ||
      officeWorkDays.length === 0
    ) {
      toast({
        title: t("toast.missingInformation.title"),
        description: t("toast.missingInformation.description"),
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // TODO: Generate PDF logic here
    console.log("Generating policy for:", {
      companyName,
      workHours,
      remoteWorkDays,
      officeWorkDays,
      communicationTools,
      performanceExpectations,
      contactInformation,
    });
  };

  useEffect(() => {
    if (!isInitialLoading) {
      return;
    }
    if (status === "loading") {
      setIsInitialLoading(true);
      return;
    }
    setIsInitialLoading(false);
  }, [isInitialLoading, status]);

  useEffect(() => {
    checkForUpsell();
  }, [checkForUpsell]);

  return (
    <>
      <NextSeo
        title={t("meta.title")}
        description={t("meta.description")}
        canonical={url}
        openGraph={{
          url,
          title: t("meta.title"),
          description: t("meta.description"),
          type: "website",
          images: [
            {
              url: `${baseUrl}/og-images/hybrid-workplace-policy-generator.png`,
              width: 1200,
              height: 630,
              alt: t("meta.imageAlt"),
            },
          ],
        }}
        twitter={{
          handle: "@WorkplacifyCamp",
          cardType: "summary_large_image",
          site: "@WorkplacifyCamp",
        }}
      />

      <Container maxW="6xl">
        <FreeToolHero
          heading={
            <FreeToolHeroHeading>{t("hero.heading")}</FreeToolHeroHeading>
          }
          text={<FreeToolHeroText>{t("hero.text")}</FreeToolHeroText>}
        />
        <Container maxW={"3xl"} paddingTop={8} paddingX={0}>
          <Stack spacing={6}>
            <FormControl isRequired>
              <FormLabel>{t("form.companyName.label")}</FormLabel>
              <Input
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder={t("form.companyName.placeholder")}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>{t("form.workHours.label")}</FormLabel>
              <Input
                value={workHours}
                onChange={(e) => setWorkHours(e.target.value)}
                placeholder={t("form.workHours.placeholder")}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>{t("form.remoteWorkDays.label")}</FormLabel>
              <CheckboxGroup
                value={remoteWorkDays}
                onChange={(values) => setRemoteWorkDays(values as string[])}
              >
                <Stack spacing={2}>
                  <Checkbox value="Monday">
                    {t("form.weekDays.monday")}
                  </Checkbox>
                  <Checkbox value="Tuesday">
                    {t("form.weekDays.tuesday")}
                  </Checkbox>
                  <Checkbox value="Wednesday">
                    {t("form.weekDays.wednesday")}
                  </Checkbox>
                  <Checkbox value="Thursday">
                    {t("form.weekDays.thursday")}
                  </Checkbox>
                  <Checkbox value="Friday">
                    {t("form.weekDays.friday")}
                  </Checkbox>
                </Stack>
              </CheckboxGroup>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>{t("form.officeWorkDays.label")}</FormLabel>
              <CheckboxGroup
                value={officeWorkDays}
                onChange={(values) => setOfficeWorkDays(values as string[])}
              >
                <Stack spacing={2}>
                  <Checkbox value="Monday">
                    {t("form.weekDays.monday")}
                  </Checkbox>
                  <Checkbox value="Tuesday">
                    {t("form.weekDays.tuesday")}
                  </Checkbox>
                  <Checkbox value="Wednesday">
                    {t("form.weekDays.wednesday")}
                  </Checkbox>
                  <Checkbox value="Thursday">
                    {t("form.weekDays.thursday")}
                  </Checkbox>
                  <Checkbox value="Friday">
                    {t("form.weekDays.friday")}
                  </Checkbox>
                </Stack>
              </CheckboxGroup>
            </FormControl>

            <FormControl>
              <FormLabel>{t("form.communicationTools.label")}</FormLabel>
              <Input
                value={communicationTools}
                onChange={(e) => setCommunicationTools(e.target.value)}
                placeholder={t("form.communicationTools.placeholder")}
              />
            </FormControl>

            <FormControl>
              <FormLabel>{t("form.performanceExpectations.label")}</FormLabel>
              <Textarea
                value={performanceExpectations}
                onChange={(e) => setPerformanceExpectations(e.target.value)}
                placeholder={t("form.performanceExpectations.placeholder")}
                rows={4}
              />
            </FormControl>

            <FormControl>
              <FormLabel>{t("form.contactInformation.label")}</FormLabel>
              <Input
                value={contactInformation}
                onChange={(e) => setContactInformation(e.target.value)}
                placeholder={t("form.contactInformation.placeholder")}
              />
            </FormControl>

            <Button
              colorScheme="orange"
              size="lg"
              onClick={onGenerateClick}
              isLoading={isInitialLoading}
              loadingText={t("form.generatingButton")}
            >
              {t("form.generateButton")}
            </Button>
          </Stack>
        </Container>
        <Container
          maxW={{
            base: "xl",
            md: "2xl",
          }}
          paddingTop={12}
          height={isMobile ? "85px" : "600px"}
        >
          <DynamicPolicyPreview
            companyName={companyName}
            workHours={workHours}
            remoteWorkDays={remoteWorkDays}
            officeWorkDays={officeWorkDays}
            communicationTools={communicationTools}
            performanceExpectations={performanceExpectations}
            contactInformation={contactInformation}
          />
        </Container>
        <FeatureSplitted
          marginTop={{ base: 12, md: 24 }}
          tag={t("features.tag")}
          heading={t("features.title")}
          headingAs="h2"
          description={
            <>
              <Text as="p" fontSize={"xl"}>
                {t("features.description")}
              </Text>
              <Stack spacing={2} mt={4}>
                <Text as="p" fontSize={"xl"}>
                  • {t("features.benefits.first")}
                </Text>
                <Text as="p" fontSize={"xl"}>
                  • {t("features.benefits.second")}
                </Text>
                <Text as="p" fontSize={"xl"}>
                  • {t("features.benefits.third")}
                </Text>
                <Text as="p" fontSize={"xl"}>
                  • {t("features.benefits.fourth")}
                </Text>
              </Stack>
            </>
          }
          image="/og-images/hybrid-workplace-policy-generator-preview.png"
          alt={t("features.imageAlt")}
        />
        <Box marginTop={{ base: 12, lg: 24 }}>
          <CtaActionContainer>
            <Box
              display={"flex"}
              flexDirection={{ base: "column", lg: "row" }}
              alignItems={{ base: "flex-start", lg: "center" }}
              justifyContent={"space-between"}
              width={"100%"}
              gap={4}
            >
              <Box maxWidth={"600px"}>
                <Heading
                  as="h3"
                  fontSize={{ base: "xl", lg: "2xl" }}
                  color={"gray.700"}
                  marginBottom={2}
                  textAlign={"center"}
                >
                  {t("cta.heading")}
                </Heading>
                <Text
                  fontSize={"md"}
                  color={"gray.600"}
                  maxWidth={"380px"}
                  textAlign={"center"}
                  margin={"0 auto"}
                >
                  {t("cta.description")}
                </Text>
              </Box>
              <Box
                display={"flex"}
                alignItems={"center"}
                width={"100%"}
                maxWidth="400px"
                marginTop={{ base: "4", lg: "0" }}
                flex={1}
                justifyContent={"center"}
              >
                <Button
                  as={Link}
                  href={"/app"}
                  variant={"solid"}
                  colorScheme={"orange"}
                  background={"orange.400"}
                  textDecoration={"none"}
                  _hover={{
                    background: "orange.500",
                    textDecoration: "none",
                  }}
                  paddingX={"12"}
                  borderRadius={"full"}
                  size={"sm"}
                >
                  {t("cta.button")}
                </Button>
              </Box>
            </Box>
          </CtaActionContainer>
        </Box>
        <Container maxW="5xl">
          <VStack mt={{ base: 12, lg: 24 }} spacing={{ base: 5, lg: 10 }}>
            <VStack spacing={4}>
              <Heading textAlign={"center"} color={"gray.800"} as="h3">
                {t("sections.createPolicies.heading")}
              </Heading>
              <Text
                fontSize={"xl"}
                textAlign={"center"}
                color={"gray.600"}
                lineHeight={"2.2rem"}
              >
                {t("sections.createPolicies.description")}
              </Text>
            </VStack>
            <VStack spacing={4}>
              <Heading textAlign={"center"} color={"gray.800"} as="h3">
                {t("sections.noTechnicalSkills.heading")}
              </Heading>
              <Text
                fontSize={"xl"}
                textAlign={"center"}
                color={"gray.600"}
                lineHeight={"2.2rem"}
              >
                {t("sections.noTechnicalSkills.description")}
              </Text>
            </VStack>
            <VStack spacing={4}>
              <Heading textAlign={"center"} color={"gray.800"} as="h3">
                {t("sections.generateFree.heading")}
              </Heading>
              <Text
                fontSize={"xl"}
                textAlign={"center"}
                color={"gray.600"}
                lineHeight={"2.2rem"}
              >
                {t("sections.generateFree.description")}
              </Text>
              <Text
                fontSize={"xl"}
                textAlign={"center"}
                color={"gray.600"}
                lineHeight={"2.2rem"}
              >
                {t("sections.generateFree.callToAction")}
              </Text>
            </VStack>
          </VStack>
        </Container>

        <Container maxW={"container.md"} paddingTop={{ base: 6, md: 24 }}>
          <Faq
            questionsAndAnswers={[
              {
                question: t("faq.isFree.question"),
                answer: t("faq.isFree.answer"),
              },
              {
                question: t("faq.customization.question"),
                answer: t("faq.customization.answer"),
              },
              {
                question: t("faq.dataSecurity.question"),
                answer: t("faq.dataSecurity.answer"),
              },
              {
                question: t("faq.workHours.question"),
                answer: t("faq.workHours.answer"),
              },
              {
                question: t("faq.timeZones.question"),
                answer: t("faq.timeZones.answer"),
              },
              {
                question: t("faq.multiplePolicies.question"),
                answer: t("faq.multiplePolicies.answer"),
              },
              {
                question: t("faq.legalCompliance.question"),
                answer: t("faq.legalCompliance.answer"),
              },
              {
                question: t("faq.updateFrequency.question"),
                answer: t("faq.updateFrequency.answer"),
              },
            ]}
          />
        </Container>
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const messages = await getMessages(context);

  return {
    props: {
      messages,
    },
  };
};

export default HybridWorkplacePolicyGenerator;
