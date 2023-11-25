import { Link } from "@chakra-ui/next-js";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";

// import { FiStar } from "react-icons/fi";
import { GroupedMenuItem } from "./GroupedMenuItem";

type SubItem = {
  id: number;
  title: string;
  icon: any;
};

export const SidebarActiveItems = () => {
  // const currentItems = [
  //   { id: 1, title: "SubItem 1", icon: FiStar },
  //   { id: 2, title: "SubItem 2", icon: FiStar },
  // ];
  const currentItems: SubItem[] = [];
  const noCurrentItems = currentItems.length === 0;

  return (
    <Box width={"100%"}>
      <Heading
        color={"gray.500"}
        fontSize={"xs"}
        textTransform="uppercase"
        w="100%"
      >
        Submenu
      </Heading>
      <VStack spacing={"0.5"} marginTop={"2"}>
        {noCurrentItems && (
          <Text
            fontSize={"xs"}
            fontWeight={"semibold"}
            color="gray.500"
            width="100%"
          >
            There are currently no active items.
          </Text>
        )}
        {currentItems.map((item) => {
          return (
            <Link
              href={`#`}
              key={item.id}
              width={"100%"}
              textDecoration={"none"}
              _hover={{ textDecoration: "none" }}
            >
              <GroupedMenuItem
                isActive={false}
                title={item.title}
                icon={item.icon}
                iconColor={`gray.600`}
              />
            </Link>
          );
        })}
      </VStack>
    </Box>
  );
};
