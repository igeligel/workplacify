import { BlogArticle } from "../chakra-starter/marketing-ui/BlogArticle/types";

export const blogArticles: BlogArticle[] = [
  {
    uuid: "f2a9b3c1-d4e5-4f6a-8b7c-9d0e1f2a3b4c",
    title: "Free Hybrid Workplace Policy Generator: Create Yours Now",
    description:
      "Create a comprehensive hybrid work policy in minutes with our free generator. Learn why a formal policy is essential and how to implement it successfully.",
    readingTime: "10 min",
    url: "/blog/introducing-free-hybrid-workplace-policy-generator",
    image: "/og-images/introducing-free-hybrid-workplace-policy-generator.png",
    imageAlt: "Free Hybrid Workplace Policy Generator: Create Yours Now",
    tags: [
      {
        text: "hybrid-work",
        color: "blue",
      },
      {
        text: "workplace-technology",
        color: "green",
      },
      {
        text: "hr-tools",
        color: "orange",
      },
    ],
    author: {
      name: "Kevin Peters",
      jobTitle: "CEO of Workplacify",
      image: "/profile-kevin-peters.png",
    },
    datePublished: new Date("2025-09-07T20:10:00.000Z"),
  },
  {
    uuid: "13fd086f-486f-496d-99b7-19182a71df9d",
    title: "Why Do Companies Do Hot Desking?",
    description:
      "Learn why companies are adopting hot desking. Discover the benefits of this flexible workspace model and how it can benefit your business.",
    readingTime: "6 min",
    url: "/blog/why-companies-do-hot-desking",
    image: "/og-images/why-companies-do-hot-desking.png",
    imageAlt: "Why Do Companies Do Hot Desking?",
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
    datePublished: new Date("2025-09-05T18:26:00.000Z"),
  },
  {
    uuid: "eafce814-95ed-4755-b28c-5159df5548e3",
    title: "Desk Sharing vs Hot Desking: What's the Difference?",
    description:
      "Discover the key differences between desk sharing and hot desking. Explore pros, cons, and tips to choose the right flexible workspace model for your business.",
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
    datePublished: new Date("2025-09-03T19:26:00.000Z"),
  },
  {
    uuid: "cbc011d8-ba37-4aea-a126-135f87ba36ba",
    title: "Desk Sharing for Startups: Cut Costs & Boost Agility",
    description:
      "Learn how desk sharing helps startups cut costs, boost collaboration, and attract top talent. Discover the financial and cultural benefits of flexible seating.",
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
      "Discover 5 signs you've outgrown your office spreadsheet, from errors to security risks, and learn when to upgrade to smarter workplace management tools.",
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
