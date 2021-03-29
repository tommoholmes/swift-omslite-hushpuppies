/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Button from '@common_button';
import { useRouter } from 'next/router';
import useStyles from './style';

const HeaderContent = (props) => {
    const classes = useStyles();
    const router = useRouter();
    return (
        <div className={classes.headerContainer}>
            <h2 className={classes.title}>Marketplace Product Category</h2>
            <Button
                className={classes.buttonAdd}
                onClick={() => router.push('/marketplace/productcategory/pull')}
            >
                Pull Categories
            </Button>
            <Button
                className={classes.buttonAdd}
                onClick={() => router.push('/marketplace/productcategory/update')}
            >
                Update Status
            </Button>
        </div>
    );
};

export default HeaderContent;
