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
            <h2 className={classes.title}>Manage CLI Tools</h2>
            {/* <Button
                className={classes.buttonAdd}
                onClick={() => router.push('/oms/company/create')}
            >
                Create Company
            </Button> */}
        </div>
    );
};

export default HeaderContent;
