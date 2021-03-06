import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";

export const HashTag: React.VFCX = props => {
  return <FontAwesomeIcon className={props.className} icon={faHashtag} />;
};
