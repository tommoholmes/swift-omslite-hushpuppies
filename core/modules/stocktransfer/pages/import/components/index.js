/* eslint-disable no-unused-vars */
import React from 'react';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DropFile from '@common_dropfile';
import clsx from 'clsx';
import useStyles from '@modules/stocktransfer/pages/import/components/style';
import gqlService from '@modules/stocktransfer/services/graphql';
import Table from '@common_table';
import Link from 'next/link';
import Head from 'next/head';

const StockTransferImport = (props) => {
    const { formik, urlDownload, handleDropFile } = props;
    const classes = useStyles();
    const router = useRouter();
    const [getUploadStockTransferList, getUploadStockTransferListRes] = gqlService.getUploadStockTransferList();
    const uploadStockTransferList = (getUploadStockTransferListRes.data
            && getUploadStockTransferListRes.data.getUploadStockTransferList
            && getUploadStockTransferListRes.data.getUploadStockTransferList.items)
        || [];
    const uploadStockTransferListTotal = (getUploadStockTransferListRes.data
            && getUploadStockTransferListRes.data.getUploadStockTransferList
            && getUploadStockTransferListRes.data.getUploadStockTransferList.total_count)
        || 0;

    const columns = [
        {
            field: 'entity_id', headerName: 'ID', hideable: 'true', sortable: true, initialSort: 'DESC',
        },
        {
            field: 'filename', headerName: 'FileName', hideable: 'true', sortable: false,
        },
        {
            field: 'created_by', headerName: 'Created By', hideable: 'true', sortable: true,
        },
        {
            field: 'created_at', headerName: 'Created At', hideable: 'true', sortable: true,
        },
        { field: 'file', headerName: 'File' },
        { field: 'actions', headerName: 'Action' },
    ];

    const filters = [
        {
            field: 'entity_id', name: 'entity_id', type: 'like', label: 'ID', initialValue: '',
        },
        {
            field: 'created_by', name: 'created_by', type: 'like', label: 'Created By', initialValue: '',
        },
    ];

    const rows = uploadStockTransferList.map((uploadStockTransfer) => ({
        ...uploadStockTransfer,
        id: uploadStockTransfer.entity_id,
        file: () => (
            <Link href={uploadStockTransfer.url}>
                <a className="link-button">Download File</a>
            </Link>
        ),
        actions: () => (
            <Link href={`/cataloginventory/stocktransfer/${uploadStockTransfer.entity_id}/detailupload`}>
                <a className="link-button">View Items</a>
            </Link>
        ),
    }));

    return (
        <>
            <Head>
                <title>Upload Stock Transfer</title>
            </Head>
            <Button
                className={classes.btnBack}
                onClick={() => router.push('/cataloginventory/stocktransfer')}
                variant="contained"
                style={{ marginRight: 16 }}
            >
                <ChevronLeftIcon
                    style={{
                        fontSize: 30,
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                />
            </Button>
            <h2 className={classes.titleTop}>Upload Stock Transfer</h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <div className={classes.formField}>
                        <span className={classes.label}>
                            <a href={urlDownload} className={classes.linkDownload}>
                                Download the Sample CSV
                            </a>
                        </span>
                        <span className={clsx(classes.textAttach, classes.label)}>Attach File </span>
                    </div>
                    <div className={classes.formField}>
                        <DropFile
                            title="Please select the file : "
                            error={formik.errors.binary && formik.touched.binary}
                            getBase64={handleDropFile}
                        />
                    </div>
                </div>
                <div className={classes.formFieldButton}>
                    <Button className={classes.btn} onClick={formik.handleSubmit} variant="contained">
                        Submit
                    </Button>
                </div>
            </Paper>
            <h3 className={classes.titleTop}>Stock Transfer Upload History</h3>
            <Table
                filters={filters}
                rows={rows}
                getRows={getUploadStockTransferList}
                loading={getUploadStockTransferListRes?.loading}
                columns={columns}
                count={uploadStockTransferListTotal}
                hideActions
            />
        </>
    );
};

export default StockTransferImport;
