/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/button-has-type */
import React from 'react';
import Paper from '@material-ui/core/Paper';
import Router from 'next/router';
import useStyles from '@modules/wavepack/pages/scan/components/style';
import Scan from '@common_barcodescanner';
import ManualScan from '@common_manualscanner';
import CircularProgress from '@material-ui/core/CircularProgress';
import Link from 'next/link';

const ScanItemContent = (props) => {
    const {
        data, loading, handleDetect, id, useCamera,
    } = props;
    const classes = useStyles();
    const dataToShow = data?.updatePickByWaveQtyPacked?.pick_by_wave_item || null;
    return (
        <>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    {useCamera
                        ? (
                            <Scan
                                handleDetect={handleDetect}
                                handleClose={() => Router.push(`/pickpack/wavepack/packlist/detail/${id}`)}
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
                            <Link href={`/pickpack/wavepack/packlist/detail/${id}`}>
                                <a className={classes.linkBack}>Back to Wave Items</a>
                            </Link>
                        ) : null}
                </div>
            </Paper>
        </>
    );
};

export default ScanItemContent;
