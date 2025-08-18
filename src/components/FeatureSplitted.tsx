import { Box, Heading, Image, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

import { useWorkplacifyTheme } from "../hooks/useWorkplacifyTheme";

type FeatureSplittedProps = {
  tag: string;
  heading: string;
  headingAs?: React.ComponentProps<typeof Heading>["as"];
  description: ReactNode;
  image: string;
  alt: string;
  reverse?: boolean;
  marginTop?: React.ComponentProps<typeof Box>["marginTop"];
};

export const FeatureSplitted: React.FC<FeatureSplittedProps> = (props) => {
  const { theme } = useWorkplacifyTheme();

  const textColor = theme === "dark" ? "gray.300" : "gray.700";

  const { reverse = false } = props;

  return (
    <Box
      display="flex"
      flexDirection={{
        base: "column",
        md: "column",
        lg: reverse ? "row-reverse" : "row",
      }}
      width="100%"
      justifyContent="space-between"
      marginTop={props.marginTop}
    >
      <Box
        flex="1"
        paddingRight={{ base: "0", lg: !reverse ? "1rem" : 0 }}
        paddingLeft={{ base: "0", lg: reverse ? "1rem" : 0 }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Text
          textTransform="uppercase"
          color="orange.400"
          fontSize="sm"
          fontWeight="700"
          letterSpacing="0.1em"
        >
          {props.tag}
        </Text>
        <Heading as={props.headingAs || "h3"} marginTop="0.5rem">
          {props.heading}
        </Heading>
        <Box marginTop="0.5rem" color={textColor}>
          {props.description}
        </Box>
      </Box>
      <Box
        flex="1"
        marginTop={{ base: 8, lg: 0 }}
        alignItems={"center"}
        display={"flex"}
      >
        <Image src={props.image} alt={props.alt} width={500} height={500} />
        {/* <ChakraNextImage
          boxShadow={"md"}
          borderRadius={"md"}
          src={props.image}
          alt={props.alt}
        /> */}
      </Box>
    </Box>
  );
};
