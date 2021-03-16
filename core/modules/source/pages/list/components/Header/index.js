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
            <h2 className={classes.title}>Manage Source</h2>
            <Button
                className={classes.buttonAdd}
                onClick={() => router.push('/cataloginventory/source/importdata')}
            >
                Create Source
            </Button>
            <Button
                className={classes.buttonAdd}
                onClick={() => router.push('/cataloginventory/source/import')}
            >
                Import
            </Button>
            <Button
                className={classes.buttonAdd}
                onClick={() => router.push('/cataloginventory/source/export')}
            >
                Export
            </Button>
        </div>
    );
};

export default HeaderContent;
