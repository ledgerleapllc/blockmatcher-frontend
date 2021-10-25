import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SellStep from "./steps/sell";
import BuyStep from "./steps/buy";

const CreateBatch = ({ completion, params }) => {

  const { checkedOffers, buyCheckedOffers } = useSelector((state) => state.global);
  const [finalStep, setFinalStep] = useState(false);
  const [price, setPrice] = useState('');
  const [notes, setNotes] = useState('');

  const moveBuyStep = ({ price, notes }) => {
    setPrice(price);
    setNotes(notes);
    setFinalStep(true);
  }

  const submit = (e) => {
    e.preventDefault();

    console.log({ price, notes, checks: checkedOffers, buyChecks: buyCheckedOffers });
    completion({ price, notes, checks: checkedOffers, buyChecks: buyCheckedOffers });
  }

  const back = (e) => {
    setFinalStep(false);
  }

  console.log(params);
  // Render Content
  return (
    <div className="otc-modal large">
      <h2 className="text-center mb-4">
        Create a batch
      </h2>
      <form action="" method="POST" onSubmit={submit}>
        {
          !finalStep ?
            <SellStep
              token={params.totalToken}
              completion={moveBuyStep} /> :
            <BuyStep />
        }
        {
          finalStep &&
          <div className="modal__buttons">

            <button
              type="submit"
              className="btn btn-primary">
              Create Batch
            </button>

            <a
              className="btn btn-light mt-2"
              onClick={back}>
              Cancel and Go back
            </a>

          </div>
        }
      </form>
    </div>
  );
}

export default CreateBatch;
