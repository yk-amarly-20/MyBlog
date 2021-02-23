import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

type Props = {
  className: string;
};

export const RightIcon: React.VFC<Props> = props => {
  return <FontAwesomeIcon className={props.className} icon={faChevronRight} />;
};
