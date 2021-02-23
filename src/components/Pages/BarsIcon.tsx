import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

type Props = {
  className: string;
};

export const BarsIcon: React.VFC<Props> = props => {
  return <FontAwesomeIcon className={props.className} icon={faBars} />;
};
