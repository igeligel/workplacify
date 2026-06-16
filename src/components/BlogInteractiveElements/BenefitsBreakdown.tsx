import { Box, Collapsible, Heading, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { LuChevronDown, LuChevronRight } from "react-icons/lu";

import { useBlogArticleTheme } from "../../chakra-starter/marketing-ui/BlogArticle/useBlogArticleTheme";

type Benefit = {
  id: string;
  title: string;
  summary: string;
  details: string;
};

const benefits: Benefit[] = [
  {
    id: "real-estate",
    title: "Optimized Real Estate",
    summary: "Reduce your office footprint by up to 30%",
    details:
      "Desk booking data reveals exactly how much space you actually need. Most companies discover they can consolidate floors, sublease unused space, or avoid renewing costly leases. For a mid-size firm, this alone can save hundreds of thousands annually.",
  },
  {
    id: "productivity",
    title: "Higher Productivity",
    summary: "Eliminate desk hunting and wasted time",
    details:
      "Employees can book the right space for their task in seconds. No more wandering the office searching for a spot. The time saved across your entire workforce compounds into thousands of productive hours regained each year.",
  },
  {
    id: "retention",
    title: "Increased Employee Retention",
    summary: "Flexibility drives satisfaction and loyalty",
    details:
      "A well-managed hybrid workplace shows employees you trust them. Giving people choice over where and how they work improves engagement and reduces turnover, which is one of the largest hidden costs for any organization.",
  },
  {
    id: "collaboration",
    title: "Better Collaboration",
    summary: "Keep teams connected without assigned seats",
    details:
      "Team members can see who is in the office and book desks near each other. This spontaneous collaboration is lost in chaotic hot-desking setups but preserved with an intentional booking system.",
  },
  {
    id: "data",
    title: "Data-Driven Decisions",
    summary: "Stop guessing, start optimizing",
    details:
      "Detailed analytics on utilization patterns, peak days, and no-show rates give you the evidence you need to make smart real estate and policy decisions. No more relying on gut feelings or outdated spreadsheets.",
  },
];

export const BenefitsBreakdown = () => {
  const { theme } = useBlogArticleTheme();
  const [openIds, setOpenIds] = useState<string[]>([]);

  const bgColor = theme === "dark" ? "gray.800" : "orange.50";
  const cardBg = theme === "dark" ? "gray.700" : "white";
  const borderColor = theme === "dark" ? "gray.600" : "orange.200";

  const toggle = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  return (
    <Box
      borderWidth={1}
      borderColor={borderColor}
      borderRadius="lg"
      bg={bgColor}
      p={{ base: 4, md: 6 }}
      maxWidth={{ base: "100%", md: "80%" }}
      mx="auto"
    >
      <Heading size="md" mb={2}>
        Benefits Breakdown
      </Heading>
      <Text fontSize="sm" mb={4} opacity={0.7}>
        Click each benefit to learn more
      </Text>

      <VStack gap={3} align="stretch">
        {benefits.map((benefit) => {
          const isOpen = openIds.includes(benefit.id);
          return (
            <Collapsible.Root
              key={benefit.id}
              open={isOpen}
              onOpenChange={() => toggle(benefit.id)}
            >
              <Box
                as="button"
                display="flex"
                alignItems="center"
                width="full"
                textAlign="left"
                p={4}
                borderRadius="md"
                borderWidth={1}
                borderColor={borderColor}
                bg={cardBg}
                cursor="pointer"
                _hover={{ borderColor: "orange.400" }}
              >
                <Box flex="1">
                  <Text fontWeight="bold" fontSize="sm">
                    {benefit.title}
                  </Text>
                  <Text fontSize="xs" mt={1} opacity={0.7}>
                    {benefit.summary}
                  </Text>
                </Box>
                {isOpen ? (
                  <LuChevronDown size={18} />
                ) : (
                  <LuChevronRight size={18} />
                )}
              </Box>
              <Collapsible.Content>
                <Box
                  p={4}
                  mt={1}
                  borderRadius="md"
                  bg={theme === "dark" ? "gray.700" : "orange.100"}
                  fontSize="sm"
                >
                  {benefit.details}
                </Box>
              </Collapsible.Content>
            </Collapsible.Root>
          );
        })}
      </VStack>
    </Box>
  );
};
