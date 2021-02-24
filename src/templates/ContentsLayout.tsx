import React from "react";
import classnames from "classnames";
import { AboutMe } from "../components/AboutMe";
import { Bars } from "../icon/Bars";
import style from "../styles/ContentsLayout.module.css";
import { Viewport } from "../modules/Viewport";

type Props = { sidemenu?: React.ReactNode };

export const ContentsLayout: React.FC<Props> = props => {
  const [sidemenuOpen, setSidemenuOpen] = React.useState(false);

  const ref = React.useRef<HTMLDivElement>(null);

  const isInViewport = Viewport(ref);

  return (
    <div ref={ref} className={style.layout}>
      <div className={style.contents}>{props.children}</div>
      <div
        className={classnames(
          style.sidemenuContainer,
          sidemenuOpen && style.sidemenuOpen,
        )}>
        <div className={style.sidemenu}>
          <div className={style.aboutme}>
            <AboutMe />
          </div>
          <div className={style.otherMenu}>{props.sidemenu}</div>
        </div>
      </div>
      {/*<div className={style.contents}>{props.children}</div>*/}
      <button
        className={classnames(
          style.sidemenuOpenButton,
          isInViewport && style.showSidemenuOpenButton,
        )}
        onClick={() => setSidemenuOpen(prev => !prev)}>
        <Bars className={style.menuIcon} />
      </button>
    </div>
  );
};
