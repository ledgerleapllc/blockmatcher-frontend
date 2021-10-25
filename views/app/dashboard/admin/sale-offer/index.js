import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Checkbox, Tooltip, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import DataTable from "react-data-table-component";
import Switch from "../../../../../components/Switch";
import { FormSelectComponent } from "../../../../../components";
import { showCanvas, hideCanvas, setSaleOffersInfo, setCheckedOffers } from '../../../../../redux/actions';
import { getSellOffersList } from '../../../../../utils/Thunk';
import { stripedStyle } from '../../../../../utils/Constant';
import { addCommas } from '../../../../../utils/Constant';
import Helper from '../../../../../utils/Helper';
import { Label } from '@material-ui/icons';

const moment = require("moment");

const SaleOffers = () => {

    const dispatch = useDispatch();
    const { saleOffersInfo, saleOffersRefresh, checkedOffers } = useSelector(state => state.global);
    const filterOptions = [
        "Show All",
        "Show Batched",
        "Show Available"
    ];

    const columns = [
        {
            name: <label className="table-header">Req #</label>,
            width: '100px',
            center: true,
            selector: "offers.id",
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
                            {moment(row.created_at).format('MM-DD-YYYY') + '...'}
                        </label>
                    </Tooltip>
                );
            },
            sortable: true,
            compact: true,
        },
        {
            name: <label className="table-header">Name</label>,
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
            selector: "users.email",
            cell: (row) => {
                return (
                    <Tooltip title={row.user.email} placement="right">
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
            selector: "users.telegram",
            cell: (row) => {
                return (
                    <Tooltip title={row.user.telegram || ''} placement="right">
                        <label className="font-size-12">
                            {row.user.telegram}
                        </label>
                    </Tooltip>
                );
            },
            sortable: true,
            compact: true,
        },
        {
            name: <label className="table-header">Amount For Sale</label>,
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
            name: <label className="table-header">Desired Price</label>,
            selector: "desired_price",
            cell: (row) => {
                return (
                    <label className="font-size-12">
                        $ {row.desired_price}
                    </label>
                );
            },
            sortable: true,
            compact: true,
        },
        {
            name: <label className="table-header">Unlocked?</label>,
            center: true,
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

    ];

    const check_column = {
        name: <label className="table-header">Batch</label>,
        center: true,
        cell: (row) => {
            return (
                row.is_batch ?
                    <div className="text-center">
                        {row.batch_id}
                    </div> :
                    <Checkbox
                        onChange={(event, checked) => setChecked(checked, row)}
                        checked={
                            checkedOffers.findIndex(offer => offer.id === row.id) !== -1
                        }
                    />
            );
        },
        sortable: true,
        compact: true,
    };

    const columnsWithCheckbox = [
        ...columns, check_column
    ];

    useEffect(() => {
        getOffers();
    }, []);

    useEffect(() => {
        if (saleOffersRefresh) {
            getOffers();
            console.log('clear checked offers');
            setCheckedOffers([]);
        }
    }, [saleOffersRefresh]);

    useEffect(() => {
        getOffers();
    }, [
        saleOffersInfo.page_id,
        saleOffersInfo.sort_key,
        saleOffersInfo.sort_direction,
        saleOffersInfo.perPage,
        saleOffersInfo.filter,
        saleOffersInfo.hideLocked,
    ])

    const setChecked = (checked, row) => {
        let _offers = checkedOffers;
        const index = _offers.findIndex(offer => offer.id === row.id);
        if (checked) {
            if (index === -1)
                _offers = [..._offers, row];
        } else {
            if (index !== -1)
                _offers.splice(index, 1);
        }

        dispatch(setCheckedOffers(_offers));
    }

    const getOffers = () => {
        const {
            page_id,
            loading,
            filter,
            hideLocked,
            perPage,
            sort_key,
            sort_direction,
        } = saleOffersInfo;

        const params = {
            page_id,
            loading,
            filter,
            hideLocked,
            perPage,
            sort_key,
            sort_direction,
        };

        dispatch(
            getSellOffersList(
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
                            setSaleOffersInfo({
                                ...saleOffersInfo,
                                offer_list,
                                total,
                                checkedOffers: []
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
                setSaleOffersInfo({
                    ...saleOffersInfo,
                    page_id: 1,
                    sort_key: column.selector,
                    sort_direction: direction,
                })
            );
    };

    const handlePageChange = (page) => {
        dispatch(
            setSaleOffersInfo({
                ...saleOffersInfo,
                page_id: page
            })
        );
    };

    const handlePerRowsChange = (page) => {
        dispatch(
            setSaleOffersInfo({
                ...saleOffersInfo,
                perPage: page
            })
        );
    };

    const toggleHideLocked = (value) => {
        dispatch(
            setSaleOffersInfo({
                ...saleOffersInfo,
                hideLocked: !saleOffersInfo.hideLocked
            })
        )
    }

    const setFilterOption = (e) => {
        dispatch(
            setSaleOffersInfo(
                {
                    ...saleOffersInfo,
                    filter: e.target.value
                }
            )
        );
    }

    return (
        <div className="mt-4">
            <div className="d-flex align-items-center justify-content-between">
                <div className="font-weight-bold">OTC Sale Offers</div>
                <div className="d-flex align-items-center">
                    <div className="d-flex align-items-center">
                        <label className="mr-2 font-weight-500"> Filter:</label>
                        <FormControl variant="outlined" size="small">
                            <InputLabel id="demo-simple-select-outlined-label">filter</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={saleOffersInfo.filter}
                                onChange={setFilterOption}
                                label="filter"
                            >
                                <MenuItem value={0}>Show All</MenuItem>
                                <MenuItem value={1}>Show Batched</MenuItem>
                                <MenuItem value={2}>Show Available</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className="ml-4 d-flex align-items-center">
                        <label className="font-weight-500">Hide Locked</label>
                        <Switch
                            checked={saleOffersInfo.hideLocked}
                            onChange={toggleHideLocked}
                            color="primary"
                            name="treeView"
                            className="ml-2"
                            inputProps={{ "aria-label": "primary checkbox" }}
                        />
                    </div>
                </div>
            </div>
            <div className="table-wrapper mt-3">
                <DataTable
                    columns={/* saleOffersInfo.filter == 1 ? columns :  */columnsWithCheckbox}
                    data={saleOffersInfo.offer_list}
                    sortServer={true}
                    onSort={handleSort}
                    progressPending={saleOffersInfo.loading}
                    responsive
                    noHeader
                    striped
                    customStyles={stripedStyle}
                    persistTableHead
                    pagination={true}
                    paginationServer
                    onChangeRowsPerPage={handlePerRowsChange}
                    onChangePage={handlePageChange}
                    paginationTotalRows={saleOffersInfo.total}
                    paginationPerPage={saleOffersInfo.perPage}
                    paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
                />
            </div>
        </div>
    );
}

export default SaleOffers;