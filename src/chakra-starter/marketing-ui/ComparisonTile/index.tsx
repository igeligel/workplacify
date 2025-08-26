import { Box, Icon, Stack } from "@chakra-ui/react";
import NextLink from "next/link";
import { SiChakraui } from "react-icons/si";

import { ComparisonTileBox } from "./ComparisonTileBox";
import { ComparisonTileCta } from "./ComparisonTileCta";
import { ComparisonTileListItem } from "./ComparisonTileListItem";
import { ComparisonTileSeparator } from "./ComparisonTileSeparator";

type ComparisonTileProps = {
  firstTile?: React.ReactNode;
  secondTile?: React.ReactNode;
};

export const ComparisonTile = (props: ComparisonTileProps) => {
  const { firstTile, secondTile } = props;

  return (
    <>
      <Stack
        display={"flex"}
        gap={{ base: 1, sm: 4 }}
        alignItems={"stretch"}
        direction={{ base: "column", sm: "row" }}
      >
        {firstTile || (
          <ComparisonTileBox
            colorPalette="orange"
            image={{
              source: "https://picsum.photos/1395/579",
              alt: "A visual comparison showing the efficiency of using Chakra Starter versus building from scratch, highlighting the pre-built components and faster development experience.",
            }}
            heading={
              <>
                With{" "}
                <Box maxW={"24px"} marginX={1} display={"inline-flex"}>
                  <Icon>
                    <SiChakraui />
                  </Icon>
                </Box>
                Chakra Starter
              </>
            }
            listItems={
              <>
                <ComparisonTileListItem
                  checked
                  title={<>1. Pre-built Components</>}
                  description={
                    <>
                      Start with 30+ production-ready components designed for
                      common use cases
                    </>
                  }
                />
                <ComparisonTileListItem
                  checked
                  title={<>2. Rapid Development</>}
                  description={
                    <>
                      Launch faster with pre-configured Chakra UI themes and
                      responsive layouts
                    </>
                  }
                />
                <ComparisonTileListItem
                  checked
                  title={<>3. Best Practices Built-in</>}
                  description={
                    <>
                      Accessibility, TypeScript, and modern React patterns come
                      standard
                    </>
                  }
                />
              </>
            }
            cta={
              <ComparisonTileCta>
                <NextLink href={"/"}>Get Started with Chakra Starter</NextLink>
              </ComparisonTileCta>
            }
          />
        )}
        <ComparisonTileSeparator label="vs" />
        {secondTile || (
          <ComparisonTileBox
            colorPalette="gray"
            image={{
              source: "https://picsum.photos/1395/579",
              alt: "A visual comparison showing the efficiency of using Chakra Starter versus building from scratch, highlighting the pre-built components and faster development experience.",
            }}
            heading={<>Building from Scratch</>}
            listItems={
              <>
                <ComparisonTileListItem
                  title={<>1. Time-Consuming Setup</>}
                  description={
                    <>
                      Weeks spent configuring components, themes, and project
                      structure
                    </>
                  }
                />
                <ComparisonTileListItem
                  title={<>2. Inconsistent Design</>}
                  description={
                    <>
                      Struggle with maintaining visual consistency and
                      responsive behavior
                    </>
                  }
                />
                <ComparisonTileListItem
                  title={<>3. Technical Debt</>}
                  description={
                    <>
                      Missing accessibility features and poor code organization
                    </>
                  }
                />
              </>
            }
          />
        )}
      </Stack>
    </>
  );
};

export default ComparisonTile;
