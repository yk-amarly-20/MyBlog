import "./SideMenuTitle.css";

type Props = {
  icon: React.ReactNode;
};

export const SideMenuTitle: React.FC<Props> = (props) => {
  return (
    <div className="root">
      <div className="icon">
        {props.icon}
      </div>
      <div className="children">
        {props.children}
      </div>
    </div>
  );
};
