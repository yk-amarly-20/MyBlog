import Link from "next/link";
import React from "react";
import { TagIcon } from "./TagIcon";
import styles from "./styles/Tags.module.css";

type Props = {
  tags: string[];
};

export const Tags: React.VFC<Props> = ({ tags }) => {
  return (
    <div className={styles.root}>
      <TagIcon className={styles.icon} />
      <p className={styles.tags}>
        {tags.map((tag, index) => (
          <React.Fragment key={index}>
            <Link href={`/tags/${tag}`}>
              <a className={styles.tag}>{tag}</a>
            </Link>
            {index !== tags.length - 1 && <span>, </span>}
          </React.Fragment>
        ))}
      </p>
    </div>
  );
};
