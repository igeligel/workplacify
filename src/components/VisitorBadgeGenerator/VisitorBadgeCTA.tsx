import { Box, Button, Heading, Stack, Text, VStack } from "@chakra-ui/react";
import NextLink from "next/link";

export function VisitorBadgeCTA() {
  return (
    <Box bg="blue.50" borderRadius="lg" p={8} mt={12}>
      <VStack gap={6} align="center" textAlign="center">
        <Heading size="lg">Need More Advanced Features?</Heading>
        <Text fontSize="lg" maxW="2xl">
          Want customizable templates, bulk badge generation, and advanced
          visitor management? Sign up for Workplacify to access premium
          features:
        </Text>
        <Stack direction={{ base: "column", sm: "row" }} gap={4} mt={4}>
          <Button colorScheme="blue" size="lg" px={8} asChild>
            <NextLink href="/api/auth/signin">Sign Up Now</NextLink>
          </Button>

          <Button asChild variant="outline" colorScheme="blue" size="lg" px={8}>
            <NextLink href="/#pricing">View Pricing</NextLink>
          </Button>
        </Stack>
        <Text fontSize="sm" color="gray.600">
          No credit card required • Free trial available
        </Text>
      </VStack>
    </Box>
  );
}
