import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";

export const LeafInfo: React.VFCX = props => {
  return <FontAwesomeIcon className={props.className} icon={faLeaf} />;
};
