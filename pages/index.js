/* eslint-disable react/no-unknown-property */
import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Head from "next/head";
import { GlobalLayout } from "../layouts";
import { Routes } from "../routes";

const mapStateToProps = () => {
  return {};
};

class App extends Component {
  render() {
    return (
      <div id="app">
        <Head>
          <title>BlockMatcher</title>
          <meta
            name="viewport"
            content="width=device-width, minimum-scale=1.0, maximum-scale = 1.0, user-scalable = no"
          />
          <link rel="icon" href="/favicon-32x32.png" sizes="32x32" />
          <link rel="icon" href="/favicon-118x118.png" sizes="96x96" />
          <link
            rel="preload"
            href="/fonts/poppins/poppins-bold-webfont.woff2"
            as="font"
            type="font/woff2"
            crossorigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/poppins/poppins-light-webfont.woff2"
            as="font"
            type="font/woff2"
            crossorigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/poppins/poppins-regular-webfont.woff2"
            as="font"
            type="font/woff2"
            crossorigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/poppins/poppins-medium-webfont.woff2"
            as="font"
            type="font/woff2"
            crossorigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/poppins/poppins-semibold-webfont.woff2"
            as="font"
            type="font/woff2"
            crossorigin="anonymous"
          />
        </Head>

        <Router>
          <GlobalLayout />

          <Switch>
            <Route path="/" component={Routes} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
