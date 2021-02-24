import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export const Bars: React.VFCX = props => {
  return <FontAwesomeIcon className={props.className} icon={faBars} />;
};
