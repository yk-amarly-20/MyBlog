import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHistory } from "@fortawesome/free-solid-svg-icons";

type Props = {
  className: string;
}

export const HistoryIcon: React.VFC<Props> = (props) => {
  return (
    <FontAwesomeIcon className={props.className} icon={faHistory} />
  )
}
