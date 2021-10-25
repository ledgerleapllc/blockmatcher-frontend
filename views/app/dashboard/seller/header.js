import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Icon from "react-feather";
import {
    setActiveModal,
    showCanvas,
    hideCanvas,
    setOffersRefresh
} from '../../../../redux/actions';
import { createOffer } from '../../../../utils/Thunk';

const Header = () => {
    const dispatch = useDispatch();
    const { authUser } = useSelector(state => state.global);
    if (!authUser || !authUser.id) return null;

    const showSellOfferModal = () => {
        dispatch(
            setActiveModal(
                'sell-offer',
                (batch) => {
                    console.log('batch', batch);
                    dispatch(
                        createOffer(
                            batch,
                            () => {
                                dispatch(showCanvas());
                            },
                            (res) => {
                                dispatch(hideCanvas());
                                if (res.success) {
                                    dispatch(setOffersRefresh(true));
                                    dispatch(setOffersRefresh(false));
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
                        Register CSPR Batch for Sale
                    </label>
                </button>
            </div>
        </div>
    );
}

export default Header;