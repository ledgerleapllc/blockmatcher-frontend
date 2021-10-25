import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import DataTable from "react-data-table-component";
import {
    showCanvas,
    hideCanvas,
    setBatchBuyOffersInfo,
} from '../../../../../../redux/actions';
import { getBatchBuyOffersList } from '../../../../../../utils/Thunk';
import { addCommas, stripedStyle } from '../../../../../../utils/Constant';
import { Tooltip } from '@material-ui/core';
import Helper from '../../../../../../utils/Helper';

const moment = require("moment");

const BuyOffers = () => {

    const dispatch = useDispatch();
    const { batch_id } = useParams();
    const { batchBuyOffersInfo } = useSelector(state => state.global);

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
                        {`B${row.id}`}
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
            selector: "users.name",
            cell: (row) => {
                return (
                    <Tooltip title={row.user.name} placement="right">
                        <label className="font-size-12">
                            {Helper.subString(row.user.name)}
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
                            {Helper.subString(row.user.email)}
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
                            {Helper.subString(row.user.telegram)}
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
        getBatchBuysList();
    }, []);

    useEffect(() => {
        getBatchBuysList();
    }, [
        batchBuyOffersInfo.page_id,
        batchBuyOffersInfo.sort_key,
        batchBuyOffersInfo.sort_direction,
        batchBuyOffersInfo.perPage
    ])

    const getBatchBuysList = () => {
        const {
            page_id,
            loading,
            perPage,
            sort_key,
            sort_direction,
        } = batchBuyOffersInfo;

        const params = {
            page_id,
            loading,
            perPage,
            sort_key,
            sort_direction,
        };

        dispatch(
            getBatchBuyOffersList(
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
                            setBatchBuyOffersInfo({
                                ...batchBuyOffersInfo,
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
            setBatchBuyOffersInfo({
                page_id: 1,
                sort_key: column.selector,
                sort_direction: direction,
            })
        );
    };

    const handlePageChange = (page) => {
        dispatch(setBatchBuyOffersInfo({ ...batchBuyOffersInfo, page_id: page }));
    };

    const handlePerRowsChange = (page) => {
        dispatch(setBatchBuyOffersInfo({ ...batchBuyOffersInfo, perPage: page }));
    };

    return (
        <div>
            <div className="mt-4 font-size-12 font-weight-bold">
                Buyers for this batch
            </div>
            <div className="table-wrapper mt-2">
                <DataTable
                    columns={columns}
                    data={batchBuyOffersInfo.offer_list}
                    sortServer={true}
                    onSort={handleSort}
                    progressPending={batchBuyOffersInfo.loading}
                    responsive
                    noHeader
                    striped={true}
                    customStyles={stripedStyle}
                    persistTableHead
                    pagination={true}
                    paginationServer
                    onChangeRowsPerPage={handlePerRowsChange}
                    onChangePage={handlePageChange}
                    paginationTotalRows={batchBuyOffersInfo.total}
                    paginationPerPage={batchBuyOffersInfo.perPage}
                    paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
                />
            </div>
        </div>
    );
}

export default BuyOffers;