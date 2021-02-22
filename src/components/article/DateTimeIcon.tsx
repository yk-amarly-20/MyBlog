import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";

type Props = {
  className: string
}

export const DateTimeIcon: React.VFC<Props> = props => {
  return <FontAwesomeIcon className={props.className} icon={faClock} />;
};
