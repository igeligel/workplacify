import {
  Box,
  Flex,
  Group,
  HStack,
  Heading,
  Input,
  Stack,
  Stat,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

import { useBlogArticleTheme } from "../../chakra-starter/marketing-ui/BlogArticle/useBlogArticleTheme";

type RoiResult = {
  annualSavings: number;
  netSavings: number;
  roiPercent: number;
};

const calculateRoi = (
  desks: number,
  costPerDesk: number,
  softwareCost: number,
): RoiResult => {
  const annualSavings = desks * costPerDesk;
  const netSavings = annualSavings - softwareCost;
  const roiPercent = softwareCost > 0 ? (netSavings / softwareCost) * 100 : 0;
  return { annualSavings, netSavings, roiPercent };
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

type PlanTier = "starter" | "large" | "enterprise";
type PricingMode = "workplacify" | "custom";

const PLAN_LABELS: Record<PlanTier, string> = {
  starter: "Starter ($10/10 users/mo)",
  large: "Large ($5/10 users/mo)",
  enterprise: "Enterprise (tailored)",
};

const computeWorkplacifyAnnualCost = (
  tier: PlanTier,
  employees: number,
): number | null => {
  if (tier === "starter") return employees * 1 * 12;
  if (tier === "large") return employees * 0.5 * 12;
  return null;
};

export const RoiCalculator = () => {
  const { theme } = useBlogArticleTheme();

  const [desks, setDesks] = useState("20");
  const [costPerDesk, setCostPerDesk] = useState("5000");
  const [pricingMode, setPricingMode] = useState<PricingMode>("workplacify");
  const [planTier, setPlanTier] = useState<PlanTier>("starter");
  const [employeeCount, setEmployeeCount] = useState("200");
  const [customSoftwareCost, setCustomSoftwareCost] = useState("10000");

  const parsedDesks = desks === "" ? 0 : Number(desks);
  const parsedCostPerDesk = costPerDesk === "" ? 0 : Number(costPerDesk);
  const parsedEmployees = employeeCount === "" ? 0 : Number(employeeCount);

  const computedWorkplacifyCost = computeWorkplacifyAnnualCost(
    planTier,
    parsedEmployees,
  );

  const effectiveSoftwareCost =
    pricingMode === "workplacify" && computedWorkplacifyCost !== null
      ? computedWorkplacifyCost
      : pricingMode === "custom"
        ? customSoftwareCost === ""
          ? 0
          : Number(customSoftwareCost)
        : customSoftwareCost === ""
          ? 0
          : Number(customSoftwareCost);

  const result = calculateRoi(
    parsedDesks,
    parsedCostPerDesk,
    effectiveSoftwareCost,
  );

  const bgColor = theme === "dark" ? "gray.800" : "orange.50";
  const borderColor = theme === "dark" ? "gray.700" : "orange.200";
  const planBg = theme === "dark" ? "gray.700" : "white";
  const planSelectedBg = theme === "dark" ? "orange.800" : "orange.100";
  const planBorder = theme === "dark" ? "gray.600" : "orange.300";

  const handleNumericInput = (value: string, setter: (v: string) => void) => {
    if (value === "" || value === "0") {
      setter(value);
      return;
    }
    const num = Number(value);
    if (!isNaN(num) && num >= 0) {
      setter(value);
    }
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
      <Heading size="md" mb={4}>
        ROI Calculator
      </Heading>

      <Flex direction={{ base: "column", md: "row" }} gap={6} mb={6}>
        <Box flex={1}>
          <Text fontWeight="bold" mb={2} fontSize="sm">
            Desks to Reduce
          </Text>
          <Group attached w="full">
            <Input
              type="number"
              value={desks}
              min={0}
              onChange={(e) => handleNumericInput(e.target.value, setDesks)}
            />
          </Group>
        </Box>
        <Box flex={1}>
          <Text fontWeight="bold" mb={2} fontSize="sm">
            Cost per Desk / Year
          </Text>
          <Group attached w="full">
            <Input
              type="number"
              value={costPerDesk}
              min={0}
              step={100}
              onChange={(e) =>
                handleNumericInput(e.target.value, setCostPerDesk)
              }
            />
          </Group>
        </Box>
      </Flex>

      <Box mb={6}>
        <Text fontWeight="bold" mb={2} fontSize="sm">
          Software Cost / Year
        </Text>
        <HStack gap={2} mb={3}>
          <Box
            as="button"
            flex={1}
            textAlign="center"
            py={2}
            px={3}
            borderRadius="md"
            fontWeight="semibold"
            fontSize="sm"
            borderWidth={2}
            cursor="pointer"
            bg={
              pricingMode === "workplacify"
                ? "orange.500"
                : theme === "dark"
                  ? "gray.700"
                  : "gray.100"
            }
            color={
              pricingMode === "workplacify"
                ? "white"
                : theme === "dark"
                  ? "gray.300"
                  : "gray.700"
            }
            borderColor={
              pricingMode === "workplacify" ? "orange.500" : "transparent"
            }
            onClick={() => setPricingMode("workplacify")}
          >
            Workplacify Pricing
          </Box>
          <Box
            as="button"
            flex={1}
            textAlign="center"
            py={2}
            px={3}
            borderRadius="md"
            fontWeight="semibold"
            fontSize="sm"
            borderWidth={2}
            cursor="pointer"
            bg={
              pricingMode === "custom"
                ? "orange.500"
                : theme === "dark"
                  ? "gray.700"
                  : "gray.100"
            }
            color={
              pricingMode === "custom"
                ? "white"
                : theme === "dark"
                  ? "gray.300"
                  : "gray.700"
            }
            borderColor={
              pricingMode === "custom" ? "orange.500" : "transparent"
            }
            onClick={() => setPricingMode("custom")}
          >
            Custom Pricing
          </Box>
        </HStack>

        {pricingMode === "workplacify" ? (
          <Box>
            <Box mb={3}>
              <Text fontWeight="bold" mb={2} fontSize="sm">
                Number of Employees
              </Text>
              <Group attached w="full">
                <Input
                  type="number"
                  value={employeeCount}
                  min={0}
                  onChange={(e) =>
                    handleNumericInput(e.target.value, setEmployeeCount)
                  }
                />
              </Group>
            </Box>
            <Stack gap={2}>
              {(["starter", "large", "enterprise"] as PlanTier[]).map(
                (tier) => {
                  const selected = planTier === tier;
                  return (
                    <Box
                      key={tier}
                      as="button"
                      textAlign="left"
                      p={3}
                      borderRadius="md"
                      cursor="pointer"
                      borderWidth={2}
                      bg={selected ? planSelectedBg : planBg}
                      borderColor={selected ? planBorder : "transparent"}
                      _hover={{ borderColor: planBorder }}
                      onClick={() => setPlanTier(tier)}
                    >
                      <Text fontWeight="semibold" fontSize="sm">
                        {PLAN_LABELS[tier]}
                      </Text>
                      {tier !== "enterprise" && (
                        <Text fontSize="xs" mt={1} opacity={0.7}>
                          {formatCurrency(
                            computeWorkplacifyAnnualCost(
                              tier,
                              parsedEmployees || 1,
                            ) ?? 0,
                          )}{" "}
                          / year
                        </Text>
                      )}
                    </Box>
                  );
                },
              )}
            </Stack>
            {planTier === "enterprise" && (
              <Box mt={3}>
                <Text fontWeight="bold" mb={2} fontSize="sm">
                  Enter your annual cost
                </Text>
                <Group attached w="full">
                  <Input
                    type="number"
                    value={customSoftwareCost}
                    min={0}
                    step={500}
                    onChange={(e) =>
                      handleNumericInput(e.target.value, setCustomSoftwareCost)
                    }
                  />
                </Group>
              </Box>
            )}
            {computedWorkplacifyCost !== null && (
              <Box
                mt={2}
                p={2}
                borderRadius="md"
                bg={theme === "dark" ? "gray.700" : "orange.100"}
              >
                <Text fontSize="sm" textAlign="center">
                  Annual software cost:{" "}
                  <b>{formatCurrency(effectiveSoftwareCost)}</b>
                </Text>
              </Box>
            )}
          </Box>
        ) : (
          <Group attached w="full">
            <Input
              type="number"
              value={customSoftwareCost}
              min={0}
              step={500}
              onChange={(e) =>
                handleNumericInput(e.target.value, setCustomSoftwareCost)
              }
            />
          </Group>
        )}
      </Box>

      <Flex direction={{ base: "column", sm: "row" }} gap={4} justify="center">
        <Stat.Root textAlign="center" flex={1}>
          <Stat.Label>Annual Savings</Stat.Label>
          <Stat.ValueText color="green.500">
            {formatCurrency(result.annualSavings)}
          </Stat.ValueText>
        </Stat.Root>
        <Stat.Root textAlign="center" flex={1}>
          <Stat.Label>Net Savings</Stat.Label>
          <Stat.ValueText
            color={result.netSavings >= 0 ? "green.500" : "red.500"}
          >
            {formatCurrency(result.netSavings)}
          </Stat.ValueText>
        </Stat.Root>
        <Stat.Root textAlign="center" flex={1}>
          <Stat.Label>ROI</Stat.Label>
          <Stat.ValueText
            color={result.roiPercent >= 0 ? "green.500" : "red.500"}
          >
            {result.roiPercent.toFixed(0)}%
          </Stat.ValueText>
        </Stat.Root>
      </Flex>
    </Box>
  );
};
