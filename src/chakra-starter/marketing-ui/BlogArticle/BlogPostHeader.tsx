import { Box, Heading, Stack, Text, Image, VStack } from '@chakra-ui/react';

import { BlogArticle } from './types';

const dateFormatOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

type BlogPostHeaderProps = {
  article: BlogArticle;
};

export const BlogPostHeader = (props: BlogPostHeaderProps) => {
  const { article } = props;

  return (
    <Box
      display={'flex'}
      paddingBottom={{ base: '4', md: '16' }}
      flexDirection={{ base: 'column', md: 'row' }}
    >
      <VStack
        flex={12}
        display={'flex'}
        alignItems={'flex-start'}
        justifyContent={'center'}
        gap={{ base: 1, md: 2 }}
      >
        <Text
          fontSize={{ base: 'sm', md: 'lg' }}
          color={'gray.400'}
          fontWeight={'medium'}
        >
          {new Date(article.datePublished).toLocaleDateString(
            undefined,
            dateFormatOptions,
          )}
        </Text>
        <Heading
          as={'h1'}
          fontWeight={'extrabold'}
          fontSize={{ base: 'xl', md: '3xl' }}
        >
          {article.title}
        </Heading>
        <Stack
          marginTop={'4'}
          display={'flex'}
          alignItems={'center'}
          direction={'row'}
          gap={2}
        >
          <Box>
            <Image
              borderRadius="full"
              boxSize={{ base: '36px', md: '48px' }}
              src={article.author.image}
              alt={`profile picture of ${article.author.name}`}
            />
          </Box>
          <Box>
            <Stack alignItems={'flex-start'} gap={'-0.5'} direction="column">
              <Text fontSize={{ base: 'md', md: 'lg' }} fontWeight={'medium'}>
                {article.author.name}
              </Text>
              <Text fontSize={{ base: 'sm', md: 'md' }}>
                {article.author.jobTitle}
              </Text>
            </Stack>
          </Box>
        </Stack>
      </VStack>
      <Box flex={1} />
      <Box
        marginTop={{ base: '4', md: '0' }}
        flex={8}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Image
          boxShadow={'md'}
          maxHeight={'400px'}
          borderRadius={'xl'}
          src={article.image}
          alt={`Blog post image of ${article.image}`}
        />
      </Box>
    </Box>
  );
};
