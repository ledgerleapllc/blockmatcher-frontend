import React from "react";
import { Provider } from "react-redux";
import store from "../redux/store";
import "../styles/app.scss";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <div id="app-wrapper" suppressHydrationWarning>
        {typeof window === "undefined" ? null : <Component {...pageProps} />}
      </div>
    </Provider>
  );
}

export default MyApp;
