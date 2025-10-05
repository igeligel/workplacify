import { Box } from "@chakra-ui/react";
import { GetServerSideProps } from "next";

import { PeopleAnalytics } from "../../../../components/analytics/PeopleAnalytics";
import { getMessages } from "../../../../messages/getMessages";
import { appAuthRedirect } from "../../../../server/nextMiddleware/appAuthRedirect";

const PeopleAnalyticsPage = () => {
  return (
    <Box colorPalette={"orange"}>
      <PeopleAnalytics />
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { redirect, session } = await appAuthRedirect({
    context,
  });
  if (redirect) return { redirect };

  const messages = await getMessages(context);

  return {
    props: {
      session,
      messages,
    },
  };
};

export default PeopleAnalyticsPage;
