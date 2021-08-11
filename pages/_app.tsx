import React from "react";
import { AppContext, AppProps } from "next/app";
import { ServerStyleSheets } from '@material-ui/core/styles';
import "../styles/index.scss";
import { StoreWrapper } from "../store";
import cookies from "next-cookies";

function MyApp({
  Component,
  pageProps,
}: { userAddress?: string; token?: string } & AppProps) {

  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  
  return (
    <StoreWrapper>
      <Component {...pageProps} />
    </StoreWrapper>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();

  const { userAddress, token } = cookies(appContext.ctx);
  return { userAddress, token };
};

export default MyApp;
