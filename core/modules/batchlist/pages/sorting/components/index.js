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
import useStyles from '@modules/batchlist/pages/sorting/components/style';

const SortingItemContent = (props) => {
    const {
        pickList, handleDetect, handleDoneSorting, name, sku, slot,
    } = props;
    const classes = useStyles();

    return (
        <>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <Scan
                        barcode={pickList.barcode}
                        handleDetect={handleDetect}
                        handleClose={() => Router.push(`/pickpack/batchlist/edit/${pickList.id}`)}
                    />
                    <h2 className={classes.h2}>
                        {name}
                    </h2>
                    <span className={classes.text}>
                        {`SKU ${sku}`}
                    </span>
                    <br />
                    <span className={classes.text}>
                        Add to
                    </span>
                    <span className={classes.textSlot}>
                        {`Slot ${slot}`}
                    </span>
                    <br />

                    <Button
                        className={classes.btn}
                        onClick={handleDoneSorting}
                        variant="contained"
                    >
                        Done Sorting
                    </Button>
                </div>
            </Paper>
        </>
    );
};

export default SortingItemContent;
