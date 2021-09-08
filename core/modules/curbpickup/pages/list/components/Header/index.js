/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Button from '@common_button';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import useStyles from '@modules/curbpickup/pages/list/components/Header/style';

const HeaderContent = (props) => {
    const classes = useStyles();
    const router = useRouter();
    return (
        <>
            <div className={classes.headerContainer}>
                <h2 className={classes.title}>Curb Pickup</h2>
            </div>
            <div className={classes.headerContainer}>
                <Button
                    variant="outline"
                    className={classes.buttonTab}
                    onClick={() => router.push('/shipment/curbpickup')}
                >
                    Customer Waiting
                </Button>
                <Button
                    className={clsx(classes.buttonTab, 'nonactive')}
                    onClick={() => router.push('/shipment/curbpickup/indexAll')}
                >
                    All
                </Button>
            </div>
        </>
    );
};

export default HeaderContent;
