import Link from "next/link";
import { Header } from "../modules/models";
import { ArrowAltCircleLeftIcon } from "../icon/ArrowAltCircleLeftIcon";
import style from "../styles/Next.module.css";

type Props = {
  article: Header;
};

export const Next: React.VFC<Props> = ({ article }) => {
  return (
    <Link href={`/articles/${article.slug}`} legacyBehavior>
      <a className={style.root}>
        <div className={style.iconWrapper}>
          <ArrowAltCircleLeftIcon className={style.icon} />
        </div>
        <div className={style.titleContainer}>
          <div className={style.title}>{article.matter.title}</div>
        </div>
      </a>
    </Link>
  );
};
