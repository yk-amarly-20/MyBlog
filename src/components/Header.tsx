import Link from "next/link";
import { AppContainer } from "./AppContainer";
import style from "../styles/Header.module.css";

export const Header: React.VFC = props => {
  return (
    <header className={style.header}>
      <AppContainer className={style.container}>
        <Link href="/" legacyBehavior>
          <a>
            <img className={style.logo} src="/MyBlog/Images/logo.png" alt="logo" />
          </a>
        </Link>
      </AppContainer>
    </header>
  );
};
