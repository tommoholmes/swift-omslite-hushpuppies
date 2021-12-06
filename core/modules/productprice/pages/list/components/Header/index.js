/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Button from '@common_button';
import { useRouter } from 'next/router';
import useStyles from '@modules/productprice/pages/list/components/Header/style';

const HeaderContent = () => {
    const classes = useStyles();
    const router = useRouter();
    return (
        <div className={classes.headerContainer}>
            <h2 className={classes.title}>Marketplace Product Price</h2>
            <Button
                className={classes.buttonAdd}
                onClick={() => router.push('/marketplace/productprice/import')}
            >
                Import
            </Button>
        </div>
    );
};

export default HeaderContent;
