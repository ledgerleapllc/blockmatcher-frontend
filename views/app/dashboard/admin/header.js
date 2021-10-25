import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as Icon from "react-feather";
import {
    showCanvas,
    hideCanvas,
    setSaleOffersRefresh,
    setAdminBuyOffersRefresh,
    setBatchesRefresh,
    setActiveModal,
    showAlert,
    removeActiveModal,
    setCheckedOffers,
    setBuyCheckedOffers
} from '../../../../redux/actions';
import { createBatch, exportCSV } from "../../../../utils/Thunk";
const moment = require("moment");

const Header = () => {
    const dispatch = useDispatch();
    const { authUser, checkedOffers } = useSelector(state => state.global);
    if (!authUser || !authUser.id) return null;

    const downloadCSV = () => {
        dispatch(
            exportCSV(
                () => {
                    dispatch(showCanvas());
                },
                (res) => {
                    dispatch(hideCanvas());
                    if (res && res.success) {
                        const filename = `otc-${moment().format("MM-DD-YYYY")}.csv`;
                        const url = window.URL.createObjectURL(new Blob([res.csv]));
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', filename);
                        document.body.appendChild(link);
                        link.click();
                    }
                }
            )
        )
    }

    const createAdminBatch = () => {
        const totalToken = checkedOffers.reduce((sum, item) => sum + item.amount, 0);
        if (!checkedOffers || !checkedOffers.length || !totalToken) {
            dispatch(showAlert("Please select sale offers to create batch"));
            return;
        }


        dispatch(
            setActiveModal(
                'create-batch',
                ({ price, notes, checks, buyChecks }) => {
                    console.log('2', checks, buyChecks);
                    dispatch(
                        createBatch(
                            { checks, buyChecks, price, notes },
                            () => {
                                dispatch(showCanvas());
                            },
                            (res) => {
                                dispatch(hideCanvas());
                                if (res.success) {
                                    dispatch(setSaleOffersRefresh(true));
                                    dispatch(setSaleOffersRefresh(false));
                                    dispatch(setAdminBuyOffersRefresh(true));
                                    dispatch(setAdminBuyOffersRefresh(false));
                                    dispatch(setBatchesRefresh(true));
                                    dispatch(setBatchesRefresh(false));
                                    dispatch(removeActiveModal());
                                    dispatch(setCheckedOffers([]));
                                    dispatch(setBuyCheckedOffers([]));
                                }
                            }

                        )
                    )
                },
                { totalToken }
            )
        );
    }

    return (
        <div id="app-dashboard-pageHeader">
            <h2>
                Hi, {authUser.name}
            </h2>
            <div>
                <button
                    className="btn btn-outlined btn-icon px-4"
                    onClick={downloadCSV}
                >
                    <Icon.Download size={18} />
                    <label className="font-size-12">Export CSV</label>
                </button>
                <button
                    className="btn btn-primary btn-icon px-4"
                    onClick={createAdminBatch}
                >
                    <Icon.Plus size={18} />
                    <label className="font-size-12">Create Batch</label>
                </button>
            </div>
        </div>
    );
}

export default Header;