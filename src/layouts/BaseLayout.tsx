import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

import { Footer } from "../chakra-starter/marketing-ui/footer";
import { NavbarWithDrawer } from "../chakra-starter/marketing-ui/navbar-with-drawer";

type BaseLayoutProps = {
  children: ReactNode;
};

export const BaseLayout = (props: BaseLayoutProps) => {
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <NavbarWithDrawer />
      <Box
        as="main"
        flex="1"
        marginTop={{
          base: "60px",
          md: "60px",
        }}
      >
        {props.children}
      </Box>
      <Footer />
    </Box>
  );
};
