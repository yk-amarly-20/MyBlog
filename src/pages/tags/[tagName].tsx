import { getAllArticleTags, getSortedArticleHeaders } from "../../modules/posts";
import Head from "next/head";
import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import { Header, Tag } from "../../modules/models";
import { TaggedArticles } from "../../components/ArticlesWithTags";
import { SEO } from "../../templates/SEO";

type Props = {
  tagName: string;
  articles: Header[];
  tags: Tag[];
};

const Post: NextPage<Props> = ({ articles, tagName, tags }) => {
  return (
    <>
      <Head>
        <title>tag: {tagName}</title>
      </Head>
      <SEO
        title={`tag: ${tagName}`}
        description={`"${tagName}" でタグ付けされた記事一覧`}
      />
      <TaggedArticles tagName={tagName} tags={tags} articles={articles} />
    </>
  );
};

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  const tags = await getAllArticleTags();

  return {
    paths: tags.map(tag => ({ params: { tagName: tag.name } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, { tagName: string }> = async ({
  params,
}) => {
  if (!params) throw new Error("Component file name must has params.");

  const articles = await getSortedArticleHeaders();
  const tags = await getAllArticleTags();

  return {
    props: {
      tagName: params.tagName,
      articles: articles.filter(article => article.matter.tags.includes(params.tagName)),
      tags,
    },
  };
};
