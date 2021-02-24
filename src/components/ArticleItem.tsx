import Link from "next/link";
import { Header } from "../modules/models";
import { CreatedAt } from "./CreatedAt";
import { UpdatedAt } from "./UpdatedAt";
import { TagsWithIcon } from "./TagsWithIcon";
import style from "../styles/ArticleItem.module.css";

type Props = {
  article: Header;
};

export const ArticleItem: React.VFC<Props> = ({ article }) => {
  const imageUrl = article.matter.imageUrl ?? "/Images/noImage.png";

  return (
    <div className={style.root}>
      <img className={style.image} src={imageUrl} alt="article catch" />
      <div className={style.info}>
        <h2 className={style.title}>
          <Link href={`/articles/${article.slug}`}>
            <a className={style.titleLink}>{article.matter.title}</a>
          </Link>
        </h2>
        <div className={style.metaInfo}>
          <TagsWithIcon tags={article.matter.tags} />
          {!!article.matter.updatedAt ? (
            <UpdatedAt timestamp={article.matter.updatedAt} />
          ) : (
            <CreatedAt timestamp={article.matter.createdAt} />
          )}
        </div>
      </div>
    </div>
  );
};
