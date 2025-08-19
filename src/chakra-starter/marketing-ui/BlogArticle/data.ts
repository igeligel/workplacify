import { BlogArticle } from './types';

export const blogArticles: BlogArticle[] = [
  {
    uuid: 'f6d7606d-a97f-405d-b458-18058232df1b',
    title:
      'The ROI of Premium UI Components: A Case Study with Fortune 500 Companies',
    description:
      'Explore how investing in premium UI components can significantly reduce development time and improve product quality. Features real metrics and success stories from major enterprises.',
    readingTime: '6 min',
    url: '/blog/roi-premium-ui-components-case-study',
    image: '/previews/blog-articles.png',
    imageAlt: 'Premium UI components showcase',
    tags: [
      {
        text: 'case study',
        color: 'blue',
      },
      {
        text: 'enterprise',
        color: 'purple',
      },
    ],
    author: {
      name: 'Kevin Peters',
      jobTitle: 'Founder of Chakra Starter',
      image: 'https://picsum.photos/40/40',
    },
    datePublished: new Date('2024-05-26T16:00:00.000Z'),
  },
];
