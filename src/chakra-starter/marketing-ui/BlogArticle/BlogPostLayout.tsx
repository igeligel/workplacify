import { Box, Container, VStack } from '@chakra-ui/react';
import { BlogPostHeader } from './BlogPostHeader';
import { BlogSideBar, BlogSideBarProps } from './BlogSideBar';
import { BlogArticle } from './types';
import 'react-medium-image-zoom/dist/styles.css';

type BlogPostLayoutProps = BlogSideBarProps & {
  article: BlogArticle;
  children: React.ReactNode;
  blogBackLink: React.ReactNode;
};

export const BlogPostLayout = (props: BlogPostLayoutProps) => {
  return (
    <>
      <BlogPostHeader article={props.article} />
      <Box display={'flex'}>
        <BlogSideBar
          article={props.article}
          blogBackLink={props.blogBackLink}
        />
        <Box flex={1}>
          <Container maxWidth={'3xl'} paddingX="0">
            <VStack
              gap={'4'}
              width={'100%'}
              alignItems="flex-start"
              paddingTop={'4'}
              fontSize={'xl'}
            >
              {props.children}
            </VStack>
          </Container>
        </Box>
      </Box>
    </>
  );
};
