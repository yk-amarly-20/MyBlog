import { Date } from "./Date";
import style from "../styles/Date.module.css";
import { Clock } from "../icon/Clock";

type Props = {
  timestamp: string;
};

export const CreatedAt: React.VFC<Props> = props => {
  return (
    <div className={style.root}>
      <Clock className={style.icon} />
      <Date timestamp={props.timestamp} className={style.datetime} />
    </div>
  );
};
