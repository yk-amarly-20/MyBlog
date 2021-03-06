import { Tag } from "../modules/models";
import { SideMenuTitle } from "./sideMenu/SideMenuTitle";
// import { TagsIcon } from "../icon/TagsIcon";
import { Hashtag } from "../icon/HashTag";
import { RightIcon } from "../icon/RightIcon";
import style from "../styles/Tags.module.css";
import Link from "next/link";

type Props = {
  tags: Tag[];
};

export const TagLinks: React.VFC<Props> = props => {
  return (
    <div>
      <div className={style.title}>
        <SideMenuTitle icon={<Hashtag className={style.tagsIcon} />}>Tags</SideMenuTitle>
      </div>
      <div className={style.links}>
        {props.tags.map((tag, index) => (
          <Link key={index} href={`/tags/${tag.name}`}>
            <a className={style.tagLink}>
              <p>
                <span className={style.tagName}>{encodeURI(tag.name)}</span>
                <span className={style.count}>{`(${tag.count})`}</span>
              </p>
              <span>
                <RightIcon className={style.chevronIcon} />
              </span>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};
