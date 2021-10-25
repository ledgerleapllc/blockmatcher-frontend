import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { removeActiveModal, showAlert } from "../../redux/actions";
import {
  addCommas,
  removeNonNumeric
} from "../../utils/Constant";
import { FormInputComponent } from "../../components";

const EditOffer = ({ completion, params }) => {

  const dispatch = useDispatch();
  const [amount, setAmount] = useState();
  const [price, setPrice] = useState();
  const [discount, setDiscount] = useState();

  const close = (e) => {
    if (e) e.preventDefault();
    dispatch(removeActiveModal());
  };

  useEffect(() => {
    if (params.amount)
      setAmount(addCommas(removeNonNumeric(params.amount)));
    if (params.price)
      setPrice(params.price);
    if (params.discount)
      setDiscount(params.discount);
  }, [params])

  const submit = (e) => {
    e.preventDefault();
    const value = {};

    if (params.amount) {
      const _amount = removeNonNumeric(amount);
      if (!_amount || _amount <= 0) {
        dispatch(showAlert("Please enter correct CSPR amount!"));
        return;
      }
      value.amount = _amount;
    }

    if (params.price) {
      if (!price || price <= 0) {
        dispatch(showAlert("Please enter correct desired price!"));
        return;
      }
      value.price = price;
    }

    if (params.discount) {
      if (!discount || discount <= 0) {
        dispatch(showAlert("Please enter discount!"));
        return;
      }
      value.discount = discount;
    }
    completion(value);
    dispatch(removeActiveModal());
  }

  const formatAmount = (e) => {
    const value = e.target.value;
    setAmount(addCommas(removeNonNumeric(value)));
  }

  const formatPrice = (e) => {
    let value = e.target.value;
    if (value.startsWith("."))
      value = `0${value}`;

    setPrice(value);
  }

  const formatDiscount = (e) => {
    let value = e.target.value;

    if (value.startsWith("."))
      value = `0${value}`;

    setDiscount(value);
  }

  // Render Content
  return (
    <div className="otc-modal">
      <h2 className="text-center mb-4">
        {
          params.discount && `What would you like to change the discount to?`
        }
        {
          params.price && `What would you like to change the price to?`
        }
        {
          params.amount && `What would you like to change the CSPR amount to?`
        }
      </h2>
      <form action="" method="POST" onSubmit={submit}>
        {
          params.amount &&
          <div className="c-form-row">
            <label className="mr-2 text-gray font-size-12">CSPR requested</label>
            <FormInputComponent
              value={amount}
              required={true}
              onChange={formatAmount}
              type="text"
            />
          </div>
        }
        {
          params.discount &&
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
          params.price &&
          <div className="c-form-row">
            <label className="mr-2 text-gray font-size-12">Price requested</label>
            <div className="d-flex align-items-center w-50">
              <FormInputComponent
                value={price}
                required={true}
                onChange={formatPrice}
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
            Submit
          </button>
          <button
            className="btn btn-light mt-2"
            onClick={close}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditOffer;
