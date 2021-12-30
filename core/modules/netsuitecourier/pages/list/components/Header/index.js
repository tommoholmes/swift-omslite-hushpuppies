/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import { useRouter } from 'next/router';
import useStyles from '@modules/netsuitecourier/pages/list/components/Header/style';
import Button from '@common_button';

const HeaderContent = () => {
    const classes = useStyles();
    const router = useRouter();
    return (
        <div className={classes.headerContainer}>
            <h2 className={classes.title}>Manage Netsuite Courier</h2>
            <Button className={classes.buttonAdd} onClick={() => router.push('/configurations/netsuitecourier/add')}>
                Add Netsuite Courier
            </Button>
        </div>
    );
};

export default HeaderContent;
