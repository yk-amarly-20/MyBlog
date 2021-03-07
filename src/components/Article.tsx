import React from "react";
import { Article as IArticle } from "../modules/models";
import { ContentsLayout } from "../templates/ContentsLayout";
import { Toc } from "../components/Toc";
import { MarkdownRenderer } from "../modules/MarkdownRenderer";
import { ArticleHeader } from "../components/ArticleHeader";
import style from "../styles/Article.module.css";
import { ExternalLink } from "../link/ExternalLink";
import { Github } from "../icon/Github";

type Props = {
  article: IArticle;
};

export const Article: React.VFC<Props> = ({ article }) => {
  return (
    <ContentsLayout sidemenu={<Toc tocMdText={article.tocMdText} />}>
      <ArticleHeader article={article.header} />
      <article className={style.article}>
        <MarkdownRenderer>{article.bodyMdText}</MarkdownRenderer>
      </article>
      <div className={style.articleFooter}>
        <ExternalLink
          className={style.githubLink}
          href={`https://github.com/yk-amarly-20`}>
          <Github className={style.githubIcon} /> 質問、修正リクエストはGitHubまで
        </ExternalLink>
      </div>
    </ContentsLayout>
  );
};
