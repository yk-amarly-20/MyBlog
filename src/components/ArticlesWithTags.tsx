import React from "react";
import { ArticleList } from "../components/ArticleList";
import { TagLinks } from "./TagLinks";
import { Header, Tag } from "../modules/models";
import { ContentsLayout } from "../templates/ContentsLayout";
import style from "../styles/ArticlesWithTags.module.css";

type Props = {
  tagName: string;
  tags: Tag[];
  articles: Header[];
};

export const TaggedArticles: React.VFC<Props> = ({ tagName, articles, tags }) => {
  return (
    <ContentsLayout sidemenu={<TagLinks tags={tags} />}>
      <h1 className={style.heading}>タグ指定: {tagName}</h1>
      <ArticleList articles={articles} />
    </ContentsLayout>
  );
};
