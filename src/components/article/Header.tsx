import Link from "next/link";
import { AppContainer } from "./../Pages/AppContainer";
import styles from "./Header.module.css";
import logo_test from "../../Images/logo_test.png";

export const Header: React.VFC = () => {
  return (
    <header className={styles.header}>
      <AppContainer>
        <Link href="/">
          <a>
            <img className={styles.logo} src={logo_test} alt="logo" />
          </a>
        </Link>
      </AppContainer>
    </header>
  );
};
