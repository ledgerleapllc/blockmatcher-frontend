import React, { Component } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import { BRAND } from "../../utils/Constant";

import "./welcome.scss";

class Welcome extends Component {
  render() {
    const { auth: authUser } = this.props;
    if (authUser && authUser.id) return <Redirect to="/app" />;

    return (
      <div id="welcome-page">
        <div className="white-box">
          <p className="mt-4 mb-4 text-center">Welcome to the {BRAND} Portal</p>
          <div id="welcome-page_buttons">
            <Link className="btn btn-primary" to="/login">
              Login
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Welcome);
