import { Date } from "./Date";
import { Hist } from "../icon/Hist";
import style from "../styles/Date.module.css";

type Props = {
  timestamp: string;
};

export const UpdatedAt: React.VFC<Props> = props => {
  return (
    <div className={style.root}>
      <Hist className={style.icon} />
      <Date timestamp={props.timestamp} className={style.datetime} />
    </div>
  );
};
