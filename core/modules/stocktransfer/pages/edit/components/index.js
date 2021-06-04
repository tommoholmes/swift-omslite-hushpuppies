/* eslint-disable no-unused-vars */
import React from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import useStyles from './style';

const StockTransferEditContent = (props) => {
    const {
        stockTransferDetail,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push('/cataloginventory/stocktransfer')}
                variant="contained"
                style={{ marginRight: 16 }}
            >
                <ChevronLeftIcon style={{
                    fontSize: 30,
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
                />
            </Button>
            <h2 className={classes.titleTop}>
                Item List
                {stockTransferDetail.incrementID}
            </h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <table className={classes.table}>
                        <tbody>
                            <tr className={classes.tr}>
                                <th className={classes.th}>SKU</th>
                                <th className={classes.th}>Product Name</th>
                                <th className={classes.th}>Source ID</th>
                                <th className={classes.th}>Target ID</th>
                                <th className={classes.th}>Source Quantity</th>
                                <th className={classes.th}>Transfer Quantity</th>
                            </tr>
                            {stockTransferDetail.items.map((e) => (
                                <tr>
                                    <td className={classes.td}>{e.sku}</td>
                                    <td className={classes.td}>{e.product_name}</td>
                                    <td className={classes.td}>{e.source_id}</td>
                                    <td className={classes.td}>{e.target_id}</td>
                                    <td className={classes.td}>{e.source_qty}</td>
                                    <td className={classes.td}>{e.transfer_qty}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Paper>
        </>
    );
};

export default StockTransferEditContent;
