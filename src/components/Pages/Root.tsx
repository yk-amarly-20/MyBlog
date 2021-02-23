import React from "react";
import { Header, Tag } from "../../models";
import { ContentsLayout } from "./ContentsLayout";
import { TagLinks } from "../article/TagLinks";
import { ArticleList } from "../article/ArticleList";

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
