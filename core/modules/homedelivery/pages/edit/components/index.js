/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import clsx from 'clsx';
import useStyles from '@modules/homedelivery/pages/edit/components/style';

const HomeDeliveryEditContent = (props) => {
    const {
        homeDelivery,
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
                onClick={() => router.push('/shipment/homedelivery')}
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
                {`Shipment # ${homeDelivery.id}`}
            </h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <h5 className={clsx(classes.title, 'jarak')}>
                        {`Order Number : ${homeDelivery.orderNumber}`}
                    </h5>
                </div>
            </Paper>
        </>
    );
};

export default HomeDeliveryEditContent;
