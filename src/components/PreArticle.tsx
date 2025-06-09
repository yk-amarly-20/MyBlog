import Link from "next/link";
import { Header } from "../modules/models";
import { ArrowAltCircleRightIcon } from "../icon/ArrowAltCircleRightIcon";
import style from "../styles/PreArticle.module.css";

type Props = {
  article: Header;
};

export const PreArticle: React.VFC<Props> = ({ article }) => {
  return (
    <Link href={`/articles/${article.slug}`} legacyBehavior>
      <a className={style.root}>
        <div className={style.titleContainer}>
          <div className={style.title}>{article.matter.title}</div>
          <div className={style.iconWrapper}>
            <ArrowAltCircleRightIcon className={style.icon} />
          </div>
        </div>
      </a>
    </Link>
  );
};
