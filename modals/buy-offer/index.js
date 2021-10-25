import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeActiveModal, showAlert } from "../../redux/actions";
import {
  addCommas,
  removeNonNumeric,
  buyOptions
} from "../../utils/Constant";
import {
  FormInputComponent,
  FormSelectComponent
} from "../../components";

const BuyOffer = ({ completion }) => {

  const dispatch = useDispatch();
  const [amount, setAmount] = useState();
  const [desired_price, setDesiredPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [buy_option, setBuyOption] = useState();

  const close = (e) => {
    if (e) e.preventDefault();
    dispatch(removeActiveModal());
  };

  const submit = (e) => {
    e.preventDefault();
    const _amount = removeNonNumeric(amount);
    if (!_amount || _amount <= 0) {
      dispatch(showAlert("Please enter correct CSPR amount!"));
      return;
    }

    if (buy_option === undefined || buy_option === null) {
      dispatch(showAlert("Please select Buy options"));
      return;
    }

    if (buy_option == 0 && (!desired_price || desired_price <= 0)) {
      dispatch(showAlert("Please enter correct desired price!"));
      return;
    }

    if (buy_option == 1 && (!discount || discount <= 0)) {
      dispatch(showAlert("Please enter discount!"));
      return;
    }

    console.log({ amount: _amount, desired_price, buy_option });
    completion({ amount: _amount, desired_price, discount, type: buy_option });
    dispatch(removeActiveModal());
  }


  const formatAmount = (e) => {
    const value = e.target.value;
    setAmount(addCommas(removeNonNumeric(value)));
  }

  const formatDesiredPrice = (e) => {
    let value = e.target.value;

    if (value.startsWith("."))
      value = `0${value}`;

    setDesiredPrice(value);
  }

  const formatDiscount = (e) => {
    let value = e.target.value;

    if (value.startsWith("."))
      value = `0${value}`;

    setDiscount(value);
  }

  const setOption = (e) => {
    console.log(e.target.value);
    setBuyOption(e.target.value);
  }

  // Render Content
  return (
    <div className="otc-modal">
      <h2 className="text-center mb-4">
        Create offer to Buy
      </h2>
      <form action="" method="POST" onSubmit={submit}>
        <div className="c-form-row">
          <label className="mr-2 text-gray font-size-12">How many CSPR would you like to buy?</label>
          <FormInputComponent
            value={amount}
            required={true}
            onChange={formatAmount}
            type="text"
          />
        </div>
        <div className="c-form-row">
          <label className="text-gray font-size-12">
            Fixed price or discount?
          </label>
          <label className="ml-2 text-gray font-size-12">
            Fixed price means you know the price per token your will pay.
            Discount means you want a certain percentage under market price
          </label>
          <FormSelectComponent
            placeholder="Select..."
            options={buyOptions}
            value={buy_option}
            onChange={setOption}
            required={true}
            height="40px"
          />
        </div>
        {
          Number(buy_option) === 1 &&
          <div className="c-form-row">
            <label className="mr-2 text-gray font-size-12">Discount requested</label>
            <div className="d-flex align-items-center w-50">
              <FormInputComponent
                value={discount}
                required={true}
                onChange={formatDiscount}
                type="number"
                className="w-50"
              />
              <label className="ml-2">%</label>
            </div>
          </div>
        }
        {
          Number(buy_option) === 0 &&
          <div className="c-form-row">
            <label className="mr-2 text-gray font-size-12">Price requested</label>
            <div className="d-flex align-items-center w-50">
              <FormInputComponent
                value={desired_price}
                required={true}
                onChange={formatDesiredPrice}
                type="number"
                className="ml-2"
              />
              <label className="ml-2">$</label>
            </div>
          </div>
        }
        <div className="modal__buttons">
          <button
            type="submit"
            className="btn btn-primary">
            Post offer to Buy
          </button>
          <button
            className="btn btn-light mt-2"
            onClick={close}>
            Cancel and Go back
          </button>
        </div>
      </form>
    </div>
  );
}

export default BuyOffer;
