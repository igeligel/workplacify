import { SpaceProps, Tag, Wrap, WrapItem } from '@chakra-ui/react';

type TBlogTags = {
  tags: Array<{ text: string; color: string }>;
  marginTop?: SpaceProps['marginTop'];
};

export const BlogTags = (props: TBlogTags) => {
  return (
    <Wrap spacing={2} marginTop={props.marginTop}>
      {props.tags.map((tag) => {
        return (
          <WrapItem key={tag.text}>
            <Tag size={'md'} colorScheme={tag.color} variant="subtle">
              {tag.text}
            </Tag>
          </WrapItem>
        );
      })}
    </Wrap>
  );
};
