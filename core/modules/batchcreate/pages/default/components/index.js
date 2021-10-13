/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/button-has-type */
import React from 'react';
import Paper from '@material-ui/core/Paper';
import Link from 'next/link';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from '@modules/batchcreate/pages/default/components/style';
import Button from '@common_button';
import clsx from 'clsx';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import BatchDialog from '@modules/batchcreate/pages/default/components/BatchDialog';

const ScanItemContent = (props) => {
    const { data, loading } = props;
    const classes = useStyles();
    const [pickerOpen, setPickerOpen] = React.useState(false);
    const handlePickerClose = () => {
        setPickerOpen(false);
    };
    const [skuOpen, setSkuOpen] = React.useState(false);
    const handleSkuClose = () => {
        setSkuOpen(false);
    };

    return (
        <>
            <h2 className={clsx(classes.h2, 'title')}>Pick by Batch</h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    {loading ? <CircularProgress className={classes.progress} /> : <h2 className={clsx(classes.h2, 'total')}>{data}</h2>}
                    <h2 className={clsx(classes.h2, 'totalDesc')}>Order ready to pick</h2>
                    <p className={classes.text}>How would you like to process them?</p>
                    <Button
                        className={classes.btn}
                        variant="contained"
                        buttonType="primary-rounded"
                        onClick={() => {
                            setPickerOpen(true);
                        }}
                    >
                        <img className={classes.iconImg} src="/assets/img/user.svg" alt="" />
                        Create Batch by Picker
                        <ChevronRightIcon className={classes.icon} />
                    </Button>
                    <BatchDialog open={pickerOpen} handleClose={handlePickerClose} title="Picker" titleChild="picker" />
                    <div style={{ height: 18 }} />
                    <Button
                        className={classes.btn}
                        variant="contained"
                        buttonType="primary-rounded"
                        onClick={() => {
                            setSkuOpen(true);
                        }}
                    >
                        <img className={classes.iconImg} src="/assets/img/icon-tag.svg" alt="" />
                        Create Batch by Sku
                        <ChevronRightIcon className={classes.icon} />
                    </Button>
                    <BatchDialog open={skuOpen} handleClose={handleSkuClose} title="SKU" titleChild="SKU" />
                    <div style={{ height: 18 }} />
                    <Button className={classes.btn} variant="contained" buttonType="primary-rounded">
                        <img className={classes.iconImg} src="/assets/img/search_box.svg" alt="" />
                        Select Order Manually
                        <ChevronRightIcon className={classes.icon} />
                    </Button>
                    <Link href="/pickpack/wavelist">
                        <a className={classes.linkBack}>See Created Batch List</a>
                    </Link>
                </div>
            </Paper>
        </>
    );
};

export default ScanItemContent;
