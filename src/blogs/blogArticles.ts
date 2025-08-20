import { BlogArticle } from "../chakra-starter/marketing-ui/BlogArticle/types";

export const blogArticles: BlogArticle[] = [
  {
    uuid: "a08a4a54-a5e6-4a6b-a915-8ff273d465ba",
    title: "Desk Scheduling: The Hidden Costs of Your Spreadsheet",
    description:
      "Tired of your desk scheduling spreadsheet? Uncover the hidden costs in wasted admin time, lost productivity, and poor data. Learn how modern office management software can boost workspace efficiency and provide the analytics you need to make smarter decisions.",
    readingTime: "8 min",
    url: "/blog/desk-scheduling-the-hidden-costs-of-your-spreadsheet",
    image:
      "/og-images/desk-scheduling-the-hidden-costs-of-your-spreadsheet.png",
    imageAlt: "The Hidden Costs of Your Spreadsheet",
    tags: [
      {
        text: "workspace-management",
        color: "purple",
      },
      {
        text: "hybrid-work",
        color: "blue",
      },
      {
        text: "workplace-technology",
        color: "green",
      },
    ],
    author: {
      name: "Kevin Peters",
      jobTitle: "CEO of Workplacify",
      image: "/profile-kevin-peters.png",
    },
    datePublished: new Date("2025-08-20T18:00:00.000Z"),
  },
];

export const featuredBlogArticle = blogArticles.find(
  (article) => article.uuid === "a08a4a54-a5e6-4a6b-a915-8ff273d465ba",
)!;
