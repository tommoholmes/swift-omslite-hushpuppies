/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import useStyles from '@modules/irispayoutapproval/pages/list/components/Header/style';

const HeaderContent = () => {
    const classes = useStyles();
    return (
        <div className={classes.headerContainer}>
            <h2 className={classes.title}>Iris Payout Approval</h2>
        </div>
    );
};

export default HeaderContent;
