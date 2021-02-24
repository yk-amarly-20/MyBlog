import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export const Github: React.VFCX = props => {
  return <FontAwesomeIcon className={props.className} icon={faGithub} />;
};
