/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/button-has-type */
import React from 'react';
import Paper from '@material-ui/core/Paper';
import Router from 'next/router';
import useStyles from '@modules/batchpack/pages/scan/components/style';
import Scan from '@common_barcodescanner';
import ManualScan from '@common_manualscanner';
import CircularProgress from '@material-ui/core/CircularProgress';
import Link from 'next/link';

const ScanItemContent = (props) => {
    const {
        data, loading, handleDetect, shipment_id, useCamera,
    } = props;
    const classes = useStyles();
    const dataToShow = data?.updatePickByBatchQtyPacked?.pick_by_batch_sort || null;
    return (
        <>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    {useCamera
                        ? (
                            <Scan
                                handleDetect={handleDetect}
                                handleClose={() => Router.push(`/pickpack/batchpack/detail/${shipment_id}`)}
                            />
                        )
                        : (
                            <ManualScan
                                handleDetect={handleDetect}
                            />
                        )}

                    {loading ? <CircularProgress className={classes.progress} />
                        : dataToShow
                            ? (
                                <div>
                                    <h2 className={classes.name}>{dataToShow.name}</h2>
                                    <h5 className={classes.sku}>{`SKU ${dataToShow.name}`}</h5>
                                    <div style={{ height: 18 }} />
                                    <h2 className={classes.qty}>{`${dataToShow.qty_packed} / ${dataToShow.qty_to_pick}`}</h2>
                                </div>
                            )
                            : null}
                    {!useCamera
                        ? (
                            <Link href={`/pickpack/batchpack/detail/${shipment_id}`}>
                                <a className={classes.linkBack}>Back to Batch Items</a>
                            </Link>
                        ) : null}
                </div>
            </Paper>
        </>
    );
};

export default ScanItemContent;
