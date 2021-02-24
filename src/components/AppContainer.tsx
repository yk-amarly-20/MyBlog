import classnames from "classnames";
import style from "../styles/AppContainer.module.css";

export const AppContainer: React.FCX = props => {
  return (
    <div className={classnames(style.container, props.className)}>{props.children}</div>
  );
};
