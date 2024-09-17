const { SitemapStream, streamToPromise } = require("sitemap");
const { createWriteStream } = require("fs");
const path = require("path");

function replaceSpacesAndHyphens(str) {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    if (str[i] === " ") {
      result += "-";
    } else if (str[i] === "-") {
      result += " ";
    } else {
      result += str[i];
    }
  }
  return result;
}

// Generate the sitemap
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

  let dynamicRoutes = [];
  try {
    const response = await fetch("https://eshareh.com/api/solutions");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    dynamicRoutes = data
      .filter((solution) => solution.active)
      .flatMap((solution) => {
        return [
          `/solutions/${replaceSpacesAndHyphens(solution.en.title)}`,
          `/solutions/${replaceSpacesAndHyphens(solution.fa.title)}`,
        ];
      });
  } catch (error) {
    console.error("Error fetching dynamic routes:", error);
  }

  const allRoutes = [...routes, ...dynamicRoutes];
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
