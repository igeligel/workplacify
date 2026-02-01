/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://workplacify.com",
  generateRobotsTxt: true,
  exclude: [
    "/app*",
    "/legal",
    "/privacy-policy",
    "/terms-of-use",
    "/signin",
    // Exclude translated pages – only canonical (default locale) URLs belong in the sitemap
    "/de*",
    "/it*",
  ],
};
