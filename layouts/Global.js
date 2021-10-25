/* eslint-disable no-unreachable */
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { GlobalCanvasComponent, PopupAlertComponent } from "../components";
import {
  SellOfferModal,
  BuyOfferModal,
  EditBuyOfferModal,
  CreateBatchModal,
  UndoBatchModal,
  CancelSellOfferModal,
  CancelBuyOfferModal
} from "../modals";
import { hideAlert } from "../redux/actions";

const mapStateToProps = (state) => {
  return {
    showAlert: state.global.showAlert,
    showAlertMessage: state.global.showAlertMessage,
    showAlertType: state.global.showAlertType,
    showCanvas: state.global.showCanvas,
    authUser: state.global.authUser,
    activeModal: state.global.activeModal,
    completion: state.global.completion,
    modalParams: state.global.modalParams
  };
};

class Global extends Component {
  hideAlert = () => {
    this.props.dispatch(hideAlert());
  };

  renderModal(modal, completion, params) {
    if (modal == "sell-offer") return <SellOfferModal completion={completion} />;
    else if (modal == "cancel-sell-offer") return <CancelSellOfferModal completion={completion} />;

    else if (modal == "buy-offer") return <BuyOfferModal completion={completion} />;
    else if (modal == "edit-buy-offer") return <EditBuyOfferModal completion={completion} params={params} />;
    else if (modal == "cancel-buy-offer") return <CancelBuyOfferModal completion={completion} />;

    else if (modal == "create-batch") return <CreateBatchModal completion={completion} params={params} />;
    else if (modal == "undo-batch") return <UndoBatchModal completion={completion} />;


    return null;
  }

  render() {
    const {
      showCanvas,
      showAlert,
      showAlertMessage,
      showAlertType,
      activeModal,
      completion,
      modalParams
    } = this.props;

    return (
      <Fragment>
        {showCanvas ? <GlobalCanvasComponent /> : null}

        {activeModal ? (
          <div className="custom-modals">{this.renderModal(activeModal, completion, modalParams)}</div>
        ) : null}

        <PopupAlertComponent
          onClose={this.hideAlert}
          shown={showAlert}
          message={showAlertMessage}
          type={showAlertType}
        />
      </Fragment>
    );
  }
}

export default connect(mapStateToProps)(Global);
