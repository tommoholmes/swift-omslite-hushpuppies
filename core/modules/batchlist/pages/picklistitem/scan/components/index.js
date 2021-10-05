/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/button-has-type */
import React from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import Link from 'next/link';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import useStyles from '@modules/batchlist/pages/picklistitem/scan/components/style';

const ScanItemContent = (props) => {
    const {
        pickList, count, incrementCount, decrementCount, formik,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    return (
        <>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <h2 className={classes.h2}>{pickList.name}</h2>
                    <span className={classes.text}>
                        {`SKU ${pickList.sku} / `}
                        <b>{pickList.qty}</b>
                        {' '}
                        required
                    </span>
                    <br />
                    <span className={classes.text}>{`You have picked ${pickList.qtyPicked} item`}</span>
                    <div style={{ marginTop: 19 }}>
                        <button className={classes.button} style={{ marginTop: -10 }} onClick={decrementCount}> - </button>
                        <h2 className={clsx(classes.h2, 'quantity')}>{count}</h2>
                        <button className={classes.button} style={{ marginTop: -6 }} onClick={incrementCount}> + </button>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="qtyPicked"
                            value={formik.values.qtyPicked}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.qtyPicked && formik.errors.qtyPicked)}
                            helperText={(formik.touched.qtyPicked && formik.errors.qtyPicked) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <Button
                        className={classes.btn}
                        onClick={formik.handleSubmit}
                        variant="contained"
                    >
                        Confirm
                    </Button>

                    <Link href={`/pickpack/batchlist/picklistitem/${pickList.id}`}>
                        <a className={classes.linkBack}>Back to Pick List Item</a>
                    </Link>
                </div>
            </Paper>
        </>
    );
};

export default ScanItemContent;
