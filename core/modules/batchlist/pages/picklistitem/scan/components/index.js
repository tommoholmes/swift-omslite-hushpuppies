/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/button-has-type */
import React from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import Link from 'next/link';
import Router from 'next/router';
import Scan from '@common_barcodescanner';
import useStyles from '@modules/batchlist/pages/picklistitem/scan/components/style';

const ScanItemContent = (props) => {
    const {
        pickList, incrementCount, decrementCount, handleDetect, count, setCount, handleSubmit, visibility,
    } = props;
    const classes = useStyles();
    const num = /^\d+$/;

    return (
        <>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <Scan
                        barcode={pickList.sku}
                        handleDetect={handleDetect}
                        handleClose={() => Router.push(`/pickpack/batchlist/picklistitem/${pickList.id}`)}
                    />
                    <h2 className={classes.h2}>{pickList.name}</h2>
                    <span className={classes.text}>
                        {`SKU ${pickList.sku} / `}
                        <b>{pickList.qty}</b>
                        {' '}
                        required
                    </span>
                    <br />
                    <span className={classes.text}>{`You have picked ${pickList.qtyPicked} item`}</span>
                    <div style={{ marginTop: 19, display: 'flex', justifyContent: 'center' }}>
                        <button className={classes.button} style={{ marginTop: -10 }} onClick={decrementCount}> - </button>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="qtyPicked"
                            value={count}
                            onChange={(e) => {
                                if (num.test(e.target.value) || e.target.value === '') {
                                    setCount(e.target.value ? Number(e.target.value) : e.target.value);
                                }
                            }}
                            error={!num.test(count)}
                            inputProps={{
                                className: classes.InputProps,
                            }}
                        />
                        <button className={classes.button} style={{ marginTop: -6 }} onClick={incrementCount}> + </button>
                    </div>
                    <Button
                        disabled={!visibility}
                        className={classes.btn}
                        onClick={handleSubmit}
                        variant="contained"
                    >
                        Confirm
                    </Button>

                    <div className="hidden-mobile">
                        <Link href={`/pickpack/batchlist/picklistitem/${pickList.id}`}>
                            <a className={classes.linkBack}>Back to Pick List Item</a>
                        </Link>
                    </div>
                </div>
            </Paper>
        </>
    );
};

export default ScanItemContent;
