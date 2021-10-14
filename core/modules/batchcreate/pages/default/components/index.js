/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/button-has-type */
import React, { useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Link from 'next/link';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from '@modules/batchcreate/pages/default/components/style';
import Button from '@common_button';
import clsx from 'clsx';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import BatchDialog from '@modules/batchcreate/pages/default/components/BatchDialog';
import gqlService from '@modules/batchcreate/services/graphql';
import Router from 'next/router';

const ScanItemContent = (props) => {
    const { formik } = props;
    const classes = useStyles();
    const [pickerOpen, setPickerOpen] = React.useState(false);
    const handlePickerClose = () => {
        setPickerOpen(false);
    };
    const [skuOpen, setSkuOpen] = React.useState(false);
    const handleSkuClose = () => {
        setSkuOpen(false);
    };

    const [getSummaryShipmentToPick, getSummaryShipmentToPickRes] = gqlService.getSummaryShipmentToPick();

    useEffect(() => {
        getSummaryShipmentToPick();
    }, []);

    return (
        <>
            <h2 className={clsx(classes.h2, 'title')}>Pick by Batch</h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    {
                        getSummaryShipmentToPickRes.loading
                            ? <CircularProgress className={classes.progress} /> : (
                                <h2 className={clsx(classes.h2, 'total')}>
                                    {
                                        getSummaryShipmentToPickRes
                                && getSummaryShipmentToPickRes.data
                                && getSummaryShipmentToPickRes.data.getSummaryShipmentToPick.total_shipments
                                    }
                                </h2>
                            )
                    }
                    <h2 className={clsx(classes.h2, 'totalDesc')}>Order ready to pick</h2>
                    <div style={{ height: 18 }} />
                    {
                        getSummaryShipmentToPickRes.loading
                            ? <CircularProgress className={classes.progress} /> : (
                                <h2 className={clsx(classes.h2, 'total')}>
                                    {
                                        getSummaryShipmentToPickRes
                                && getSummaryShipmentToPickRes.data
                                && getSummaryShipmentToPickRes.data.getSummaryShipmentToPick.total_items
                                    }
                                </h2>
                            )
                    }
                    <h2 className={clsx(classes.h2, 'totalDesc')}>SKU to pick</h2>
                    <p className={classes.text}>How would you like to process them?</p>
                    <Button
                        className={classes.btn}
                        variant="contained"
                        buttonType="primary-rounded"
                        onClick={() => {
                            setPickerOpen(true);
                        }}
                        disabled={
                            getSummaryShipmentToPickRes
                            && getSummaryShipmentToPickRes.data
                            && getSummaryShipmentToPickRes.data.getSummaryShipmentToPick.total_shipments === 0
                        }
                    >
                        <img className={classes.iconImg} src="/assets/img/user.svg" alt="" />
                        Create Batch by Picker
                        <ChevronRightIcon className={classes.icon} />
                    </Button>
                    <BatchDialog
                        formik={formik}
                        open={pickerOpen}
                        handleClose={handlePickerClose}
                        title="Picker"
                        titleChild="picker"
                    />
                    <div style={{ height: 18 }} />
                    <Button
                        className={classes.btn}
                        variant="contained"
                        buttonType="primary-rounded"
                        onClick={() => {
                            setSkuOpen(true);
                        }}
                        disabled={
                            getSummaryShipmentToPickRes
                            && getSummaryShipmentToPickRes.data
                            && getSummaryShipmentToPickRes.data.getSummaryShipmentToPick.total_shipments === 0
                        }
                    >
                        <img className={classes.iconImg} src="/assets/img/icon-tag.svg" alt="" />
                        Create Batch by Sku
                        <ChevronRightIcon className={classes.icon} />
                    </Button>
                    <BatchDialog
                        totalSku={
                            getSummaryShipmentToPickRes
                            && getSummaryShipmentToPickRes.data
                            && getSummaryShipmentToPickRes.data.getSummaryShipmentToPick.total_items
                        }
                        formik={formik}
                        open={skuOpen}
                        handleClose={handleSkuClose}
                        title="SKU"
                        titleChild="SKU"
                    />
                    <div style={{ height: 18 }} />
                    <Button
                        className={classes.btn}
                        variant="contained"
                        buttonType="primary-rounded"
                        onClick={() => Router.push('/pickpack/wavecreate/manualorder')}
                    >
                        <img className={classes.iconImg} src="/assets/img/search_box.svg" alt="" />
                        Select Order Manually
                        <ChevronRightIcon className={classes.icon} />
                    </Button>
                    <Link href="/pickpack/batchlist">
                        <a className={classes.linkBack}>See Created Batch List</a>
                    </Link>
                </div>
            </Paper>
        </>
    );
};

export default ScanItemContent;
