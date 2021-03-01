import { useRouter } from "next/router";
import style from "../styles/Layout.module.css";
import { Header } from "../components/Header";
import { Footer } from "./Footer";
import { AppContainer } from "../components/AppContainer";

export const Layout: React.FC = props => {
  const isHome = useRouter().pathname === "/";

  return (
    <div className={style.root}>
      {isHome && (
        <>
          <div className={style.eyeCatchContainer}>
            <img
              className={style.eyeCatch}
              src="/Images/free_horizontal_on_white_by_logaster.png"
              alt="eye catch"
            />
          </div>
          <div className={style.eyeCatchWrapper}>
            <div className={style.scrollDownContainer}>
              <div className={style.scrollDown}>Scroll down</div>
            </div>
          </div>
        </>
      )}
      <div className={style.mainContent}>
        <Header />
        <div className={style.main}>
          <AppContainer>{props.children}</AppContainer>
        </div>
        <Footer />
      </div>
    </div>
  );
};
