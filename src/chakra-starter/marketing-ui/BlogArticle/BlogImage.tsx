import { Box, Text } from "@chakra-ui/react";
import { StaticImageData } from "next/legacy/image";
import Zoom from "react-medium-image-zoom";

type BlogImageProps = {
  alt: string;
  image: StaticImageData | string;
};

export const BlogImage = (props: BlogImageProps) => {
  const { alt, image } = props;

  return (
    <Box
      as={"figure"}
      display={"flex"}
      justifyContent={"center"}
      flexDirection={"column"}
      alignItems={"center"}
      width={"100%"}
    >
      <Zoom>
        <img
          src={typeof image === "string" ? image : image.src}
          alt={alt}
          style={{
            borderRadius: "0.5rem",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            maxWidth: "100%",
            width: "100%",
          }}
        />
      </Zoom>
      <Text
        as="figcaption"
        fontSize={"md"}
        textAlign="center"
        marginTop={"2"}
        color={"gray.500"}
      >
        {alt}
      </Text>
    </Box>
  );
};
