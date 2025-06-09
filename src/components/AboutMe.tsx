import style from "../styles/AboutMe.module.css";
import { ExternalLink } from "../link/ExternalLink";
import { LinkIcon } from "../icon/LinkIcon";
//import { Info } from "../icon/Info";
import { LeafIcon } from "../icon/LeafIcon";
import { SideMenuTitle } from "./sideMenu/SideMenuTitle";

export const AboutMe: React.FC = () => {
  return (
    <div>
      <SideMenuTitle icon={<LeafIcon className={style.icon} />}>About Me</SideMenuTitle>
      <div className={style.wrapper}>
        <div className={style.aboutme}>
          <img src="/MyBlog/Images/Yuto.jpg" className={style.avatar} alt="avatar" />
          <div className={style.biography}>
            <p>コジコジ</p>
            <p>ソフトウェアエンジニア</p>
            <p>
              <ExternalLink href="https://github.com/yk-amarly-20">
                Github <LinkIcon className={style.linkIcon} />
              </ExternalLink>
            </p>
            <p>
              <ExternalLink href="https://twitter.com/yk_Amarly_20">
                Twitter <LinkIcon className={style.linkIcon} />
              </ExternalLink>
            </p>
            <p>
              <ExternalLink href="https://yk-amarly-20.github.io/portfolio/">
                Portfolio <LinkIcon className={style.linkIcon} />
              </ExternalLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
