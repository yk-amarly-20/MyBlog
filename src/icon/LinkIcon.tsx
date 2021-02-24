import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

export const LinkIcon: React.VFCX = props => {
  return <FontAwesomeIcon className={props.className} icon={faExternalLinkAlt} />;
};
