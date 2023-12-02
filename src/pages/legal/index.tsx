import { Container } from "@chakra-ui/react";
import { NextSeo } from "next-seo";

import { Legal } from "../../chakra-starter/marketing-ui/legal";

const companyName = "workplacify";

const LegalPage = () => {
  return (
    <>
      <NextSeo
        title={`Legal for ${companyName}`}
        description={`The legal page of ${companyName}. It contains the legal texts. We are making sure that the texts are up to date.`}
        canonical={`${process.env.NEXT_PUBLIC_BASE_URL}/legal`}
        noindex
      />
      <Container maxW={"6xl"}>
        <Legal companyName={companyName} />
      </Container>
    </>
  );
};

export default LegalPage;
