/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Button from '@common_button';
import { useRouter } from 'next/router';
import useStyles from '@modules/orderqueue/pages/filteredlist/components/Header/style';

const HeaderContent = ({ showBulkButton = false }) => {
    const classes = useStyles();
    const router = useRouter();
    return (
        <div className={classes.headerContainer}>
            <h2 className={classes.title}>Manage Order Queue</h2>
            {/* <Button
                className={classes.buttonAdd}
                onClick={() => router.push('/sales/orderqueue/create')}
            >
                Create Sales Channel
            </Button> */}
            {showBulkButton
            && (
                <Button
                    className={classes.buttonAdd}
                    onClick={() => router.push('/sales/failed/import')}
                >
                    Bulk Reallocation
                </Button>
            )}
        </div>
    );
};

export default HeaderContent;
