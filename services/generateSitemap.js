const { SitemapStream, streamToPromise } = require("sitemap");
const { createWriteStream } = require("fs");
const path = require("path");

const generateSitemap = async () => {
  const sitemap = new SitemapStream({ hostname: "https://eshareh.com" });

  const routes = [
    "/",
    "/about",
    "/contact",
    "/solutions",
    "/profession",
    "/news",
    "/search",
  ];

  const allRoutes = [...routes];
  // Add routes to the sitemap
  allRoutes.forEach((route) => {
    sitemap.write({ url: route, changefreq: "daily", priority: 0.7 });
  });
  sitemap.end();
  // Convert the stream to a buffer
  const sitemapBuffer = await streamToPromise(sitemap).then((data) =>
    data.toString()
  );
  // Write to the public folder
  const sitemapPath = path.join(process.cwd(), "public", "sitemap.xml");
  createWriteStream(sitemapPath).write(sitemapBuffer);
};

generateSitemap()
  .then(() => {
    console.log("Sitemap generated successfully!");
  })
  .catch((error) => {
    console.error("Error generating sitemap:", error);
  });
