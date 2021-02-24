import React from "react";
import { Header, Tag } from "../modules/models";
import { ContentsLayout } from "./ContentsLayout";
import { TagLinks } from "../components/TagLinks";
import { ArticleList } from "../components/ArticleList";

type Props = {
  articles: Header[];
  tags: Tag[];
};

export const Root: React.VFC<Props> = ({ articles, tags }) => {
  return (
    <ContentsLayout sidemenu={<TagLinks tags={tags} />}>
      <ArticleList articles={articles} />
    </ContentsLayout>
  );
};
