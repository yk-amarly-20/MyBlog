import { Tag } from "../../models";
import { SideMenuTitle } from "../sub_menu/SideMenuTitle";
import { TagIcon } from "./TagIcon";
import { RightIcon } from "./RightIcon";
import styles from "./TagLinks.module.css";
import Link from "next/link";

type Props = {
  tags: Tag[];
};

export const TagLinks: React.VFC<Props> = props => {
  return (
    <div>
      <div className={styles.title}>
        <SideMenuTitle icon={<TagIcon className={styles.tagsIcon} />}>Tags</SideMenuTitle>
      </div>
      <div className={styles.links}>
        {props.tags.map((tag, index) => (
          <Link key={index} href={`/tags/${tag.name}`}>
            <a className={styles.tagLink}>
              <p>
                <span className={styles.tagName}>{encodeURI(tag.name)}</span>
                <span className={styles.count}>{`(${tag.count})`}</span>
              </p>
              <span>
                <RightIcon className={styles.chevronIcon} />
              </span>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};
