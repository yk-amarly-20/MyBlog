import Link from "next/link";
import React from 'react';
import { Tag } from "./Tag";
import "./styles/Tags.css"

type Props = {
  tags: string[];
};

export const Tags: React.VFC<Props> = ({ tags }) => {
  return (
    <div>
      <Tag className="root" />
      <p className="tags">
        {tags.map((tag, index) => (
          <React.Fragment key={index}>
            <Link href={`/tags/${tag}`}>
              <a className="tag">{tag}</a>
            </Link>
            {index !== tags.length - 1 && <span>, </span>}
          </React.Fragment>
        ))}
      </p>
    </div>
  )
}
