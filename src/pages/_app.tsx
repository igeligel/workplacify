import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import { NextIntlClientProvider } from "next-intl";
import type { AppProps, AppType } from "next/app";
import posthog from "posthog-js";
import { useEffect } from "react";
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

  useEffect(() => {
    posthog.init("phc_8eCgastmlsUMsIr33zEoUx5pSwiT7GSqG3C3lJVVSNS", {
      api_host: "https://eu.posthog.com",
    });
  }, []);

  return (
    <SessionProvider session={session}>
      <ChakraProvider>
        <NextIntlClientProvider
          locale={router.locale || "en-US"}
          messages={pageProps.messages}
        >
          <LayoutWrapper>
            <Component {...pageProps} />
          </LayoutWrapper>
        </NextIntlClientProvider>
      </ChakraProvider>
    </SessionProvider>
  );
}) as AppType;

export default trpc.withTRPC(MyApp);
