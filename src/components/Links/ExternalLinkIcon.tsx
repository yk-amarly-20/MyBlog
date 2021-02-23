import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

type Props = {
  className: string;
};

export const ExternalLinkIcon: React.VFC<Props> = props => {
  return <FontAwesomeIcon className={props.className} icon={faExternalLinkAlt} />;
};
