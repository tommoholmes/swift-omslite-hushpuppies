/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Button from '@common_button';
import { useRouter } from 'next/router';
import useStyles from '@modules/promotion/pages/list/components/Header/style';
import clsx from 'clsx';

const HeaderContent = (props) => {
    const classes = useStyles();
    const router = useRouter();
    return (
        <div className={classes.headerContainer}>
            <h2 className={classes.title}>Manage Request</h2>
            <Button
                className={classes.buttonAdd}
                onClick={() => router.push('/marketing/promotion/addnew')}
            >
                Add New
            </Button>
            <Button
                className={clsx(classes.buttonAdd, 'left')}
                onClick={() => router.push('/marketing/promotion/import')}
            >
                Import
            </Button>
        </div>
    );
};

export default HeaderContent;
