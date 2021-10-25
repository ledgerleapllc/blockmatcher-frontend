import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import DataTable from "react-data-table-component";
import {
    setActiveModal,
    showCanvas,
    hideCanvas,
    setBuyOffersInfo,
    setBuyOffersRefresh
} from '../../../../../redux/actions';
import { buyOptions } from '../../../../../utils/Constant';
import {
    getBuyOffersList,
    removeBuyOffer,
    updateBuyOffer
} from '../../../../../utils/Thunk';
import { Tooltip } from '@material-ui/core';
import { addCommas } from '../../../../../utils/Constant';

const moment = require("moment");

const Offers = () => {

    const dispatch = useDispatch();
    const { buyOffersInfo, buyOffersRefresh } = useSelector(state => state.global);

    const columns = [
        {
            name: <label className="table-header">Req #</label>,
            width: '100px',
            center: true,
            selector: "id",
            cell: (row) => {
                return (
                    <label
                        className="font-size-12"
                    >
                        {`B${row.id}`}
                    </label>
                );
            },
            sortable: true,
            compact: true,
        },
        {
            name: <label className="table-header">Request Date</label>,
            selector: "created_at",
            cell: (row) => {
                return (
                    <Tooltip title={moment(row.created_at).format('MM-DD-YYYY hh:mm A')} placement="right">
                        <label className="font-size-12">
                            {moment(row.created_at).format('MM-DD-YYYY')}
                        </label>
                    </Tooltip>
                );
            },
            sortable: true,
            compact: true,
        },
        {
            name: <label className="table-header">Status</label>,
            selector: "is_batch",
            cell: (row) => {
                return (
                    <label className="font-size-12">
                        {row.is_batch ? 'Matched' : 'Active'}
                    </label>
                );
            },
            sortable: true,
            compact: true,
        },
        {
            name: <label className="table-header">CSPR Amount</label>,
            selector: "amount",
            cell: (row) => {
                return (
                    <div className="text-center">
                        <div className="font-size-12">
                            {addCommas(row.amount)}
                        </div>
                        <a
                            className="font-size-12"
                            onClick={() => { showOfferEditModal(row.id, { amount: row.amount }) }}>
                            edit
                        </a>
                    </div>
                );
            },
            sortable: true,
            compact: true,
        },
        {
            name: <label className="table-header">Offer Type</label>,
            selector: "type",
            cell: (row) => {
                return (
                    <label className="font-size-12">
                        {buyOptions[row.type]}
                    </label>
                );
            },
            sortable: true,
            compact: true,
        },
        {
            name: <label className="table-header">Discount</label>,
            selector: "discount",
            cell: (row) => {
                return (
                    row.discount &&
                    <div className="text-center">
                        <div className="font-size-12">
                            {row.discount} %
                        </div>
                        <a
                            className="font-size-12"
                            onClick={() => { showOfferEditModal(row.id, { discount: row.discount }) }}>
                            edit
                        </a>
                    </div>
                );
            },
            sortable: true,
            compact: true,
        },
        {
            name: <label className="table-header">Fixed Price</label>,
            selector: "desired_price",
            cell: (row) => {
                return (
                    row.desired_price &&
                    <div className="text-center">
                        <div className="font-size-12">
                            $ {row.desired_price}
                        </div>
                        <a
                            className="font-size-12"
                            onClick={() => { showOfferEditModal(row.id, { price: row.desired_price }) }}>
                            edit
                        </a>
                    </div>
                );
            },
            sortable: true,
            compact: true,
        },
        {
            name: <label className="table-header">Action</label>,
            selector: 'batch_id',
            width: '220px',
            cell: (row) => {
                return (
                    <>
                        {
                            row.is_batch ?
                                <label className="font-size-12">
                                    {row.batch_id}
                                </label> :
                                <button
                                    className="btn btn-small btn-primary font-size-12"
                                    onClick={() => showCancelOfferModal(row.id)}
                                >
                                    Cancel Buy Request
                                </button>
                        }

                    </>
                );
            },
            sortable: true,
            compact: true,
        },
    ];

    useEffect(() => {
        getBuyOffers();
    }, []);

    useEffect(() => {
        if (buyOffersRefresh)
            getBuyOffers();
    }, [buyOffersRefresh]);

    useEffect(() => {
        getBuyOffers();
    }, [
        buyOffersInfo.page_id,
        buyOffersInfo.sort_key,
        buyOffersInfo.sort_direction,
        buyOffersInfo.perPage
    ])

    const getBuyOffers = () => {
        const {
            page_id,
            loading,
            perPage,
            sort_key,
            sort_direction,
        } = buyOffersInfo;

        const params = {
            page_id,
            loading,
            perPage,
            sort_key,
            sort_direction,
        };

        dispatch(
            getBuyOffersList(
                params,
                () => {
                    dispatch(showCanvas());
                },
                (res) => {
                    dispatch(hideCanvas());
                    if (res && res.success) {
                        const offer_list = res.offer_list || [];
                        const total = res.total || 0;
                        const total_cspr = res.total_cspr || "";
                        const total_revenue = res.total_revenue || "";
                        dispatch(
                            setBuyOffersInfo({
                                ...buyOffersInfo,
                                offer_list,
                                total,
                                total_cspr,
                                total_revenue
                            })
                        );
                    }
                }
            )
        )
    }

    const handleSort = (column, direction) => {
        if (column)
            dispatch(
                setBuyOffersInfo({
                    ...buyOffersInfo,
                    page_id: 1,
                    sort_key: column.selector,
                    sort_direction: direction,
                })
            );
    };

    const handlePageChange = (page) => {
        dispatch(
            setBuyOffersInfo({
                ...buyOffersInfo,
                page_id: page
            })
        );
    };

    const handlePerRowsChange = (page) => {
        dispatch(
            setBuyOffersInfo({
                ...buyOffersInfo,
                perPage: page
            })
        );
    };

    const showOfferEditModal = (id, params) => {
        dispatch(
            setActiveModal(
                'edit-buy-offer',
                (res) => {
                    dispatch(
                        updateBuyOffer(
                            id,
                            res,
                            () => {
                                dispatch(showCanvas());
                            },
                            (res) => {
                                if (res.success) {
                                    dispatch(setBuyOffersRefresh(true));
                                    dispatch(setBuyOffersRefresh(false));
                                }
                            }
                        )
                    )
                },
                params
            )
        );
    }

    const showCancelOfferModal = (id) => {
        dispatch(
            setActiveModal(
                'cancel-buy-offer',
                () => {
                    dispatch(
                        removeBuyOffer(
                            id,
                            () => {
                                dispatch(showCanvas());
                            },
                            (res) => {
                                if (res.success) {
                                    dispatch(setBuyOffersRefresh(true));
                                    dispatch(setBuyOffersRefresh(false));
                                }
                            }

                        )
                    )

                },
            )
        );
    }

    return (
        <div className="mt-4">
            <div className="font-weight-bold">My Offers to Buy</div>
            <div className="table-wrapper mt-3">
                <DataTable
                    columns={columns}
                    data={buyOffersInfo.offer_list}
                    sortServer={true}
                    onSort={handleSort}
                    progressPending={buyOffersInfo.loading}
                    responsive
                    noHeader
                    striped={true}
                    persistTableHead
                    pagination={true}
                    paginationServer
                    onChangeRowsPerPage={handlePerRowsChange}
                    onChangePage={handlePageChange}
                    paginationTotalRows={buyOffersInfo.total}
                    paginationPerPage={buyOffersInfo.perPage}
                    paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
                />
            </div>
        </div>
    );
}

export default Offers;