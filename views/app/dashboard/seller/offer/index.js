import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DataTable from "react-data-table-component";
import {
    setActiveModal,
    showCanvas,
    hideCanvas,
    setOffersInfo,
    setOffersRefresh
} from '../../../../../redux/actions';
import { heldOptions } from '../../../../../utils/Constant';
import { getOffersList, removeOffer } from '../../../../../utils/Thunk';
import { addCommas } from '../../../../../utils/Constant';
import { Tooltip } from '@material-ui/core';

const moment = require("moment");

const Offers = () => {

    const dispatch = useDispatch();
    const { offersInfo, offersRefresh } = useSelector(state => state.global);

    const columns = [
        {
            name: <label className="table-header">Req #</label>,
            width: '100px',
            center: true,
            selector: "id",
            cell: (row) => {
                return (
                    <label className="font-size-12">
                        {row.id}
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
            name: <label className="table-header">CSPR Amount</label>,
            selector: "amount",
            cell: (row) => {
                return (
                    <label className="font-size-12">
                        {addCommas(row.amount)}
                    </label>
                );
            },
            sortable: true,
            compact: true,
        },
        {
            name: <label className="table-header">Unlocked</label>,
            selector: "unlocked",
            cell: (row) => {
                return (
                    <label className="font-size-12">
                        {row.unlocked ? 'Yes' : 'No'}
                    </label>
                );
            },
            sortable: true,
            compact: true,
        },
        {
            name: <label className="table-header">Held Where?</label>,
            selector: "where_held",
            cell: (row) => {
                return (
                    <label className="font-size-12">
                        {heldOptions[row.where_held]}
                    </label>
                );
            },
            sortable: true,
            compact: true,
        },
        {
            name: <label className="table-header">
                Desired<br />
                Price
            </label>,
            selector: "desired_price",
            cell: (row) => {
                return (
                    <label className="font-size-12">
                        {row.desired_price}
                    </label>
                );
            },
            sortable: true,
            compact: true,
        },
        {
            name: <label className="table-header">
                Status
            </label>,
            selector: "is_batch",
            cell: (row) => {
                return (
                    <label className="font-size-12">
                        {row.is_batch ? 'Matched' : 'Available'}
                    </label>
                );
            },
            sortable: true,
            compact: true,
        },
        {
            name: <label className="table-header">Action</label>,
            width: '220px',
            cell: (row) => {
                return (
                    <>
                        {row.is_batch ?
                            <label className="font-size-12">
                                {row.batch_id}
                            </label> :
                            <button
                                className="btn btn-small btn-primary font-size-12"
                                onClick={() => showCancelOfferModal(row.id)}
                            >
                                Cancel Sell Request
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
        getOffers();
    }, []);

    useEffect(() => {
        if (offersRefresh)
            getOffers();
    }, [offersRefresh]);

    useEffect(() => {
        getOffers();
    }, [offersInfo.page_id, offersInfo.sort_key, offersInfo.sort_direction, offersInfo.perPage])

    const getOffers = () => {
        const {
            page_id,
            loading,
            perPage,
            sort_key,
            sort_direction,
        } = offersInfo;

        const params = {
            page_id,
            loading,
            perPage,
            sort_key,
            sort_direction,
        };
        console.log(perPage);

        dispatch(
            getOffersList(
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
                            setOffersInfo({
                                ...offersInfo,
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
                setOffersInfo({
                    ...offersInfo,
                    page_id: 1,
                    sort_key: column.selector,
                    sort_direction: direction,
                })
            );
    };

    const handlePageChange = (page) => {
        dispatch(setOffersInfo({ ...offersInfo, page_id: page }));
    };

    const handlePerRowsChange = (page) => {
        dispatch(setOffersInfo({ ...offersInfo, perPage: page }));
    };

    const showCancelOfferModal = (id) => {
        dispatch(
            setActiveModal(
                'cancel-sell-offer',
                () => {
                    dispatch(
                        removeOffer(
                            id,
                            () => {
                                dispatch(showCanvas());
                            },
                            (res) => {
                                if (res.success) {
                                    dispatch(setOffersRefresh(true));
                                    dispatch(setOffersRefresh(false));
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
            <div className="font-weight-bold">My Offers</div>
            <div className="table-wrapper mt-3">
                <DataTable
                    columns={columns}
                    data={offersInfo.offer_list}
                    sortServer={true}
                    onSort={handleSort}
                    progressPending={offersInfo.loading}
                    responsive
                    noHeader
                    striped={true}
                    persistTableHead
                    pagination={true}
                    paginationServer
                    onChangeRowsPerPage={handlePerRowsChange}
                    onChangePage={handlePageChange}
                    paginationTotalRows={offersInfo.total}
                    paginationPerPage={offersInfo.perPage}
                    paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
                />
            </div>
            <div className="mt-2">
                <div className="tbl-footer-summary">
                    <div className="tbl-footer-label">Total CSPR for Sale: </div>
                    {
                        offersInfo.total_cspr &&
                        <div>{offersInfo.total_cspr}</div>
                    }
                </div>
                <div className="tbl-footer-summary">
                    <div className="tbl-footer-label">Possible Revenue:</div>
                    {
                        offersInfo.total_revenue &&
                        <div>
                            {offersInfo.total_revenue}
                            <sup> *Minus fees</sup>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Offers;