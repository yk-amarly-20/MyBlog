import ReactMarkdown from "react-markdown";
import style from "../styles/Toc.module.css";
import { ListIcon } from "../icon/ListIcon";
import { SideMenuTitle } from "./sideMenu/SideMenuTitle";

type Props = {
  tocMdText: string;
};

export const Toc: React.VFC<Props> = props => {
  return (
    <div>
      <div className={style.title}>
        <SideMenuTitle icon={<ListIcon className={style.icon} />}>
          Table of Contents
        </SideMenuTitle>
      </div>
      <div className={style.toc}>
        <ReactMarkdown
          renderers={{
            list: List,
            listItem: ListItem,
            link: Link,
          }}>
          {props.tocMdText}
        </ReactMarkdown>
      </div>
    </div>
  );
};

const Link: React.FC = props => {
  return <a {...props} className={style.link} />;
};

const List: React.FC = props => {
  return <ul className={style.list}>{props.children}</ul>;
};

const ListItem: React.FC = props => {
  return <li className={style.listItem}>{props.children}</li>;
};
