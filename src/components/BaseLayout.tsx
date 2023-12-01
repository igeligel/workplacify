import { Box } from "@chakra-ui/react";
import Head from "next/head";

import { Footer } from "../chakra-starter/marketing-ui/footer";
import { NavbarWithDrawer } from "../chakra-starter/marketing-ui/navbar-with-drawer";

// import { Footer } from "./Footer";

type BaseLayoutProps = {
  children: React.ReactNode;
};

export const BaseLayout = (props: BaseLayoutProps) => {
  return (
    <>
      <Head>
        <title>Prisma Starter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        as={"main"}
        display={"flex"}
        minHeight={"100vh"}
        flexDirection={"column"}
      >
        <NavbarWithDrawer />

        <Box
          flex={"1"}
          paddingTop={"60px"}
          paddingBottom={{ base: 16, md: 36 }}
          as="main"
        >
          {props.children}
        </Box>
        <Footer />
      </Box>
    </>
  );
};
