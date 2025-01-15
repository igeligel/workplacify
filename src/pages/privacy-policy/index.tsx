import { Container } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";

import { PrivacyPolicy } from "../../chakra-starter/marketing-ui/privacy-policy";
import { getMessages } from "../../messages/getMessages";

const companyName = "workplacify";
const companyEmail = "kevinigeligeligel@gmail.com";

const PrivacyPolicyPage = () => {
  return (
    <>
      <NextSeo
        title={`Privacy policy of ${companyName}`}
        description={`Privacy policy of ${companyName}. It describes how we collect, use, and share your personal data. We also describe the rights you have to control your data.`}
        canonical={`${process.env.NEXT_PUBLIC_BASE_URL}/privacy-policy`}
        noindex
      />
      <Container maxW={"6xl"}>
        <PrivacyPolicy companyName={companyName} companyEmail={companyEmail} />
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

export default PrivacyPolicyPage;
