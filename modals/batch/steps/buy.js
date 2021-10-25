import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import DataTable from "react-data-table-component";

import Checkbox from '@material-ui/core/Checkbox';
import {
    showCanvas,
    hideCanvas,
    setActiveModal,
    setModalBuyOffersInfo,
    setModalBuyOffersRefresh,
    setBuyCheckedOffers,
} from '../../../redux/actions';
import {
    getAdminBuyOffersList
} from '../../../utils/Thunk';
import { stripedStyle } from '../../../utils/Constant';
import { addCommas } from '../../../utils/Constant';

const BuyStep = () => {

    const dispatch = useDispatch();
    const { modalBuyOffersInfo, modalBuyOffersRefresh, buyCheckedOffers } = useSelector(state => state.global);

    const columns = [
        {
            name: <label className="table-header">Req #</label>,
            width: '80px',
            center: true,
            selector: "id",
            cell: (row) => {
                return (
                    <Link
                        style={{ cursor: "pointer" }}
                        to={`/app/user/${row.id}`}
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
            name: <label className="table-header">Email</label>,
            selector: "users.email",
            cell: (row) => {
                return (
                    <label className="font-size-12">
                        {row.user.email}
                    </label>
                );
            },
            sortable: true,
            compact: true,
        },

        {
            name: <label className="table-header">CSPR</label>,
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
            width: '100px',
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
            width: '100px',
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
            name: <label className="table-header">Select</label>,
            width: '100px',
            cell: (row) => {
                return (
                    <Checkbox
                        onChange={(e, checked) => setChecked(checked, row.id)}
                        checked={
                            buyCheckedOffers.findIndex(offer => offer === row.id) !== -1
                        }
                    />
                );
            },
            sortable: false,
            compact: true,
        }
    ];

    useEffect(() => {
        dispatch(setBuyCheckedOffers([]));
        getOffers();
    }, []);

    useEffect(() => {
        if (modalBuyOffersRefresh) {
            getOffers();
        }
    }, [modalBuyOffersRefresh]);

    useEffect(() => {
        getOffers();
    }, [
        modalBuyOffersInfo.page_id,
        modalBuyOffersInfo.sort_key,
        modalBuyOffersInfo.sort_direction,
        modalBuyOffersInfo.perPage,
        modalBuyOffersInfo.filter
    ])

    const getOffers = () => {
        const {
            page_id,
            loading,
            perPage,
            sort_key,
            sort_direction,
        } = modalBuyOffersInfo;

        const params = {
            page_id,
            loading,
            filter: 2,
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
                            setModalBuyOffersInfo({
                                ...modalBuyOffersInfo,
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
                setModalBuyOffersInfo({
                    ...modalBuyOffersInfo,
                    page_id: 1,
                    sort_key: column.selector,
                    sort_direction: direction,
                })
            );
    };

    const handlePageChange = (page) => {
        dispatch(
            setModalBuyOffersInfo({
                ...modalBuyOffersInfo,
                page_id: page
            })
        );
    };

    const handlePerRowsChange = (page) => {
        dispatch(
            setModalBuyOffersInfo({
                ...modalBuyOffersInfo,
                perPage: page
            })
        );
    };

    const setChecked = (checked, id) => {
        let _offers = buyCheckedOffers;
        const index = _offers.findIndex(offer => offer === id);
        if (checked) {
            if (index === -1)
                _offers = [..._offers, id];
        } else {
            if (index !== -1)
                _offers.splice(index, 1);
        }

        dispatch(setBuyCheckedOffers(_offers));
    }

    return (
        <div className="mt-4">
            <div className="text-gray font-size-12">
                Please select any buyer requests you are filling in this batch <br />
                <small>(optional: buyers may not always be on-platform)</small>
            </div>
            <div className="table-wrapper mt-3">
                <DataTable
                    columns={columns}
                    data={modalBuyOffersInfo.offer_list}
                    sortServer={true}
                    onSort={handleSort}
                    progressPending={modalBuyOffersInfo.loading}
                    responsive
                    noHeader
                    striped
                    customStyles={stripedStyle}
                    persistTableHead
                    pagination={true}
                    paginationServer
                    onChangeRowsPerPage={handlePerRowsChange}
                    onChangePage={handlePageChange}
                    paginationTotalRows={modalBuyOffersInfo.total}
                    paginationPerPage={modalBuyOffersInfo.perPage}
                    paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
                />
            </div>
        </div>
    );
}

export default BuyStep;