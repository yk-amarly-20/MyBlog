// import { useRouter } from 'next/router';
// import { ArticleHeader } from '../article/ArticleHeader';
import { Header } from "./../article/Header";
import { AppContainer } from "./AppContainer";
import styles from "./Layout.module.css";
import main_image from "../../Images/page_top_test.jpg";

export const Layout: React.FC = props => {
  // const isHome = useRouter().pathname === "/";

  return (
    <div className={styles.root}>
      {true && (
        <>
          <div className={styles.eyeCatchContainer}>
            <img className={styles.eyeCatch} src={main_image} alt="eye catch" />
          </div>
          <div className={styles.eyeCatchWrapper}>
            <div className={styles.scrollDownContainer}>
              <div className={styles.scrollDown}>Scroll Down</div>
            </div>
          </div>
        </>
      )}
      <div className={styles.mainContent}>
        <Header />
        <div className={styles.main}>
          <AppContainer>{props.children}</AppContainer>
        </div>
      </div>
    </div>
  );
};
