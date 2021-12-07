/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import Router from 'next/router';
import Scan from '@common_barcodescanner';
import ManualScan from '@common_manualscanner';
import useStyles from '@modules/batchlist/pages/sorting/components/style';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogInputSKU from '@modules/batchlist/pages/sorting/components/DialogInputSKU';
import Link from 'next/link';

const SortingItemContent = (props) => {
    const {
        pickList, handleDetect, handleDoneSorting, name, sku, slot, config, dataMultiple, loadSorting,
        allowManualConfirm, formik, useCamera,
    } = props;
    const classes = useStyles();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    {useCamera
                        ? (
                            <Scan
                                barcode={pickList.barcode}
                                handleDetect={handleDetect}
                                handleClose={() => Router.push(`/pickpack/batchlist/edit/${pickList.id}`)}
                            />
                        )
                        : (
                            <ManualScan
                                barcode={pickList.barcode}
                                handleDetect={handleDetect}
                            />
                        )}

                    {loadSorting && <CircularProgress className={classes.progress} />}
                    <h2 className={classes.h2}>{name}</h2>
                    <span className={classes.text}>{`SKU ${sku}`}</span>
                    <br />
                    {!loadSorting && dataMultiple && (
                        <>
                            <span className={classes.text}>Add to</span>
                            {config === 'single_item' ? (
                                <span className={classes.textSlot}>{`Slot ${slot}`}</span>
                            ) : (
                                dataMultiple.map((item) => (
                                    <div key={item.shipment_id} className={classes.itemSlot}>
                                        <span className={classes.textSlot}>{`Slot ${item.slot_no} : `}</span>
                                        <span className={classes.slotPcs}>{`Qty ${item.qty}`}</span>
                                    </div>
                                ))
                            )}
                        </>
                    )}
                    <br />

                    <Button className={classes.btn} onClick={handleDoneSorting} variant="contained">
                        Done Sorting
                    </Button>
                    {allowManualConfirm && (
                        <>
                            <br />
                            <DialogInputSKU
                                formik={formik}
                                open={isDialogOpen}
                                handleClose={() => {
                                    setIsDialogOpen(false);
                                }}
                            />
                            <button
                                className="link-button"
                                type="button"
                                style={{
                                    border: 'none',
                                    background: 'none',
                                    cursor: 'pointer',
                                    marginTop: '15px',
                                }}
                                onClick={() => setIsDialogOpen(true)}
                            >
                                Input SKU Manually
                            </button>
                        </>
                    )}
                    {!useCamera
                        ? (
                            <Link href={`/pickpack/batchlist/edit/${pickList.id}`}>
                                <a className={classes.linkBack}>Back to Batch List</a>
                            </Link>
                        ) : null}
                </div>
            </Paper>
        </>
    );
};

export default SortingItemContent;
