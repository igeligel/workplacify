import { Box, Heading, Image, List } from "@chakra-ui/react";

import { useComparisonTileTheme } from "./useComparisonTileTheme";

type ComparisonTileBoxProps = {
  colorPalette: React.ComponentProps<typeof Box>["colorPalette"];
  image: {
    source: string;
    alt: string;
  };
  heading: React.ReactNode;
  listItems: React.ReactNode;
  cta?: React.ReactNode;
};

export const ComparisonTileBox = (props: ComparisonTileBoxProps) => {
  const { theme } = useComparisonTileTheme();
  const { image, heading, listItems, cta, colorPalette } = props;

  return (
    <Box
      colorPalette={colorPalette}
      flex={1}
      backgroundColor={
        theme === "dark" ? "colorPalette.900" : "colorPalette.50"
      }
      borderColor={theme === "dark" ? "colorPalette.700" : "colorPalette.200"}
      borderWidth={1}
      borderRadius={"md"}
      padding={{ base: 2, sm: 4 }}
    >
      <Box
        borderColor={theme === "dark" ? "colorPalette.700" : "colorPalette.200"}
        borderWidth={1}
        borderRadius={"md"}
        overflow={"hidden"}
      >
        <Image src={image.source} alt={image.alt} />
      </Box>
      <Heading
        display={"flex"}
        alignItems={"center"}
        marginTop={{ base: 2, sm: 4 }}
        fontSize={{ base: "lg", sm: "2xl" }}
      >
        {heading}
      </Heading>
      <List.Root
        gap="2"
        variant="plain"
        align="center"
        as={"ol"}
        fontSize={"md"}
        marginTop={{ base: 2, sm: 4 }}
      >
        {listItems}
      </List.Root>
      {cta}
    </Box>
  );
};
