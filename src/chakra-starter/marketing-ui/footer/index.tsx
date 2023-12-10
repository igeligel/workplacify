import { Link } from "@chakra-ui/next-js";
import {
  Box,
  Container,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { ReactNode } from "react";

import { WorkplacifyIcon } from "../../../components/WorkplacifyIcon";

type ListHeaderProps = {
  children: ReactNode;
};

const ListHeader = ({ children }: ListHeaderProps) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

export const Footer = () => {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid
          templateColumns={{ sm: "1fr 1fr", md: "2fr 1fr 1fr 1fr 1fr" }}
          spacing={8}
        >
          <Stack spacing={6}>
            <Box display="flex" alignItems="center">
              <Box maxWidth={"50px"}>
                <Icon h={2} w={2} as={WorkplacifyIcon} />
              </Box>
              <Text
                paddingLeft={2}
                textAlign={useBreakpointValue({ base: "center", md: "left" })}
                fontFamily={"heading"}
                color={useColorModeValue("gray.800", "white")}
                fontWeight="600"
              >
                workplacify
              </Text>
            </Box>
            <Text fontSize={"sm"}>
              © {new Date().getFullYear()} workplacify. All rights reserved
            </Text>
          </Stack>
          <Stack align={"flex-start"}></Stack>
          {/* <Stack align={'flex-start'}>
            <ListHeader>Product</ListHeader>
            <Text>Coming soon</Text>

            {/*
                <Link href={"#"}>Overview</Link>
                <Link href={"#"}>Features</Link>
                <Link href={"#"}>Tutorials</Link>
                <Link href={"#"}>Pricing</Link>
                <Link href={"#"}>Releases</Link>
          </Stack> */}
          <Stack align={"flex-start"}></Stack>
          {/* <Stack align={"flex-start"}>
            <ListHeader>Company</ListHeader>
            <Text>Coming soon</Text>
            <Link href={"#"}>About</Link>
          </Stack> */}
          <Stack align={"flex-start"}>
            <ListHeader>Support</ListHeader>
            <Link href={"mailto:kevinigeligeligel@gmail.com"}>Email</Link>
            <Link href="/terms-of-use">Terms of Service</Link>
            <Link href="/legal">Legal</Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Find Us</ListHeader>
            <Link
              href={"https://github.com/igeligel/workplacify"}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              GitHub
            </Link>
          </Stack>
          {/* <Stack align={"flex-start"}>
            <ListHeader>Follow Us</ListHeader>
            <Link
              href={"https://www.linkedin.com/company/hackathon-camp/about/"}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              LinkedIn
            </Link>
            <Link
              href={"https://twitter.com/HackathonCamp"}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              Twitter
            </Link>
            <Link
              href={"https://dev.to/hackathons"}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              dev.to
            </Link>
            <Link
              href={"https://www.indiehackers.com/product/hackathon-camp"}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              Indie Hackers
            </Link>
          </Stack> */}
        </SimpleGrid>
      </Container>
    </Box>
  );
};
