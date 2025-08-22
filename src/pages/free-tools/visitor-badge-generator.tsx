import { Box, Container, Stack } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";

import { FreeToolHero } from "../../components/FreeToolHero";
import { FreeToolHeroHeading } from "../../components/FreeToolHeroHeading";
import { FreeToolHeroText } from "../../components/FreeToolHeroText";
import { VisitorBadgeCTA } from "../../components/VisitorBadgeGenerator/VisitorBadgeCTA";
import { VisitorBadgeForm } from "../../components/VisitorBadgeGenerator/VisitorBadgeForm";
import { getMessages } from "../../messages/getMessages";

export default function VisitorBadgeGenerator() {
  return (
    <>
      <NextSeo
        title="Free Visitor Badge Generator | Create Professional PDF Badges"
        description="Generate professional visitor badges instantly. Create and download PDF badges with custom details, photos, and QR codes. Free visitor badge template for your workplace."
        canonical="https://workplacify.com/free-tools/visitor-badge-generator"
        openGraph={{
          title:
            "Free Visitor Badge Generator | Create Professional PDF Badges",
          description:
            "Generate professional visitor badges instantly. Create and download PDF badges with custom details, photos, and QR codes.",
          url: "https://workplacify.com/free-tools/visitor-badge-generator",
          type: "website",
          images: [
            {
              url: "/og-images/visitor-badge-generator.png",
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
            <VisitorBadgeCTA />
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
