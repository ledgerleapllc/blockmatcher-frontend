import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { showAlert, removeActiveModal } from "../../../redux/actions";
import { FormInputComponent } from "../../../components";
import { addCommas } from "../../../utils/Constant";

const SaleStep = ({ completion, token }) => {

    const dispatch = useDispatch();
    const [price, setPrice] = useState('');
    const [notes, setNotes] = useState('');

    const formatPrice = (e) => {
        let value = e.target.value;

        if (value.startsWith("."))
            value = `0${value}`;
        if (!value.startsWith("0."))
            value = `0.${value}`;

        setPrice(value);
    }

    const next = (e) => {
        e.preventDefault();
        if (!price || price <= 0) {
            dispatch(showAlert("Please enter the price per token this batch!"));
            return;
        }

        if (!notes || !notes.trim().length) {
            dispatch(showAlert("Please enter notes!"));
            return;
        }

        completion({ price, notes });
    }

    const close = (e) => {
        if (e) e.preventDefault();
        dispatch(removeActiveModal());
    };


    return (
        <>
            <div className="c-form-row text-center">
                {`Total in batch: ${addCommas(token)}`}
            </div>
            <div className="c-form-row">
                <label className="mr-2 text-gray font-size-12">
                    Please enter the price per token this batch is being sold at:
                </label>

                <FormInputComponent
                    value={price}
                    required={true}
                    onChange={formatPrice}
                    type="number"
                />
            </div>
            <div className="c-form-row">
                <label className="mr-2 text-gray font-size-12">
                    Please enter any notes:
                </label>

                <textarea
                    className="custom-form-control"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                />
            </div>
            <div className="modal__buttons">
                <button
                    onClick={next}
                    className="btn btn-primary">
                    Next
                </button>
                <button
                    className="btn btn-light mt-2"
                    onClick={close}>
                    Cancel and Go back
                </button>
            </div>
        </>
    );
}

export default SaleStep;