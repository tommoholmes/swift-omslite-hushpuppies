/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Button from '@common_button';
import { useRouter } from 'next/router';
import useStyles from '@modules/productlist/pages/list/components/Header/style';

const HeaderContent = (props) => {
    const classes = useStyles();
    const router = useRouter();
    const { handleFetchManual } = props;

    return (
        <div className={classes.headerContainer}>
            <h2 className={classes.title}>Product List</h2>
            <Button
                className={classes.buttonAdd}
                onClick={() => router.push('/product/productlist/create')}
            >
                Create
            </Button>
            <Button
                className={classes.buttonAdd}
                onClick={() => router.push('/product/productlist/import')}
                style={{ marginRight: 10 }}
            >
                Upload
            </Button>
            <Button
                className={classes.buttonAdd}
                onClick={handleFetchManual}
                style={{ marginRight: 10 }}
            >
                Pull From Marketplace
            </Button>
        </div>
    );
};

export default HeaderContent;
