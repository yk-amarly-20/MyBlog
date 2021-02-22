import { Header } from '../../models';
import { ArticleItem } from './ArticleItem';

type Props = {
  articles: Header[];
}

export const ArticleList: React.VFC<Props> = (props) => {
  return (
    <div className="root">
      {props.articles.map(article => (
        <ArticleItem key={article.slug} article={article} />
      ))}
    </div>
  )
}
