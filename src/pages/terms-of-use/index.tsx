import { Container } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";

import { TermsOfUse } from "../../chakra-starter/marketing-ui/terms-of-use";
import { getMessages } from "../../messages/getMessages";

const companyName = "workplacify";
const companyEmail = "kevinigeligeligel@gmail.com";

const TermsOfUsePage = () => {
  return (
    <>
      <NextSeo
        title={`Terms of use of ${companyName}`}
        description={`Terms of use of ${companyName}. Here we describe the rules of using workplacify.com. Using this tool comes with requirements for your business to consider.`}
        canonical={`${process.env.NEXT_PUBLIC_BASE_URL}/terms-of-use`}
        noindex
      />
      <Container maxW={"6xl"}>
        <TermsOfUse companyName={companyName} companyEmail={companyEmail} />
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

export default TermsOfUsePage;
