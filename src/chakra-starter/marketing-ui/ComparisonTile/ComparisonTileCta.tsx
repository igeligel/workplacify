import { Box, Button } from "@chakra-ui/react";

type ComparisonTileCtaProps = {
  children: React.ReactNode;
};

export const ComparisonTileCta = (props: ComparisonTileCtaProps) => {
  const { children } = props;
  return (
    <Box display={"flex"} justifyContent={"center"} marginTop={4}>
      <Button
        asChild
        paddingX={{ base: 0, sm: 12 }}
        size={{ base: "sm", sm: "lg" }}
        width={{ base: "full", sm: "auto" }}
      >
        {children}
      </Button>
    </Box>
  );
};
