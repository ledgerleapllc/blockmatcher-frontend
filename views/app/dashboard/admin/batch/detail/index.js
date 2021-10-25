import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import * as Icon from 'react-feather';
import {
    showCanvas,
    hideCanvas,
    setActiveModal,
    setBatchDetailInfo
} from '../../../../../../redux/actions';
import {
    getBatchDetail,
    saveNotes,
    detailExportCSV,
    removeBatch
} from '../../../../../../utils/Thunk';
import { addCommas } from '../../../../../../utils/Constant';
import SellOffersTable from './sell';
import BuyOffersTable from './buy';
const moment = require("moment");

const BatchDetail = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const { batch_id } = useParams();
    const { batchDetailInfo } = useSelector((state) => state.global);

    const [notes, setNotes] = useState('');
    const [edit, setEdit] = useState(false);


    useEffect(() => {
        getBatchDetailInfo();
    }, []);

    const getBatchDetailInfo = () => {
        console.log(batch_id);
        dispatch(
            getBatchDetail(
                batch_id,
                () => {
                    dispatch(showCanvas());
                },
                (res) => {
                    dispatch(hideCanvas());
                    if (res && res.success) {
                        const batch = res.batch || {};
                        dispatch(
                            setBatchDetailInfo({
                                ...batchDetailInfo,
                                batch
                            })
                        );
                        setNotes(res.batch.notes);
                    }
                }
            )
        )
    }

    const undoBatch = () => {
        dispatch(
            setActiveModal(
                'undo-batch',
                () => {
                    dispatch(
                        removeBatch(
                            batch_id,
                            () => {
                                dispatch(showCanvas());
                            },
                            (res) => {
                                dispatch(hideCanvas());
                                if (res && res.success) {
                                    history.push("/app");
                                }
                            }

                        )
                    )

                }
            )
        )
    }

    const downloadCSV = () => {
        dispatch(
            detailExportCSV(
                batch_id,
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

    const saveBatchNotes = () => {
        dispatch(
            saveNotes(
                batch_id,
                { notes },
                () => {
                    dispatch(showCanvas())
                },
                (res) => {
                    dispatch(hideCanvas())
                    setEdit(false);
                }
            )
        )
    }


    return (
        <div id="app-dashboard-page">
            <div className="c-container">
                <div id="go-back-btn" className="mb-0">
                    <div className="back-btn" onClick={() => history.goBack()}>
                        <Icon.ChevronLeft />
                        <label className="h6 font-weight-bold">Go Back</label>
                    </div>
                </div>
                <div id="app-dashboard-pageHeader">
                    <h2>
                        Batch {batch_id}
                    </h2>
                    <div>
                        <button
                            className="btn btn-primary btn-small px-4"
                            onClick={undoBatch}
                        >
                            <label className="font-size-12">Undo Batch</label>
                        </button>
                        <button
                            className="btn btn-outlined btn-small px-4 ml-3"
                            onClick={downloadCSV}
                        >
                            <Icon.Download size={16} />
                            <label className="font-size-12 ml-2">Export CSV</label>
                        </button>
                    </div>
                </div>
                <div className="mt-4 ml-2 font-size-12">
                    <div className="d-flex">
                        <div style={{ width: '130px' }}>
                            Total tokens sold:
                        </div>
                        {
                            batchDetailInfo.batch.total_cspr &&
                            <b>{addCommas(batchDetailInfo.batch.total_cspr)}</b>
                        }
                    </div>
                    <div className="d-flex">
                        <div style={{ width: '130px' }}>
                            Price per token:
                        </div>
                        {
                            batchDetailInfo.batch.price &&
                            <b>${batchDetailInfo.batch.price}</b>
                        }
                    </div>
                    <div className="d-flex">
                        <div style={{ width: '130px' }}>
                            Total sale price:
                        </div>
                        {
                            batchDetailInfo.batch.total_cspr && batchDetailInfo.batch.price &&
                            <b>${addCommas(batchDetailInfo.batch.total_cspr * batchDetailInfo.batch.price)}</b>
                        }

                    </div>
                </div>
                <div className="mt-2">
                    <div className="d-flex align-items-center justify-content-between">
                        <div className=" font-size-12 font-weight-bold">
                            Notes
                        </div>
                        <div>
                            {
                                !edit &&
                                <button
                                    className="btn btn-small btn-primary"
                                    onClick={() => setEdit(true)}
                                >
                                    Edit
                                </button>
                            }
                            {
                                edit &&
                                <>
                                    <button
                                        className="btn btn-small btn-primary"
                                        disabled={!notes || !notes.trim().length}
                                        onClick={saveBatchNotes}
                                    >
                                        Save
                                    </button>
                                    <button
                                        className="btn btn-small btn-primary ml-2"
                                        onClick={() => setEdit(false)}
                                    >
                                        Cancel
                                    </button>

                                </>
                            }
                        </div>
                    </div>
                    <textarea
                        className="custom-form-control mt-1"
                        value={notes}
                        readOnly={!edit}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </div>
                {<SellOffersTable />}
                {<BuyOffersTable />}

            </div>
        </div>
    );
}

export default BatchDetail;