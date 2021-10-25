import React, { Component } from "react";
import { connect } from "react-redux";
import * as Icon from "react-feather";
import { setBlockAlertData } from "../../redux/actions";

import "./block-alert.scss";

const mapStateToProps = () => {
  return {};
};

class BlockAlert extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.close();
    }, 3000);
  }

  close() {
    this.props.dispatch(setBlockAlertData({}));
  }

  renderIcon() {
    const { data } = this.props;
    const { color } = data;

    if (color == "success")
      return (
        <div id="c-block-alert__icon">
          <Icon.Check />
        </div>
      );
    return null;
  }
  render() {
    const { data } = this.props;
    if (!data || !data.color || !data.message) return null;

    return (
      <div className={"c-block-alert " + data.color}>
        {this.renderIcon()}
        <p>{data.message}</p>
        <div id="c-block-alert__closeIcon" onClick={() => this.close()}>
          <Icon.X />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(BlockAlert);
