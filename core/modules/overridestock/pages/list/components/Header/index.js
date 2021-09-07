/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Button from '@common_button';
import { useRouter } from 'next/router';
import useStyles from '@modules/overridestock/pages/list/components/Header/style';

const HeaderContent = (props) => {
    const classes = useStyles();
    const router = useRouter();
    return (
        <div className={classes.headerContainer}>
            <h2 className={classes.title}>Manage Override Stock</h2>
            <Button
                className={classes.buttonAdd}
                onClick={() => router.push('/cataloginventory/overridestock/create')}
            >
                Add New
            </Button>
            <Button
                className={classes.buttonAdd}
                onClick={() => router.push('/cataloginventory/overridestock/sync')}
            >
                Sync Stock to MP
            </Button>
            <Button
                className={classes.buttonAdd}
                onClick={() => router.push('/cataloginventory/overridestock/import')}
            >
                Import Stock
            </Button>
        </div>
    );
};

export default HeaderContent;
