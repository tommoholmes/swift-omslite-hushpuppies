/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import clsx from 'clsx';
import useStyles from '@modules/storepickup/pages/edit/components/style';

const StorePickupEditContent = (props) => {
    const {
        storePickup,
        formikConfirm,
        formikCantFullfill,
        formikPacked,
        formikComplete,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push('/shipment/storepickup')}
                variant="contained"
                style={{ marginRight: 10 }}
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
                {`Shipment # ${storePickup.id}`}
            </h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <h5 className={clsx(classes.title, 'jarak')}>
                        {`Order Number : ${storePickup.orderNumber}`}
                    </h5>
                </div>
            </Paper>
        </>
    );
};

export default StorePickupEditContent;
