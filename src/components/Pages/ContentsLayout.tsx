import React from "react";
import classnames from "classnames";
import { AboutMe } from "../sub_menu/AboutMe";
import { BarsIcon } from "./BarsIcon";
import { Viewport } from "../../mod/ViewPort";
import styles from "./ContentsLayout.module.css";
// import { SideMenuTitle } from 'components/sub_menu/SideMenuTitle';

type Props = {
  sidemenu?: React.ReactNode;
};

export const ContentsLayout: React.FC<Props> = props => {
  const [sidemenuOpen, setSidemenuOpen] = React.useState(false);

  const ref = React.useRef<HTMLDivElement>(null);

  const isInViewport = Viewport(ref);

  return (
    <div ref={ref} className={styles.layout}>
      <div className={styles.contents}>{props.children}</div>
      <div
        className={classnames(
          styles.sidemenuContainer,
          sidemenuOpen && styles.sidemenuOpen,
        )}>
        <div className={styles.sidemenu}>
          <div className={styles.aboutme}>
            <AboutMe />
          </div>
          <div className={styles.otherMenu}>{props.children}</div>
        </div>
      </div>
      <button
        className={classnames(
          styles.sidemenuOpenButton,
          isInViewport && styles.showSidemenuOpenButton,
        )}
        onClick={() => setSidemenuOpen(prev => !prev)}>
        <BarsIcon className={styles.menuIcon} />
      </button>
    </div>
  );
};
