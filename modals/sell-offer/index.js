import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeActiveModal, showAlert } from "../../redux/actions";
import {
    lockedOptions,
    heldOptions,
    addCommas,
    removeNonNumeric
} from "../../utils/Constant";
import {
    FormInputComponent,
    FormSelectComponent
} from "../../components";

const SellOffer = ({ completion }) => {

    const dispatch = useDispatch();
    const [amount, setAmount] = useState();
    const [desired_price, setDesiredPrice] = useState('');
    const [unlocked, setUnlocked] = useState();
    const [where_held, setWhereHeld] = useState();

    const close = (e) => {
        if (e) e.preventDefault();
        dispatch(removeActiveModal());
    };

    const submit = (e) => {
        e.preventDefault();
        const _amount = removeNonNumeric(amount);
        if (!_amount || _amount <= 0) {
            dispatch(showAlert("Please input correct CSPR amount!"));
            return;
        }

        if (!desired_price || desired_price <= 0) {
            dispatch(showAlert("Please input correct desired price!"));
            return;
        }

        if (unlocked === undefined) {
            dispatch(showAlert("Please select Unlocked options"));
            return;
        }

        if (where_held === undefined) {
            dispatch(showAlert("Please select Where is it held!"));
            return;
        }
        completion({ amount: _amount, desired_price, unlocked, where_held });
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
        if (!value.startsWith("0."))
            value = `0.${value}`;

        setDesiredPrice(value);
    }

    // Render Content
    return (
        <div className="otc-modal">
            <h2 className="text-center mb-4">
                Register a batch of CSPR to sell
            </h2>
            <form action="" method="POST" onSubmit={submit}>
                <div className="c-form-row">
                    <label className="mr-2 text-gray font-size-12">
                        How many CSPR would you like to sell?
                    </label>
                    <FormInputComponent
                        value={amount}
                        required={true}
                        onChange={formatAmount}
                        type="text"
                    />
                </div>
                <div className="c-form-row">
                    <label className="mr-2 text-gray font-size-12">
                        Locked or Unlocked?
                    </label>
                    <FormSelectComponent
                        placeholder="Select..."
                        options={lockedOptions}
                        value={unlocked}
                        onChange={(e) => setUnlocked(e.target.value)}
                        required={true}
                        height="40px"
                    />
                </div>
                <div className="c-form-row">
                    <label className="mr-2 text-gray font-size-12">
                        Desired sale price per token (in USD cents)?
                    </label>
                    <div className="d-flex align-items-center">
                        <FormInputComponent
                            value={desired_price}
                            required={true}
                            onChange={formatDesiredPrice}
                            type="number"
                        />
                        <i className="w-100 ml-2 text-gray font-size-12 font-size-12">
                            *Price not guaranteed
                        </i>
                    </div>
                </div>
                <div className="c-form-row">
                    <label className="mr-2 text-gray font-size-12">
                        Where is it held?
                    </label>
                    <FormSelectComponent
                        placeholder="Select..."
                        options={heldOptions}
                        value={where_held}
                        onChange={(e) => setWhereHeld(e.target.value)}
                        required={true}
                        height="40px"
                    />
                </div>
                <div className="modal__buttons">
                    <button
                        type="submit"
                        className="btn btn-primary">
                        List for sale
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

export default SellOffer;