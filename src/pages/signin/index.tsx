import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";

import { JoinOurTeam } from "../../components/BringWorkplaceTogetherForm";
import { getMessages } from "../../messages/getMessages";

const SigninPage = () => {
  return (
    <>
      <NextSeo noindex />
      <JoinOurTeam />
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

export default SigninPage;
