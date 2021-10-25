import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import * as Icon from "react-feather";
import Helper from "../../utils/Helper";
import { saveUser, showMenu, hideMenu } from "../../redux/actions";

import "./app-header.scss";

const mapStateToProps = (state) => {
  return {
    authUser: state.global.authUser,
    menuShown: state.global.menuShown,
  };
};

class AppHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userClicked: false,
    };

    this.tabs = [
      {
        link: "/app",
        label: "Dashboard",
      },
    ];
  }

  componentDidMount() {
    document.body.addEventListener("click", (e) => {
      const { userClicked } = this.state;
      if (!userClicked) return;

      if (
        e.target &&
        e.target.classList &&
        e.target.classList.contains("clickMe")
      ) {
        // Do Nothing
      } else {
        this.setState({ userClicked: false });
      }
    });
  }

  clickMyProfile = (e) => {
    e.preventDefault();
    const { history } = this.props;
    this.setState({ userClicked: false });
    history.push("/app/profile");
  };

  clickBulkInvites = (e) => {
    e.preventDefault();
    const { history } = this.props;
    this.setState({ userClicked: false });
    history.push("/app/bulk-invites");
  };

  clickTab = (e, tab) => {
    e.preventDefault();
    this.hideMenu();
    const { history } = this.props;
    history.push(tab.link);
  };

  showMenu = () => {
    this.props.dispatch(showMenu());
  };

  hideMenu = () => {
    this.props.dispatch(hideMenu());
  };

  logout = (e) => {
    e.preventDefault();
    this.setState({ userClicked: false });
    Helper.storeUser({});
    this.props.dispatch(saveUser({}));
  };

  checkClass(tab, path) {
    if (tab.link == path) return "active";
    if (tab.pattern && path.includes(tab.pattern)) return "active";
    return "";
  }

  toggleUserIcon = (e) => {
    e.preventDefault();
    const { userClicked } = this.state;
    this.setState({ userClicked: !userClicked });
  };

  renderTabs() {
    const items = [];
    const { history } = this.props;

    let path = "/app";
    if (history && history.location && history.location.pathname)
      path = history.location.pathname;

    this.tabs.forEach((tab, index) => {
      items.push(
        <li key={`tab_${index}`}>
          <a
            onClick={(e) => this.clickTab(e, tab)}
            className={this.checkClass(tab, path)}
          >
            {tab.label}
          </a>
        </li>
      );
    });
    return items;
  }

  render() {
    const { userClicked } = this.state;
    const { authUser, history, menuShown } = this.props;
    if (!authUser || !authUser.id) return null;

    let path = "/app";
    if (history && history.location && history.location.pathname)
      path = history.location.pathname;

    return (
      <div id="app-header">
        <div id="app-headerInner">
          <Link to="/" id="top-logo">
            <img src="/logo.png" className="logo" />
          </Link>
          <div id="header-menu" className={menuShown ? "active" : ""}>
            <div id="header-menu-close" onClick={this.hideMenu}>
              <Icon.X />
            </div>
            <ul>{this.renderTabs()}</ul>
          </div>

          <div id="header-icons">
            <ul>
              <li className={userClicked ? "active clickMe" : "clickMe"}>
                <a onClick={this.toggleUserIcon} className="clickMe">
                  <Icon.Settings color="#ffffff" className="clickMe" />
                </a>
                <ul className="clickMe">
                  <li>
                    <div id="app-profile-tabItem">
                      <b>
                        {authUser.name}
                      </b>
                    </div>
                  </li>
                  <li>
                    <a className="clickMe" onClick={this.logout}>
                      Log Out
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          <div id="mobile-burger" onClick={this.showMenu}>
            <Icon.Menu color="#ffffff" />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(withRouter(AppHeader));
