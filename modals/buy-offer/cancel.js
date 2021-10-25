import React from "react";
import { useDispatch } from "react-redux";
import { removeActiveModal } from "../../redux/actions";


const CancelOffer = ({ completion }) => {

  const dispatch = useDispatch();
  // Cancel Bulk Invite
  const undo = (e) => {
    e.preventDefault();
    completion();
    dispatch(removeActiveModal());
  };

  // Close
  const close = (e) => {
    if (e) e.preventDefault();
    dispatch(removeActiveModal());
  };

  // Render Content
  return (
    <div className="otc-modal">
      <h2 className="text-center">
        Cancel Buy Offering
      </h2>
      <div className="p-4 font-size-14 text-gray text-center font-weight-400">
        Are you sure you want to cancel this offer?
      </div>
      <div className="modal__buttons">
        <button
          className="btn btn-primary"
          onClick={undo}>
          Yes, cancel offer
        </button>
        <button
          className="btn btn-light mt-2"
          onClick={close}>
          Cancel and Go back
        </button>
      </div>
    </div>
  );
}

export default CancelOffer;
