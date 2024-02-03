import { Box, Container } from "@chakra-ui/react";
import { NextSeo } from "next-seo";

import { CallToActionWithAnnotation } from "../chakra-starter/marketing-ui/call-to-action-with-annotation";
import { ThreeTierPricing } from "../chakra-starter/marketing-ui/pricing-table.tsx";
import { SimpleCardWrapper } from "../components/SimpleCardWrapper";

const IndexPage = () => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/`;
  const description =
    "Optimize your hybrid office schedule with Workplacify - the first open-source, self-hostable desk scheduling platform. Elevate workspace efficiency, manage multiple offices effortlessly, and enhance collaboration with our innovative workplace apps. Start a free trial now and experience the power of desk reservation, floor planning, and advanced workplace analytics. No credit card required.";
  return (
    <>
      <NextSeo
        title="workplacify"
        description={description}
        canonical={`${url}/`}
        openGraph={{
          url,
          title: "workplacify - Hybrid Office Scheduling Platform",
          description,
          images: [
            {
              url: "/og-images/home.png",
              width: 1200,
              height: 630,
              alt: "Home picture",
            },
          ],
          site_name: "workplacify",
        }}
        twitter={{
          cardType: "summary_large_image",
        }}
      />
      <Container maxW={"container.xl"}>
        <CallToActionWithAnnotation />
      </Container>
      <Container maxW={"container.xl"}>
        <Box paddingTop={{ base: 4, lg: 16 }}>
          <SimpleCardWrapper />
        </Box>
      </Container>
      <Container maxW={"container.xl"}>
        <Box paddingTop={{ base: 8, lg: 16 }}>
          <ThreeTierPricing />
        </Box>
      </Container>
      {/* Mention Excel list */}
    </>
  );
};

export default IndexPage;
