import { Tag, FrontMatter, Header, Article } from "../models";
import { config } from "../config";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remark from "remark";
import strip from "strip-markdown";
// import markdownToc from 'markdown-toc';
var markdownToc = require("markdown-toc");

const postsDirectory = path.join(process.cwd(), "contents");
// const postsDirectory = process.cwd()
console.log(postsDirectory);

async function getArticleRawData(filename: string) {
  const fullPath = path.join(postsDirectory, filename);
  const fileContent = await fs.promises.readFile(fullPath, "utf8");

  return fileContent;
}

function getFrontMatter(
  slug: string,
  rawData: string,
): { frontMatter: FrontMatter; content: string } {
  const matterResult = matter(rawData);

  const matterData = matterResult.data as Partial<FrontMatter>;

  if (!matterData.title) {
    throw new Error(`${slug}: title is required in front matter`);
  }

  if (!matterData.createdAt) {
    throw new Error(`${slug}: createdAt is required in front-matter`);
  }

  if (!matterData.tags) {
    throw new Error(`${slug}: tags is required in front-matter`);
  }

  return {
    frontMatter: {
      ...matterData,
      title: matterData.title,
      createdAt: matterData.createdAt,
      tags: matterData.tags,
    },
    content: matterResult.content,
  };
}

export async function getAllPostSlugs(): Promise<string[]> {
  console.log(process.cwd());
  // const filenames = await fs.promises.readdir(postsDirectory);
  const filenames = await fs.promises.readdir(postsDirectory);

  return filenames.map(filename => filename.replace(/\.md$/, ""));
}

async function getArticleExcerpt(mdText: string): Promise<string> {
  const processed = await remark().use(strip).process(mdText);

  const contentText = processed.toString();

  const excerpt = contentText.trim().replace(/\s+/g, " ").slice(0, config.excerptLength);

  if (contentText.length > config.excerptLength) {
    return excerpt + "...";
  }

  return excerpt;
}

async function getAllArticlesRawData() {
  const slugs = await getAllPostSlugs();

  return await Promise.all(
    slugs.map(async slug => {
      const content = await getArticleRawData(`${slug}.md`);

      return { slug, content };
    }),
  );
}

export async function getSortedArticleHeaders(): Promise<Header[]> {
  const rawData = await getAllArticlesRawData();

  const headerPromises = rawData.map(async data => {
    const { frontMatter, content } = getFrontMatter(data.slug, data.content);

    return {
      slug: data.slug,
      matter: frontMatter,
      excerpt: await getArticleExcerpt(content),
    };
  });

  // Sort posts by date
  return (await Promise.all(headerPromises)).sort((a, b) =>
    a.matter.createdAt < b.matter.createdAt ? 1 : -1,
  );
}

export async function getArticleData(slug: string): Promise<Article> {
  const rawData = await getArticleRawData(`${slug}.md`);

  const { content, frontMatter } = getFrontMatter(slug, rawData);

  const tocMdText = markdownToc(content).content;

  const excerpt = await getArticleExcerpt(content);

  return {
    header: {
      slug,
      matter: frontMatter,
      excerpt,
    },
    bodyMdText: content,
    tocMdText,
  };
}

export async function getAllArticleTags(): Promise<Tag[]> {
  const articles = await getAllArticlesRawData();

  const tagsList = articles.map(article => {
    const { frontMatter } = getFrontMatter(article.slug, article.content);

    return frontMatter.tags;
  });

  const tagsCount = {} as Record<string, number>;

  tagsList.forEach(tags => {
    tags.forEach(tag => {
      tagsCount[tag] = tagsCount[tag] !== undefined ? tagsCount[tag] + 1 : 1;
    });
  });

  return Object.entries(tagsCount).map(([key, count]) => ({
    name: key,
    count: count,
  }));
}