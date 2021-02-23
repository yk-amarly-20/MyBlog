import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTags } from "@fortawesome/free-solid-svg-icons";

type Props = {
  className: string;
};

export const TagIcon: React.VFC<Props> = props => {
  return <FontAwesomeIcon className={props.className} icon={faTags} />;
};
