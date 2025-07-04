import React from "react";
import Link from "next/link";
import { HashTag } from "../icon/HashTag";
import style from "../styles/TagsWithIcon.module.css";
import { Hash } from "crypto";

type Props = {
  tags: string[];
};

export const TagsWithIcon: React.VFC<Props> = ({ tags }) => {
  return (
    <div className={style.root}>
      <HashTag className={style.icon} />
      <p className={style.tags}>
        {tags.map((tag, index) => (
          <React.Fragment key={index}>
            <Link href={`/tags/${tag}`} legacyBehavior>
              <a className={style.tag}>{tag}</a>
            </Link>
            {index !== tags.length - 1 && <span>, </span>}
          </React.Fragment>
        ))}
      </p>
    </div>
  );
};
