import "../styles/ress.css";
import "../styles/global.css";
import { AppProps } from "next/app";
import { ThemeProvider } from "../modules/theme";
import { Layout } from "../templates/Layout";
import { useGoogleAnalytics } from "../modules/tag";

export default function App({ Component, pageProps }: AppProps) {
  useGoogleAnalytics();

  return (
    <ThemeProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
