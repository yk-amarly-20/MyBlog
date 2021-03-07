import React from "react";
import { AppContainer } from "../components/AppContainer";
import { ExternalLink } from "../link/ExternalLink";
import { LinkIcon } from "../icon/LinkIcon";
import style from "../styles/Footer.module.css";

export const Footer: React.VFC = () => {
  const [copyrightPeriod, setCopyrightPeriod] = React.useState("");

  React.useEffect(() => {
    const currentYear = new Date().getFullYear();
    setCopyrightPeriod(currentYear === 2020 ? "2020" : `2020 - ${currentYear}`);
  }, []);

  return (
    <footer className={style.footer}>
      <AppContainer>
        <p className={style.text}>
          This site uses{" "}
          <ExternalLink href="https://policies.google.com/technologies/partner-sites?hl=ja">
            Google Analytics <LinkIcon className={style.icon} />
          </ExternalLink>
        </p>
        <p className={style.text}>
          &copy; {copyrightPeriod}{" "}
          <ExternalLink href="https://twitter.com/yk_amarly_20">
            kojikoji <LinkIcon className={style.icon} />
          </ExternalLink>
        </p>
      </AppContainer>
    </footer>
  );
};
