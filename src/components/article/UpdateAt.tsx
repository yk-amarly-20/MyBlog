import { Date } from './DateParse';
import { HistoryIcon } from './HistoryIcon';
import "./styles/DateTime.css";

type Props = {
  // 更新時のtimestamp
  updateAt: string
};

export const UpdatedAt: React.VFC<Props> = (props) => {
  return (
    <div className="root">
      <HistoryIcon className="icon"/>
      <Date timestamp={props.updateAt} className="datetime"/>
    </div>
  )
}
