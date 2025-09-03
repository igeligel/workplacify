import { BlogArticle } from "../chakra-starter/marketing-ui/BlogArticle/types";

export const blogArticles: BlogArticle[] = [
  {
    uuid: "eafce814-95ed-4755-b28c-5159df5548e3",
    title: "Desk Sharing vs Hot Desking: What's the Difference?",
    description:
      "Confused about desk sharing vs hot desking? Learn the key differences, pros & cons, and discover which flexible seating model is the right choice for your business's culture and goals.",
    readingTime: "13 min",
    url: "/blog/desk-sharing-vs-hot-desking-differences",
    image: "/og-images/desk-sharing-vs-hot-desking-differences.png",
    imageAlt: "Desk Sharing vs Hot Desking: What's the Difference?",
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
    datePublished: new Date("2025-09-02T12:00:00.000Z"),
  },
  {
    uuid: "cbc011d8-ba37-4aea-a126-135f87ba36ba",
    title: "Desk Sharing for Startups: Cut Costs & Boost Agility",
    description:
      "Learn how desk sharing can help startups cut costs and boost agility by sharing desks with other companies.",
    readingTime: "8 min",
    url: "/blog/desk-sharing-startups-cut-costs-boost-agility",
    image: "/og-images/desk-sharing-startups-cut-costs-boost-agility.png",
    imageAlt: "Desk Sharing for Startups: Cut Costs & Boost Agility",
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
    datePublished: new Date("2025-08-31T12:00:00.000Z"),
  },
  {
    uuid: "9ee34256-8c5c-4428-b5c8-764d74167a97",
    title: "5 Signs You've Outgrown Your Office Spreadsheet",
    description:
      "Is your office spreadsheet becoming a bottleneck? Discover the 5 telltale signs that indicate it's time to upgrade your workplace management tools, and learn how to transition to a more efficient solution.",
    readingTime: "8 min",
    url: "/blog/signs-outgrown-office-spreadsheet",
    image: "/og-images/signs-outgrown-office-spreadsheet.png",
    imageAlt: "5 Signs You've Outgrown Your Office Spreadsheet",
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
    datePublished: new Date("2025-08-25T12:00:00.000Z"),
  },
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
