import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";

export const Clock: React.VFCX = props => {
  return <FontAwesomeIcon className={props.className} icon={faClock} />;
};
