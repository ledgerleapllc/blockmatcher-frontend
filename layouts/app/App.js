import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch } from "react-router-dom";
import { AppRoutes } from "../../routes";
import AppHeaderLayout from "../app-header/AppHeader";
import AppFooterLayout from "../app-footer/AppFooter";

const mapStateToProps = (state) => {
  return {
    activeModal: state.global.activeModal,
  };
};

class App extends Component {
  render() {
    const { auth, activeModal } = this.props;

    const className = activeModal
      ? "app-page-wrap no-overflow"
      : "app-page-wrap";

    return (
      <div className={className}>
        <AppHeaderLayout />
        <section>
          <Switch>
            <AppRoutes auth={auth} />
          </Switch>
        </section>
        <AppFooterLayout />
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
