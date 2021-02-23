import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

type Props = {
  className: string;
};

export const InfoCircleIcon: React.VFC<Props> = props => {
  return <FontAwesomeIcon className={props.className} icon={faInfoCircle} />;
};
