import { Box, Button, Heading, Stack, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { useState } from "react";
import { FiCheck, FiUser } from "react-icons/fi";

type Desk = {
  id: string;
  label: string;
  status: "free" | "occupied";
};

const initialDesks: Desk[] = [
  { id: "a1", label: "A1", status: "occupied" },
  { id: "a2", label: "A2", status: "free" },
  { id: "a3", label: "A3", status: "free" },
  { id: "b1", label: "B1", status: "free" },
  { id: "b2", label: "B2", status: "occupied" },
  { id: "b3", label: "B3", status: "occupied" },
  { id: "c1", label: "C1", status: "free" },
  { id: "c2", label: "C2", status: "free" },
  { id: "c3", label: "C3", status: "occupied" },
];

export const DeskBookingPreview = () => {
  const [desks, setDesks] = useState<Desk[]>(initialDesks);
  const [bookedId, setBookedId] = useState<string | null>(null);

  const handleBook = (desk: Desk) => {
    if (desk.status === "occupied") return;
    setBookedId(desk.id);
    setDesks((prev) =>
      prev.map((d) =>
        d.id === desk.id ? { ...d, status: "occupied" as const } : d,
      ),
    );
  };

  return (
    <Box
      borderWidth={1}
      borderColor="orange.200"
      borderRadius="lg"
      bg="orange.50"
      p={{ base: 4, md: 6 }}
      maxWidth={{ base: "100%", md: "80%" }}
      mx="auto"
    >
      <Heading size="md" mb={1} color="orange.700">
        Book a Desk in Seconds
      </Heading>
      <Text fontSize="sm" mb={4} color="gray.600">
        Tap any free desk to see how Workplacify works
      </Text>

      <Stack gap={2} align="center">
        <Stack gap={2} direction="row">
          {desks.slice(0, 3).map((desk) => (
            <DeskCell
              key={desk.id}
              desk={desk}
              isBooked={bookedId === desk.id}
              onBook={handleBook}
            />
          ))}
        </Stack>
        <Stack gap={2} direction="row">
          {desks.slice(3, 6).map((desk) => (
            <DeskCell
              key={desk.id}
              desk={desk}
              isBooked={bookedId === desk.id}
              onBook={handleBook}
            />
          ))}
        </Stack>
        <Stack gap={2} direction="row">
          {desks.slice(6, 9).map((desk) => (
            <DeskCell
              key={desk.id}
              desk={desk}
              isBooked={bookedId === desk.id}
              onBook={handleBook}
            />
          ))}
        </Stack>
      </Stack>

      {bookedId && (
        <Box
          mt={4}
          p={3}
          borderRadius="md"
          bg="green.100"
          border="1px"
          borderColor="green.300"
          textAlign="center"
        >
          <Text fontSize="sm" fontWeight="bold" color="green.700">
            <Box as="span" mr={1}>
              <FiCheck />
            </Box>
            Desk {bookedId.toUpperCase()} is yours! Check-in tomorrow.
          </Text>
        </Box>
      )}

      <Box mt={4} textAlign="center">
        <Button asChild colorPalette="orange" size="sm">
          <NextLink href="/api/auth/signin">Try Workplacify Free</NextLink>
        </Button>
      </Box>
    </Box>
  );
};

type DeskCellProps = {
  desk: Desk;
  isBooked: boolean;
  onBook: (desk: Desk) => void;
};

const DeskCell = ({ desk, isBooked, onBook }: DeskCellProps) => {
  const isFree = desk.status === "free";
  return (
    <Box
      as="button"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="70px"
      height="70px"
      borderRadius="md"
      borderWidth={2}
      borderColor={isBooked ? "green.400" : isFree ? "orange.300" : "gray.200"}
      bg={isBooked ? "green.100" : isFree ? "white" : "gray.100"}
      cursor={isFree ? "pointer" : "default"}
      _hover={
        isFree ? { borderColor: "orange.500", bg: "orange.100" } : undefined
      }
      onClick={() => onBook(desk)}
      transition="all 0.15s"
    >
      {isBooked ? (
        <Box color="green.500" fontSize="lg">
          <FiCheck />
        </Box>
      ) : !isFree ? (
        <Box color="gray.400" fontSize="lg">
          <FiUser />
        </Box>
      ) : (
        <Box width="20px" height="20px" borderRadius="full" bg="orange.200" />
      )}
      <Text
        fontSize="xs"
        mt={1}
        fontWeight="medium"
        color={isFree ? "orange.700" : "gray.500"}
      >
        {desk.label}
      </Text>
    </Box>
  );
};
