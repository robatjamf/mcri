import { execFileSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = fileURLToPath(new URL("..", import.meta.url));
const distDir = fileURLToPath(new URL("../dist", import.meta.url));
const expectedPages = [
  "index.html",
  "404.html",
  "about/index.html",
  "curriculum/index.html",
  "student-work/index.html",
  "support/index.html",
];

execFileSync("pnpm", ["build"], {
  cwd: repoRoot,
  stdio: "inherit",
});

for (const page of expectedPages) {
  const pagePath = join(distDir, page);
  if (!existsSync(pagePath)) {
    throw new Error(`Missing built page: ${page}`);
  }
}

const indexHtml = readFileSync(join(distDir, "index.html"), "utf8");
const aboutHtml = readFileSync(
  join(distDir, "about/index.html"),
  "utf8",
);
const curriculumHtml = readFileSync(
  join(distDir, "curriculum/index.html"),
  "utf8",
);
const supportHtml = readFileSync(
  join(distDir, "support/index.html"),
  "utf8",
);
const robotsTxt = readFileSync(join(distDir, "robots.txt"), "utf8");
const sitemapIndex = readFileSync(
  join(distDir, "sitemap-index.xml"),
  "utf8",
);

const requiredIndexSnippets = [
  'href="/mcri/curriculum"',
  'href="/mcri/about"',
  'href="/mcri/support"',
  'src="/mcri/resources/img/students.jpg"',
  'src="/mcri/resources/logos/JamfCEIlogo-light.png"',
];

for (const snippet of requiredIndexSnippets) {
  if (!indexHtml.includes(snippet)) {
    throw new Error(`Homepage is missing expected base-safe snippet: ${snippet}`);
  }
}

const requiredAboutSnippets = [
  'data-img="/mcri/resources/img/campus.jpg"',
  'src="/mcri/resources/img/campus2.jpg"',
  'src="/mcri/resources/img/campus3.jpg"',
];

for (const snippet of requiredAboutSnippets) {
  if (!aboutHtml.includes(snippet)) {
    throw new Error(`About page is missing expected base-safe snippet: ${snippet}`);
  }
}

if (!curriculumHtml.includes('href="/mcri/sitemap-index.xml"')) {
  throw new Error("Curriculum page is missing the sitemap link in the head.");
}

if (!supportHtml.includes('href="https://www.linkedin.com/company/matterinnovationcentre/"')) {
  throw new Error("Support page lost the external contact link.");
}

const unexpectedRootPaths = [
  'href="/about"',
  'href="/curriculum"',
  'href="/student-work"',
  'href="/support"',
  'src="/resources/',
];

for (const snippet of unexpectedRootPaths) {
  if (
    indexHtml.includes(snippet) ||
    aboutHtml.includes(snippet) ||
    curriculumHtml.includes(snippet) ||
    supportHtml.includes(snippet)
  ) {
    throw new Error(`Found root-relative path that bypasses the repo base path: ${snippet}`);
  }
}

if (
  !robotsTxt.includes("Sitemap: https://robatjamf.github.io/mcri/sitemap-index.xml")
) {
  throw new Error("robots.txt does not point at the staging sitemap URL.");
}

if (!sitemapIndex.includes("https://robatjamf.github.io/mcri/sitemap-0.xml")) {
  throw new Error("Sitemap index does not use the staging Pages URL.");
}
