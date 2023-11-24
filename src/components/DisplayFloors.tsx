import { Link } from "@chakra-ui/next-js";
import { Box, Button, VStack } from "@chakra-ui/react";
import { Floor, Office } from "@prisma/client";

type DisplayFloorsProps = {
  floors: Floor[];
  office: Office;
};

export const DisplayFloors = (props: DisplayFloorsProps) => {
  if (props.floors.length === 0) {
    return (
      <Box>
        <VStack>
          No floors there yet
          <Button
            as={Link}
            href={`/app/offices/${props.office.id}/floors/new`}
            colorScheme="orange"
            backgroundColor={"orange.400"}
            textColor={"white"}
            _hover={{ backgroundColor: "orange.500" }}
          >
            Add floor
          </Button>
        </VStack>
      </Box>
    );
  }
  return (
    <div>
      {props.floors.map((floor) => {
        return <Box key={floor.id}>{floor.name}</Box>;
      })}
    </div>
  );
};
