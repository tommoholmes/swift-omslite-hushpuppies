/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Button from '@common_button';
import { useRouter } from 'next/router';
import useStyles from '@modules/locationpriceupload/pages/list/components/Header/style';

const HeaderContent = (props) => {
    const classes = useStyles();
    const router = useRouter();
    return (
        <div className={classes.headerContainer}>
            <h2 className={classes.title}>Manage Price By Location</h2>
            <a>
                <Button className={classes.buttonAdd} onClick={() => router.push('/cataloginventory/locationpriceupload/import')}>
                    Upload Price
                </Button>
            </a>
        </div>
    );
};

export default HeaderContent;
