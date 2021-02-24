import { Header } from "../modules/models";
import { ArticleItem } from "./ArticleItem";
import style from "../styles/ArticleList.module.css";

type Props = {
  articles: Header[];
};

export const ArticleList: React.VFC<Props> = props => {
  return (
    <div className={style.root}>
      {props.articles.map(article => (
        <ArticleItem key={article.slug} article={article} />
      ))}
    </div>
  );
};
