import React from 'react';
import { SideMenuTitle } from 'components/sub_menu/SideMenuTitle';
import 'components/sub_menu/SideMenu.css';
import { AboutMe } from 'components/sub_menu/AboutMe';

export const SideMenu: React.VFC = () => {
  return (
    <div className="side-menu">
      <SideMenuTitle />
      <AboutMe />
    </div>
  )
}
