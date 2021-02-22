import { Header } from '../../models';
import { CreatedAt } from './CreatedAt';
import { UpdatedAt } from './UpdateAt';
import { Tags } from './Tags';

type Props = {
  article: Header;
};

export const ArticleHeader: React.VFC<Props> = ({ article }) => {
  return (
    <div className="root">
      <h1 className="title">{article.matter.title}</h1>
      <Tags tags={article.matter.tags} />
      <CreatedAt createdAt={article.matter.createdAt} />
      {article.matter.updatedAt && (
        <UpdatedAt updateAt={article.matter.updatedAt} />
      )}
    </div>
  )
}
