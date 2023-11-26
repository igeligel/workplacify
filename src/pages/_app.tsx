import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import type { AppProps, AppType } from "next/app";
import "react-day-picker/dist/style.css";

import { SidebarBrandWithHeader } from "../chakra-starter/application-ui/sidebar-with-header";
import { BaseLayout } from "../components/BaseLayout";
import { trpc } from "../utils/trpc";

type LandingPageWrapperProps = {
  children: React.ReactNode;
};
const LandingPageWrapper = (props: LandingPageWrapperProps) => {
  return <BaseLayout>{props.children}</BaseLayout>;
};

const AppWrapper = (props: LandingPageWrapperProps) => {
  return <SidebarBrandWithHeader>{props.children}</SidebarBrandWithHeader>;
};

const MyApp = ((props: AppProps) => {
  const { Component, pageProps, router } = props;
  const { session } = pageProps;

  let LayoutWrapper = LandingPageWrapper;
  if (router.pathname.startsWith("/app")) {
    LayoutWrapper = AppWrapper;
  }

  return (
    <SessionProvider session={session}>
      <ChakraProvider>
        <LayoutWrapper>
          <Component {...pageProps} />
        </LayoutWrapper>
      </ChakraProvider>
    </SessionProvider>
  );
}) as AppType;

export default trpc.withTRPC(MyApp);
