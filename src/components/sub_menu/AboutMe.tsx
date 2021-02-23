import { ExternalLink } from "./../Links/ExternalLink";
import { ExternalLinkIcon } from "./../Links/ExternalLinkIcon";
import { SideMenuTitle } from "./SideMenuTitle";
import { InfoCircleIcon } from "./InfoIcon";
import styles from "./AboutMe.module.css";

export const AboutMe: React.VFC = () => {
  return (
    <div>
      <SideMenuTitle icon={<InfoCircleIcon className="icon" />}>About Me</SideMenuTitle>
      <div className={styles.wrapper}>
        <div className={styles.aboutme}>
          <img className={styles.avatar} src="/image/profile.jpg" alt="avatar" />
          <div className={styles.biography}>
            <p>コジコジ</p>
            <p>ソフトウェアエンジニア</p>
            <p>
              <ExternalLink href="https://github.com/yk-amarly-20">
                GitHub <ExternalLinkIcon className={styles.linkIcon} />
              </ExternalLink>
            </p>
            <p>
              <ExternalLink href="https://twitter.com/yk_Amarly_20">
                Twitter <ExternalLinkIcon className={styles.linkIcon} />
              </ExternalLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
