import { BlogText } from "./BlogText";

type BlogIntroductionTextProps = {
  children: React.ReactNode;
};

export const BlogIntroductionText = (props: BlogIntroductionTextProps) => {
  const { children } = props;
  return <BlogText>{children}</BlogText>;
};
