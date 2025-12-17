import {
  Box,
  Container,
  Icon,
  Link,
  SimpleGrid,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { ReactNode } from "react";

import { WorkplacifyIcon } from "../../../components/WorkplacifyIcon";
import { useWorkplacifyTheme } from "../../../hooks/useWorkplacifyTheme";

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
  const { theme } = useWorkplacifyTheme();

  const bgColor = theme === "dark" ? "gray.900" : "gray.50";
  const color = theme === "dark" ? "gray.200" : "gray.700";
  const labelColor = theme === "dark" ? "gray.800" : "white";

  return (
    <Box bg={bgColor} color={color}>
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid
          templateColumns={{ sm: "1fr 1fr", md: "2fr 1fr 1fr 1fr 1fr" }}
          gap={8}
        >
          <Stack gap={6}>
            <Box display="flex" alignItems="center">
              <Box maxWidth={"50px"}>
                <Icon h={2} w={2} as={WorkplacifyIcon} />
              </Box>
              <Text
                paddingLeft={2}
                textAlign={useBreakpointValue({ base: "center", md: "left" })}
                fontFamily={"heading"}
                color={labelColor}
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
          <Stack align={"flex-start"}>
            <ListHeader>Office Utilization Reports</ListHeader>
            <Link asChild>
              <NextLink href={"/office-utilization/new-york"}>
                New York
              </NextLink>
            </Link>
            <Link asChild>
              <NextLink href={"/office-utilization/london"}>London</NextLink>
            </Link>
            <Link asChild>
              <NextLink href={"/office-utilization/tokyo"}>Tokyo</NextLink>
            </Link>
            <Link asChild>
              <NextLink href={"/office-utilization/shanghai"}>
                Shanghai
              </NextLink>
            </Link>
            <Link asChild>
              <NextLink href={"/office-utilization/singapore"}>
                Singapore
              </NextLink>
            </Link>
            <Link asChild>
              <NextLink href={"/office-utilization/san-francisco"}>
                San Francisco
              </NextLink>
            </Link>
            <Link asChild>
              <NextLink href={"/office-utilization/paris"}>Paris</NextLink>
            </Link>
            <Link asChild>
              <NextLink href={"/office-utilization/beijing"}>Beijing</NextLink>
            </Link>
          </Stack>
          {/* <Stack align={"flex-start"}>
            <ListHeader>Company</ListHeader>
            <Text>Coming soon</Text>
            <Link href={"#"}>About</Link>
          </Stack> */}
          <Stack align={"flex-start"}>
            <ListHeader>Support</ListHeader>
            <Link asChild>
              <NextLink href={"mailto:kevinigeligeligel@gmail.com"}>
                Email
              </NextLink>
            </Link>
            <Link asChild href="/terms-of-use">
              <NextLink href="/terms-of-use">Terms of Service</NextLink>
            </Link>
            <Link asChild href="/legal">
              <NextLink href="/legal">Legal</NextLink>
            </Link>
            <Link asChild href="/privacy-policy">
              <NextLink href="/privacy-policy">Privacy Policy</NextLink>
            </Link>
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

            <Link
              href={"https://www.linkedin.com/company/workplacify"}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              LinkedIn
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
