import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import DataTable from "react-data-table-component";
import {
    setActiveModal,
    showCanvas,
    hideCanvas,
    setBatchesInfo,
    setSaleOffersRefresh,
    setBatchesRefresh,
    setAdminBuyOffersRefresh
} from '../../../../../redux/actions';
import {
    getBatchesList,
    detailExportCSV,
    removeBatch
} from '../../../../../utils/Thunk';
import { addCommas } from '../../../../../utils/Constant';
import { stripedStyle } from '../../../../../utils/Constant';
import { Tooltip } from '@material-ui/core';
const moment = require("moment");

const Batches = () => {

    const dispatch = useDispatch();
    const { batchesInfo, batchesRefresh } = useSelector(state => state.global);

    const columns = [
        {
            name: <label className="table-header">Batch #</label>,
            center: true,
            selector: "id",
            cell: (row) => {
                return (
                    <Link
                        style={{ cursor: "pointer" }}
                        to={`/app/batches/${row.id}`}
                        className="font-size-12"
                    >
                        {row.id}
                    </Link>
                );
            },
            sortable: true,
            compact: true,
        },
        {
            name: <label className="table-header">Date Created</label>,
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
            name: <label className="table-header">CSPR total</label>,
            selector: "total_cspr",
            cell: (row) => {
                return (
                    <label className="font-size-12">
                        {addCommas(row.total_cspr)}
                    </label>
                );
            },
            sortable: true,
            compact: true,
        },
        {
            name: <label className="table-header">Price per Token</label>,
            selector: "price",
            cell: (row) => {
                return (
                    <label className="font-size-12">
                        {row.price}
                    </label>
                );
            },
            sortable: true,
            compact: true,
        },
        {
            name: <label className="table-header">Total Sale Price</label>,
            selector: "total_price",
            cell: (row) => {
                return (
                    <label className="font-size-12">
                        {addCommas(row.total_price)}
                    </label>
                );
            },
            sortable: true,
            compact: true,
        },
        {
            name: <label className="table-header">Notes</label>,
            cell: (row) => {
                return (
                    <Tooltip title={row.notes} placement="right">
                        <label className="font-size-12">
                            {row.notes}
                        </label>
                    </Tooltip>
                );
            },
            sortable: true,
            compact: true,
        },
        {
            name: <label className="table-header">Action</label>,
            width: '250px',
            cell: (row) => {
                return (
                    <>
                        <button
                            className="btn btn-small btn-primary"
                            onClick={() => showUndoBatchModal(row.id)}
                        >
                            Undo
                        </button>
                        <button
                            className="btn btn-small btn-outlined ml-2"
                            onClick={() => downloadCSV(row.id)}
                        >
                            Export CSV
                        </button>
                    </>
                );
            },
            sortable: true,
            compact: true,
        },
    ];

    useEffect(() => {
        getBatches();
    }, []);

    useEffect(() => {
        if (batchesRefresh)
            getBatches();
    }, [batchesRefresh]);

    useEffect(() => {
        getBatches();
    }, [
        batchesInfo.page_id,
        batchesInfo.sort_key,
        batchesInfo.sort_direction,
        batchesInfo.perPage
    ])

    const getBatches = () => {
        const {
            page_id,
            loading,
            perPage,
            sort_key,
            sort_direction,
        } = batchesInfo;

        const params = {
            page_id,
            loading,
            perPage,
            sort_key,
            sort_direction,
        };

        dispatch(
            getBatchesList(
                params,
                () => {
                    dispatch(showCanvas());
                },
                (res) => {
                    dispatch(hideCanvas());
                    if (res && res.success) {
                        const batch_list = res.batch_list || [];
                        const total = res.total || 0;
                        dispatch(
                            setBatchesInfo({
                                ...batchesInfo,
                                batch_list,
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
        console.log(column, direction)
        if (column)
            dispatch(
                setBatchesInfo({
                    ...batchesInfo,
                    page_id: 1,
                    sort_key: column.selector,
                    sort_direction: direction,
                })
            );
    };

    const handlePageChange = (page) => {
        dispatch(
            setBatchesInfo({
                ...batchesInfo,
                page_id: page
            })
        );
    };

    const handlePerRowsChange = (page) => {
        dispatch(
            setBatchesInfo({
                ...batchesInfo,
                perPage: page
            })
        );
    };


    const showUndoBatchModal = (id) => {

        dispatch(
            setActiveModal(
                'undo-batch',
                () => {
                    dispatch(
                        removeBatch(
                            id,
                            () => {
                                dispatch(showCanvas());
                            },
                            (res) => {
                                dispatch(hideCanvas());
                                if (res && res.success) {
                                    dispatch(setSaleOffersRefresh(true));
                                    dispatch(setSaleOffersRefresh(false));
                                    dispatch(setAdminBuyOffersRefresh(true));
                                    dispatch(setAdminBuyOffersRefresh(false));
                                    dispatch(setBatchesRefresh(true));
                                    dispatch(setBatchesRefresh(false));
                                }
                            }

                        )
                    )

                }
            )
        )

    }

    const downloadCSV = (id) => {
        dispatch(
            detailExportCSV(
                id,
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
                        link.setAttribute('download', filename); //or any other extension
                        document.body.appendChild(link);
                        link.click();
                    }
                }
            )
        );
    }

    return (
        <div className="mt-4">
            <div className="font-weight-bold">Batches</div>
            <div className="table-wrapper mt-3">
                <DataTable
                    columns={columns}
                    data={batchesInfo.batch_list}
                    sortServer={true}
                    onSort={handleSort}
                    progressPending={batchesInfo.loading}
                    responsive
                    noHeader
                    striped={true}
                    customStyles={stripedStyle}
                    persistTableHead
                    pagination={true}
                    paginationServer
                    onChangeRowsPerPage={handlePerRowsChange}
                    onChangePage={handlePageChange}
                    paginationTotalRows={batchesInfo.total}
                    paginationPerPage={batchesInfo.perPage}
                    paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
                />
            </div>
        </div>
    );
}

export default Batches;