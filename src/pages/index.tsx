import { Box, Container } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import { useTranslations } from "next-intl";
import { NextSeo } from "next-seo";

import { CallToActionWithAnnotation } from "../chakra-starter/marketing-ui/call-to-action-with-annotation";
import { ThreeTierPricing } from "../chakra-starter/marketing-ui/pricing-table.tsx";
import { SimpleCardWrapper } from "../components/SimpleCardWrapper";
import { getMessages } from "../messages/getMessages";

const IndexPage = () => {
  const t = useTranslations("IndexPage");
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}`;

  const title = t("IndexPageTitle");
  const description = t("IndexPageDescription");

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={`${url}/`}
        openGraph={{
          url,
          type: "website",
          title: "workplacify: Hybrid Office Scheduling Platform",
          description,
          images: [
            {
              url: `${url}/og-images/home.png`,
              width: 1200,
              height: 630,
              alt: "Home picture",
            },
          ],
          siteName: "workplacify",
        }}
        twitter={{
          cardType: "summary_large_image",
        }}
      />
      <Container maxW={"7xl"}>
        <CallToActionWithAnnotation />
      </Container>
      <Container maxW={"7xl"}>
        <Box paddingTop={{ base: 4, lg: 16 }}>
          <SimpleCardWrapper />
        </Box>
      </Container>
      <Container maxW={"7xl"}>
        <Box paddingTop={{ base: 8, lg: 16 }}>
          <ThreeTierPricing />
        </Box>
      </Container>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const messages = await getMessages(context);

  return {
    props: {
      messages: messages,
    },
  };
};

export default IndexPage;
