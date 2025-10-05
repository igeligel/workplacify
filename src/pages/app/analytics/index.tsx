import { Box } from "@chakra-ui/react";
import { GetServerSideProps } from "next";

import { BaseAnalytics } from "../../../components/analytics/BaseAnalytics";
import { getMessages } from "../../../messages/getMessages";
import { appAuthRedirect } from "../../../server/nextMiddleware/appAuthRedirect";

const AnalyticsPage = () => {
  return (
    <Box colorPalette={"orange"}>
      <BaseAnalytics />
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

export default AnalyticsPage;
