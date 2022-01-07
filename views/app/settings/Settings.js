import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { BlockAlertComponent } from "../../../components";

const mapStateToProps = (state) => {
  return {
    blockAlertData: state.global.blockAlertData,
    authUser: state.global.authUser,
  };
};

class Settings extends Component {
  renderAlert() {
    const { blockAlertData } = this.props;
    if (blockAlertData && blockAlertData.type == "setting")
      return <BlockAlertComponent data={blockAlertData} />;

    return null;
  }

  render() {
    return (
      <div id="app-settings-page">
        <div className="c-container small">
          {this.renderAlert()}
          <h2 className="mb-4">Settings</h2>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(withRouter(Settings));
