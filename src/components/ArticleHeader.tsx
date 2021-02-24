import { Header } from "../modules/models";
import { CreatedAt } from "./CreatedAt";
import { UpdatedAt } from "./UpdatedAt";
import { TagsWithIcon } from "./TagsWithIcon";
import style from "../styles/ArticleHeader.module.css";

type Props = {
  article: Header;
};

export const ArticleHeader: React.VFC<Props> = ({ article }) => {
  return (
    <div className={style.root}>
      <h1 className={style.title}>{article.matter.title}</h1>
      <TagsWithIcon tags={article.matter.tags} />
      <CreatedAt timestamp={article.matter.createdAt} />
      {article.matter.updatedAt && <UpdatedAt timestamp={article.matter.updatedAt} />}
    </div>
  );
};
