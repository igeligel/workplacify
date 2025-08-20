import { HStack, Image, Text } from "@chakra-ui/react";

type BlogAuthorProps = {
  date: Date;
  name: string;
  image: string;
};

export const BlogAuthor = (props: BlogAuthorProps) => {
  return (
    <HStack marginTop="2" gap="2" display="flex" alignItems="center">
      <Image
        borderRadius="full"
        boxSize="40px"
        src={props.image}
        alt={`Avatar of ${props.name}`}
      />
      <Text fontWeight="medium">{props.name}</Text>
      <Text>—</Text>
      <Text>{props.date.toLocaleDateString()}</Text>
    </HStack>
  );
};
