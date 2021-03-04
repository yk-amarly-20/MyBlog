import Head from "next/head";
import { getAllArticleTags, getSortedArticleHeaders } from "../modules/posts";
import { GetStaticProps, NextPage } from "next";
import { Header as IArticleHeader, Tag } from "../modules/models";
import { Root } from "../templates/Root";
import { SEO } from "../templates/SEO";

type Props = {
  articles: IArticleHeader[];
  tags: Tag[];
};

const Home: NextPage<Props> = ({ articles, tags }: Props) => {
  return (
    <>
      <SEO title="TOP" description="コジコジ ブログ" />
      <Root articles={articles} tags={tags} />
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const articles = await getSortedArticleHeaders();
  const tags = await getAllArticleTags();

  return {
    props: {
      articles,
      tags,
    },
  };
};
