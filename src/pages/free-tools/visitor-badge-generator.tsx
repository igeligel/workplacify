import {
  Box,
  Button,
  Container,
  Heading,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";

import { CtaActionContainer } from "../../chakra-starter/marketing-ui/BlogArticle/CtaActionContainer";
import { CtaActionContainerContent } from "../../chakra-starter/marketing-ui/BlogArticle/CtaActionContainerContent";
import { Faq } from "../../components/Faq";
import { FeatureSplitted } from "../../components/FeatureSplitted";
import { FreeToolHero } from "../../components/FreeToolHero";
import { FreeToolHeroHeading } from "../../components/FreeToolHeroHeading";
import { FreeToolHeroText } from "../../components/FreeToolHeroText";
import { VisitorBadgeForm } from "../../components/VisitorBadgeGenerator/VisitorBadgeForm";
import { getMessages } from "../../messages/getMessages";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function VisitorBadgeGenerator() {
  const description = `Create free visitor badges online. Customize with names, photos & QR codes, then download as PDF or PNG for instant professional use.`;
  return (
    <>
      <NextSeo
        title="Free Visitor Badge Generator | Create Professional PDF Badges"
        description={description}
        canonical={`${baseUrl}/free-tools/visitor-badge-generator`}
        openGraph={{
          title:
            "Free Visitor Badge Generator | Create Professional PDF Badges",
          description,
          url: `${baseUrl}/free-tools/visitor-badge-generator`,
          type: "website",
          images: [
            {
              url: `${baseUrl}/og-images/visitor-badge-generator.png`,
              width: 1200,
              height: 630,
              alt: "Visitor Badge Generator Preview",
            },
          ],
        }}
        additionalMetaTags={[
          {
            name: "keywords",
            content:
              "visitor badge generator, free visitor badge template, PDF visitor badge, visitor management system, workplace visitor badges",
          },
        ]}
      />
      <Box as="main">
        <Container
          maxW="7xl"
          px={{ base: 4, sm: 6, lg: 8 }}
          py={{ base: 10, sm: 12 }}
        >
          <Stack gap={8}>
            <FreeToolHero
              heading={
                <FreeToolHeroHeading>
                  Free Visitor Badge Generator
                </FreeToolHeroHeading>
              }
              text={
                <FreeToolHeroText>
                  Create professional visitor badges instantly. Generate and
                  download PDF badges with custom details, photos, and QR codes.
                </FreeToolHeroText>
              }
            />

            <VisitorBadgeForm />
            <Container maxW={"6xl"}>
              <FeatureSplitted
                marginTop={{ base: 12, md: 24 }}
                tag={"Why Use Our Badge Generator?"}
                heading={"Professional Badges in Seconds"}
                headingAs="h2"
                description={
                  <>
                    <Text as="p" fontSize={"xl"}>
                      Our free badge generator makes it simple to design and
                      print visitor badges without expensive software.
                    </Text>
                    <Stack gap={2} mt={4}>
                      <Text as="p" fontSize={"xl"}>
                        • Customize badges with names, company details, and
                        roles.
                      </Text>
                      <Text as="p" fontSize={"xl"}>
                        • Upload photos for extra security and easy
                        identification.
                      </Text>
                      <Text as="p" fontSize={"xl"}>
                        • Add QR codes for fast check-in and tracking.
                      </Text>
                      <Text as="p" fontSize={"xl"}>
                        • Export badges as high-quality PDF or PNG files for
                        printing.
                      </Text>
                    </Stack>
                  </>
                }
                image="/visitor-badge-generator.png"
                alt={"Visitor badge generator preview with photo and QR code"}
              />
            </Container>
            <Container marginTop={{ base: 12, lg: 24 }} maxW={"6xl"}>
              <CtaActionContainer
                ctaContent={
                  <CtaActionContainerContent
                    title={
                      "Ready to take your workplace management to the next level?"
                    }
                    description={
                      "Get access to our complete suite of workplace management tools. Streamline your organization's policies, procedures, and communications with our professional platform."
                    }
                  />
                }
                ctaAction={
                  <Button width={"100%"} colorScheme="blue" size="lg">
                    Get Access
                  </Button>
                }
              />
            </Container>
            <Container maxW="5xl">
              <VStack mt={{ base: 12, lg: 24 }} gap={{ base: 5, lg: 10 }}>
                <VStack gap={4}>
                  <Heading textAlign={"center"} color={"gray.800"} as="h3">
                    {"Create Secure Workplace Badges"}
                  </Heading>
                  <Text
                    fontSize={"xl"}
                    textAlign={"center"}
                    color={"gray.600"}
                    lineHeight={"2.2rem"}
                  >
                    {
                      "Boost workplace security by ensuring every visitor has a professional, clearly labeled badge. Add photos and QR codes for quick identification and access control."
                    }
                  </Text>
                </VStack>
                <VStack gap={4}>
                  <Heading textAlign={"center"} color={"gray.800"} as="h3">
                    {"Perfect for Events and Conferences"}
                  </Heading>
                  <Text
                    fontSize={"xl"}
                    textAlign={"center"}
                    color={"gray.600"}
                    lineHeight={"2.2rem"}
                  >
                    {
                      "Whether you’re hosting a conference, seminar, or networking event, create consistent, branded badges for all attendees in minutes."
                    }
                  </Text>
                </VStack>
                <VStack gap={4}>
                  <Heading textAlign={"center"} color={"gray.800"} as="h3">
                    {"Free and Easy to Use"}
                  </Heading>
                  <Text
                    fontSize={"xl"}
                    textAlign={"center"}
                    color={"gray.600"}
                    lineHeight={"2.2rem"}
                  >
                    {
                      "No design skills required — our tool is simple, fast, and completely free."
                    }
                  </Text>
                  <Text
                    fontSize={"xl"}
                    textAlign={"center"}
                    color={"gray.600"}
                    lineHeight={"2.2rem"}
                  >
                    {
                      "Download unlimited PDF or PNG badges and start using them right away."
                    }
                  </Text>
                </VStack>
              </VStack>
            </Container>
            <Container maxW={"container.md"} paddingTop={{ base: 6, md: 24 }}>
              <Faq
                questionsAndAnswers={[
                  {
                    questionId: "1",
                    question: "What is the Visitor Badge Generator?",
                    answer:
                      "It’s a free online tool that lets you create professional visitor badges in PDF or PNG format, with custom details, photos, and QR codes.",
                  },
                  {
                    questionId: "2",
                    question: "Do I need to sign up or pay?",
                    answer:
                      "No. The tool is 100% free to use with no sign-up required.",
                  },
                  {
                    questionId: "3",
                    question: "Can I upload a visitor photo?",
                    answer:
                      "Yes, you can upload photos for each badge to make identification easier and enhance workplace security.",
                  },
                  {
                    questionId: "4",
                    question: "What formats are supported?",
                    answer:
                      "You can download badges as high-quality PDF or PNG files, ready for printing.",
                  },
                  {
                    questionId: "5",
                    question: "Can I add QR codes to badges?",
                    answer:
                      "Yes, the tool allows you to generate QR codes on badges for check-in, access, or quick visitor verification.",
                  },
                  {
                    questionId: "6",
                    question: "Is the tool suitable for events?",
                    answer:
                      "Absolutely. Many people use the generator for conferences, networking events, or workshops to quickly create attendee badges.",
                  },
                  {
                    questionId: "7",
                    question: "How many badges can I create?",
                    answer:
                      "There are no limits. You can generate as many visitor badges as you need.",
                  },
                  {
                    questionId: "8",
                    question: "Do badges include my company logo?",
                    answer: "No. You can only upload your visitors photos.",
                  },
                  {
                    questionId: "9",
                    question: "Can I print the badges directly?",
                    answer:
                      "Yes, once downloaded as PDF or PNG, the badges can be printed using any standard printer.",
                  },
                  {
                    questionId: "10",
                    question: "Is my data stored?",
                    answer:
                      "No. All data is processed securely in your browser. We do not store or share any of your information.",
                  },
                ]}
              />
            </Container>
          </Stack>
        </Container>
      </Box>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const messages = await getMessages(context);

  return {
    props: {
      messages,
    },
  };
};
