import { GetServerSideProps } from "next";

import { JoinOurTeam } from "../../components/BringWorkplaceTogetherForm";
import { getMessages } from "../../messages/getMessages";

const SigninPage = () => {
  return (
    <>
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
