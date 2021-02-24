import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHistory } from "@fortawesome/free-solid-svg-icons";

export const Hist: React.VFCX = props => {
  return <FontAwesomeIcon className={props.className} icon={faHistory} />;
};
