import React from "react";
import Layout from "../components/layout/Layout";
import { store } from "@/app/store";
import { Provider } from "react-redux";

import "./index.css";
import "../components/Body/Body.css";
import "../components/Body/Banner/Banner.css";
import "../components/Header/Header.css";
import "../components/Header/Categories/Categories.css";
import "../components/layout/Layout.css";
import "../components/ProductDetail/ProductDetail.css";
import "../components/Account/login.css";
import "../components/Account/register.css";
import "../components/Cart/Cart.css";

interface MyAppProps {
  Component: React.ComponentType<any>;
  pageProps: any;
}

function MyApp({ Component, pageProps }: MyAppProps): JSX.Element {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
