import style from "../../styles/SideMenuTitle.module.css";

type Props = {
  icon: React.ReactNode;
};

export const SideMenuTitle: React.FC<Props> = props => {
  return (
    <div className={style.root}>
      <div className={style.icon}>{props.icon}</div>
      <div className={style.children}>{props.children}</div>
    </div>
  );
};
