import { Tag, Wrap, WrapItem } from "@chakra-ui/react";

type TBlogTags = {
  tags: { text: string; color: string }[];
  marginTop?: string | number;
};

export const BlogTags = (props: TBlogTags) => {
  return (
    <Wrap gap={2} marginTop={props.marginTop}>
      {props.tags.map((tag) => {
        return (
          <WrapItem key={tag.text}>
            <Tag.Root size={"md"} colorPalette={tag.color} variant="subtle">
              <Tag.Label>{tag.text}</Tag.Label>
            </Tag.Root>
          </WrapItem>
        );
      })}
    </Wrap>
  );
};
