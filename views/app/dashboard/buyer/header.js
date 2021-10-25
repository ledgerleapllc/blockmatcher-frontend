import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Icon from "react-feather";
import {
    setActiveModal,
    showCanvas,
    hideCanvas,
    setBuyOffersRefresh
} from '../../../../redux/actions';
import { createBuyOffer } from '../../../../utils/Thunk';

const Header = () => {
    const dispatch = useDispatch();
    const { authUser } = useSelector(state => state.global);
    if (!authUser || !authUser.id) return null;

    const showSellOfferModal = () => {
        dispatch(
            setActiveModal(
                'buy-offer',
                (batch) => {
                    console.log('batch', batch);
                    dispatch(
                        createBuyOffer(
                            batch,
                            () => {
                                dispatch(showCanvas());
                            },
                            (res) => {
                                dispatch(hideCanvas());
                                if (res.success) {
                                    dispatch(setBuyOffersRefresh(true));
                                    dispatch(setBuyOffersRefresh(false));
                                }
                            }
                        )
                    );
                },
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
                    className="btn btn-primary btn-icon"
                    onClick={() => showSellOfferModal()}
                >
                    <Icon.Plus size={18} />
                    <label className="font-size-12">
                        Create Offer to Buy CSPR
                    </label>
                </button>
            </div>
        </div>
    );
}

export default Header;