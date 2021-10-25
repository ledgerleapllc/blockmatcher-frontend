import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { Tooltip } from '@material-ui/core';
import DataTable from "react-data-table-component";
import {
    showCanvas,
    hideCanvas,
    setBatchSellOffersInfo,
} from '../../../../../../redux/actions';
import { getBatchSellOffersList } from '../../../../../../utils/Thunk';
import { addCommas, stripedStyle } from '../../../../../../utils/Constant';
import Helper from '../../../../../../utils/Helper';
const moment = require("moment");

const SellOffers = () => {

    const dispatch = useDispatch();
    const { batch_id } = useParams();
    const { batchSellOffersInfo } = useSelector(state => state.global);

    const columns = [
        {
            name: <label className="table-header text-center">Req #</label>,
            center: true,
            width: '120px',
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
            width: '120px',
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
            name: <label className="table-header">Name</label>,
            selector: "users.id",
            cell: (row) => {
                return (
                    <Tooltip title={row.user.name} placement="right">
                        <label className="font-size-12">
                            {Helper.subString(row.user.name, 18)}
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
                            {Helper.subString(row.user.email, 18)}
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
                    <Tooltip title={row.user.telegram || ''} placement="right" >
                        <label className="font-size-12">
                            {Helper.subString(row.user.telegram, 18)}
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
            name: <label className="table-header">Unlocked?</label>,
            center: true,
            width: '120px',
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

    useEffect(() => {
        getBatchSellsList();
    }, []);

    useEffect(() => {
        getBatchSellsList();
    }, [
        batchSellOffersInfo.page_id,
        batchSellOffersInfo.sort_key,
        batchSellOffersInfo.sort_direction,
        batchSellOffersInfo.perPage
    ])

    const getBatchSellsList = () => {
        const {
            page_id,
            loading,
            perPage,
            sort_key,
            sort_direction,
        } = batchSellOffersInfo;

        const params = {
            page_id,
            loading,
            perPage,
            sort_key,
            sort_direction,
        };

        dispatch(
            getBatchSellOffersList(
                batch_id,
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
                            setBatchSellOffersInfo({
                                ...batchSellOffersInfo,
                                offer_list,
                                total,
                            })
                        );
                    }
                }
            )
        )
    }

    const handleSort = (column, direction) => {
        dispatch(
            setBatchSellOffersInfo({
                page_id: 1,
                sort_key: column.selector,
                sort_direction: direction,
            })
        );
    };

    const handlePageChange = (page) => {
        dispatch(setBatchSellOffersInfo({ ...batchSellOffersInfo, page_id: page }));
    };

    const handlePerRowsChange = (page) => {
        dispatch(setBatchSellOffersInfo({ ...batchSellOffersInfo, perPage: page }));
    };

    return (
        <div>
            <div className="mt-4 font-size-12 font-weight-bold">
                Sellers in this batch
            </div>
            <div className="table-wrapper mt-2">
                <DataTable
                    columns={columns}
                    data={batchSellOffersInfo.offer_list}
                    sortServer={true}
                    onSort={handleSort}
                    progressPending={batchSellOffersInfo.loading}
                    responsive
                    noHeader
                    striped={true}
                    customStyles={stripedStyle}
                    persistTableHead
                    pagination={true}
                    paginationServer
                    onChangeRowsPerPage={handlePerRowsChange}
                    onChangePage={handlePageChange}
                    paginationTotalRows={batchSellOffersInfo.total}
                    paginationPerPage={batchSellOffersInfo.perPage}
                    paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
                />
            </div>
        </div>
    );
}

export default SellOffers;