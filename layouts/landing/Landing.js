import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch } from "react-router-dom";
import { LandingRoutes } from "../../routes";
import FooterLayout from "../footer/Footer";

const mapStateToProps = (state) => {
  return {
    activeModal: state.global.activeModal,
  };
};

class Landing extends Component {
  render() {
    const { auth, activeModal } = this.props;

    let className = activeModal
      ? "outer-page-wrap no-overflow"
      : "outer-page-wrap";

    return (
      <div className={className}>
        <section>
          <Switch>
            <LandingRoutes auth={auth} />
          </Switch>
        </section>

        <FooterLayout />
      </div>
    );
  }
}

export default connect(mapStateToProps)(Landing);
