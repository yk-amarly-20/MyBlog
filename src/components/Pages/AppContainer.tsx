import styles from "./AppContainer.module.css";
// import classnames from 'classnames';

export const AppContainer: React.FC = props => {
  return <div className={styles.container}>{props.children}</div>;
};
