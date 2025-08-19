import { Container, VStack } from "@chakra-ui/react";
import { GetServerSideProps } from "next";

import { blogArticles } from "../../../blogs/blogArticles";
import { BlogArticle } from "../../../chakra-starter/marketing-ui/BlogArticle";
import { BlogIntroductionText } from "../../../chakra-starter/marketing-ui/BlogArticle/BlogIntroductionText";
import { BlogSideBarBackLink } from "../../../chakra-starter/marketing-ui/BlogArticle/BlogSideBarBackLink";
import { BlogText } from "../../../chakra-starter/marketing-ui/BlogArticle/BlogText";
import { getMessages } from "../../../messages/getMessages";

const DeskSchedulingTheHiddenCostsOfYourSpreadsheet = () => {
  return (
    <>
      <Container maxW={"6xl"} paddingTop={{ base: 2, lg: 8 }}>
        <BlogArticle
          article={
            blogArticles.find(
              (article) =>
                article.uuid === "a08a4a54-a5e6-4a6b-a915-8ff273d465ba",
            )!
          }
          blogBackLink={
            <BlogSideBarBackLink href="/blog" label="Back to all blogposts" />
          }
          blogIntroductionText={
            <VStack>
              <BlogIntroductionText>
                As a workplace manager, you&apos;re the master of a complex
                puzzle: creating an efficient, productive, and welcoming office
                environment. In the hybrid work era, a core piece of that puzzle
                is desk management. You might be using a shared spreadsheet for
                your <b>desk scheduling</b>, thinking it&apos;s a free and
                simple solution. But what if that &quot;free&quot; tool is
                secretly draining your budget, frustrating your employees, and
                undermining your entire workspace strategy? That seemingly
                harmless Excel or Google Sheet is an iceberg. Its true cost lies
                beneath the surface.
              </BlogIntroductionText>
              <BlogIntroductionText>
                This article pulls back the curtain on the real price of manual
                desk booking. We&apos;ll dissect the hidden costs that go far
                beyond a software subscription fee, including expenses measured
                in wasted hours, lost productivity, and poor strategic
                decisions. We will explore how modern{" "}
                <b>office management software</b>
                transforms this operational headache into a strategic advantage,
                leveraging powerful tools like <b>office analytics</b> and
                dynamic <b>floor planning</b>. By the end, you&apos;ll
                understand why moving beyond the spreadsheet isn&apos;t just an
                upgrade; it&apos;s a critical investment in your company&apos;s
                future.
              </BlogIntroductionText>
            </VStack>
          }
          blogContent={
            <>
              <VStack>
                <BlogText>adwawdawd</BlogText>
              </VStack>
            </>
          }
        />
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const messages = await getMessages(context);

  return {
    props: {
      messages,
    },
  };
};

export default DeskSchedulingTheHiddenCostsOfYourSpreadsheet;
