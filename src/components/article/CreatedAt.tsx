import { Date } from './DateParse';
import { DateTimeIcon } from './DateTimeIcon';
import './styles/DateTime.css';

type Props = {
  // creadtedAtのtimestamp
  createdAt: string;
}

export const CreatedAt: React.VFC<Props> = (props) => {
  return (
    <div className="root">
      <DateTimeIcon className="icon"/>
      <Date timestamp={props.createdAt} className="datetime"/>
    </div>
  )
}
