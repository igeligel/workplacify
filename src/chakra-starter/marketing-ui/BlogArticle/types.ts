export type BlogArticle = {
  uuid: string;
  title: string;
  description: string;
  readingTime: string;
  url: string;
  image: string;
  imageAlt: string;
  tags: { text: string; color: string }[];
  author: {
    name: string;
    jobTitle: string;
    image: string;
  };
  datePublished: Date;
};
