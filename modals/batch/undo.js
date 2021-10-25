import React from "react";
import * as Icon from "react-feather";
import { useDispatch } from "react-redux";
import { removeActiveModal } from "../../redux/actions";


const UndoBatch = ({ completion }) => {

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
        Are you sure you want to <br />
        undo this batch?
      </h2>
      <div className="modal__buttons">
        <button
          className="btn btn-primary"
          onClick={undo}>
          Undo
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

export default UndoBatch;
