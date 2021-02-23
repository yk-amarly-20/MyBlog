import React from "react";
import "./App.css";
// import { TopPage } from 'components/TopPage';
// import { SideMenu } from 'components/sub_menu/SideMenu';
// import { Root } from 'components/Pages/Root'
// import { AboutMe } from 'components/sub_menu/AboutMe';
import { Layout } from "./components/Pages/Layout";
import { ThemeProvider } from "./mod/Theme";
import { getSortedArticleHeaders } from "./mod/post";
// import { Header } from "./models";

function App() {
  const headers = getSortedArticleHeaders();
  console.log(headers);
  return (
    <ThemeProvider>
      <Layout>
        <p>テストだよ！！！ーーーーーーーーーーー</p>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
