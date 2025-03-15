/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://workplacify.com",
  generateRobotsTxt: true,
  exclude: ["/app*", "/legal", "/privacy-policy", "/terms-of-use"],
};
