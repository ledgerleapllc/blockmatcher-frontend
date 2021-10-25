import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import DataTable from "react-data-table-component";
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import {
    showCanvas,
    hideCanvas,
    setActiveModal,
    setAdminBuyOffersInfo,
    setAdminBuyOffersRefresh,
} from '../../../../../redux/actions';
import {
    getAdminBuyOffersList,
    removeBuyOffer
} from '../../../../../utils/Thunk';
import { stripedStyle } from '../../../../../utils/Constant';
import { addCommas } from '../../../../../utils/Constant';
import Helper from '../../../../../utils/Helper';
import { Tooltip } from '@material-ui/core';
const moment = require("moment");

const BuyOffers = () => {

    const dispatch = useDispatch();
    const { adminBuyOffersInfo, adminBuyOffersRefresh } = useSelector(state => state.global);
    const filterOptions = [
        "Show All",
        "Show Batched",
        "Show Available"
    ];

    const columns = [
        {
            name: <label className="table-header">Req #</label>,
            width: 'auto',
            center: true,
            selector: "buy_offers.id",
            cell: (row) => {
                return (
                    <label className="font-size-12">
                        {`B${row.id}`}
                    </label>
                );
            },
            sortable: true,
            compact: true,
        },
        {
            name: <label className="table-header">Request Date</label>,
            width: 'auto',
            selector: "created_at",
            cell: (row) => {
                return (
                    <Tooltip title={moment(row.created_at).format('MM-DD-YYYY h:mm a')} placement="right">
                        <label className="font-size-12">
                            {moment(row.created_at).format('MM-DD-YYYY') + '...'}<br />
                        </label>
                    </Tooltip>
                );
            },
            sortable: true,
            compact: true,
        },
        {
            name: <label className="table-header">Name</label>,
            width: 'auto',
            selector: "users.name",
            cell: (row) => {
                return (
                    <Tooltip title={row.user.name} placement="right">
                        <label className="font-size-12">
                            {row.user.name}
                        </label>
                    </Tooltip>
                );
            },
            sortable: true,
            compact: true,
        },
        {
            name: <label className="table-header">Email</label>,
            width: 'auto',
            selector: "users.email",
            cell: (row) => {
                return (
                    <Tooltip title={row.user.email || ''} placement="right">
                        <label className="font-size-12">
                            {row.user.email}
                        </label>
                    </Tooltip>
                );
            },
            sortable: true,
            compact: true,
        },
        {
            name: <label className="table-header">Telegram</label>,
            width: 'auto',
            selector: "users.telegram",
            cell: (row) => {
                return (
                    <Tooltip title={row.user.telegram || ''} placement="right">
                        <label className="font-size-12">
                            {Helper.subString(row.user.telegram, 10)}
                        </label>
                    </Tooltip>
                );
            },
            sortable: true,
            compact: true,
        },
        {
            name: <label className="table-header">Status</label>,
            width: 'auto',
            minWidth: '40px',
            selector: "is_batch",
            cell: (row) => {
                return (
                    <label className="font-size-12">
                        {row.is_batch ? 'Batched' : 'Available'}
                    </label>
                );
            },
            sortable: true,
            compact: true,
        },
        {
            name: <label className="table-header">CSPR</label>,
            width: 'auto',
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
            name: <label className="table-header">Offer Type</label>,
            width: 'auto',
            selector: "type",
            cell: (row) => {
                return (
                    <label className="font-size-12">
                        {row.type ? 'Fixed Price' : 'Discount'}
                    </label>
                );
            },
            sortable: true,
            compact: true,
        },
        {
            name: <label className="table-header">Discount</label>,
            width: 'auto',
            selector: "discount",
            cell: (row) => {
                return (
                    <label className="font-size-12">
                        {row.discount && `${row.discount}%`}
                    </label>
                );
            },
            sortable: true,
            compact: true,
        },
        {
            name: <label className="table-header">Fixed Price</label>,
            width: 'auto',
            selector: "desired_price",
            cell: (row) => {
                return (
                    <label className="font-size-12">
                        {row.desired_price && `$${row.desired_price}`}
                    </label>
                );
            },
            sortable: true,
            compact: true,
        },
        {
            name: <label className="table-header">Action</label>,
            width: 'auto',
            cell: (row) => {
                return (
                    row.is_batch && row.batch_id ?
                        <label className="font-size-12">
                            Batch {row.batch_id}
                        </label>
                        :
                        <button
                            className="btn btn-small btn-primary"
                            onClick={() => showDeleteBuyOfferModal(row.id)}
                        >
                            Delete
                        </button>
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
        if (adminBuyOffersRefresh) {
            getOffers();
        }
    }, [adminBuyOffersRefresh]);

    useEffect(() => {
        getOffers();
    }, [
        adminBuyOffersInfo.page_id,
        adminBuyOffersInfo.sort_key,
        adminBuyOffersInfo.sort_direction,
        adminBuyOffersInfo.perPage,
        adminBuyOffersInfo.filter
    ])

    const getOffers = () => {
        const {
            page_id,
            loading,
            filter,
            perPage,
            sort_key,
            sort_direction,
        } = adminBuyOffersInfo;

        const params = {
            page_id,
            loading,
            filter,
            perPage,
            sort_key,
            sort_direction,
        };

        dispatch(
            getAdminBuyOffersList(
                params,
                () => {
                    dispatch(showCanvas());
                },
                (res) => {
                    dispatch(hideCanvas());
                    if (res && res.success) {
                        const offer_list = res.offer_list || [];
                        const total = res.total || 0;
                        dispatch(
                            setAdminBuyOffersInfo({
                                ...adminBuyOffersInfo,
                                offer_list,
                                total
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
                setAdminBuyOffersInfo({
                    ...adminBuyOffersInfo,
                    page_id: 1,
                    sort_key: column.selector,
                    sort_direction: direction,
                })
            );
    };

    const handlePageChange = (page) => {
        dispatch(
            setAdminBuyOffersInfo({
                ...adminBuyOffersInfo,
                page_id: page
            })
        );
    };

    const handlePerRowsChange = (page) => {
        dispatch(
            setAdminBuyOffersInfo({
                ...adminBuyOffersInfo,
                perPage: page
            })
        );
    };

    const setFilterOption = (e) => {
        dispatch(
            setAdminBuyOffersInfo(
                {
                    ...adminBuyOffersInfo,
                    filter: e.target.value
                }
            )
        );
    }

    const showDeleteBuyOfferModal = (id) => {

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
                                    dispatch(setAdminBuyOffersRefresh(true));
                                    dispatch(setAdminBuyOffersRefresh(false));
                                }
                            }

                        )
                    )

                }
            )
        )


    }

    return (
        <div className="mt-4">
            <div className="d-flex align-items-center justify-content-between">
                <div className="font-weight-bold">OTC Purchase Offers</div>
                <div className="d-flex align-items-center">
                    <div className="d-flex align-items-center">
                        <label className="mr-2 font-weight-500"> Filter:</label>
                        <FormControl variant="outlined" size="small">
                            <InputLabel id="demo-simple-select-outlined-label">filter</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={adminBuyOffersInfo.filter}
                                onChange={setFilterOption}
                                label="filter"
                            >
                                <MenuItem value={0}>Show All</MenuItem>
                                <MenuItem value={1}>Show Batched</MenuItem>
                                <MenuItem value={2}>Show Available</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
            </div>
            <div className="table-wrapper mt-3">
                <DataTable
                    columns={columns}
                    data={adminBuyOffersInfo.offer_list}
                    sortServer={true}
                    onSort={handleSort}
                    progressPending={adminBuyOffersInfo.loading}
                    responsive
                    noHeader
                    striped
                    customStyles={stripedStyle}
                    persistTableHead
                    pagination={true}
                    paginationServer
                    onChangeRowsPerPage={handlePerRowsChange}
                    onChangePage={handlePageChange}
                    paginationTotalRows={adminBuyOffersInfo.total}
                    paginationPerPage={adminBuyOffersInfo.perPage}
                    paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
                />
            </div>
        </div>
    );
}

export default BuyOffers;