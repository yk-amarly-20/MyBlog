import Link from 'next/link';
import { Header } from '../../models';
import { CreatedAt } from './CreatedAt';
import { UpdatedAt } from './UpdateAt';
import { Tags } from './Tags';

type Props = {
  article: Header;
}

export const ArticleItem: React.VFC<Props> = ({ article }) => {
  const imageUrl = article.matter.imageUrl ?? "";

  return (
    <div className="root">
      <img className="image" src={imageUrl} alt="article catch" />
      <div className="info">
        <h2 className="title">
          <Link href={`/article/${article.slug}`}>
            <a className="titleLink">{article.matter.title}</a>
          </Link>
        </h2>
        <div className="metaInfo">
          <Tags tags={article.matter.tags} />
          {!!article.matter.updatedAt ? (
            <UpdatedAt updateAt={article.matter.updatedAt} />
          ) : (
              <CreatedAt createdAt={article.matter.createdAt} />
          )}
        </div>
      </div>
    </div>
  )
}
