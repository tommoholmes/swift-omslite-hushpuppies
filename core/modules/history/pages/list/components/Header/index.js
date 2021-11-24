/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import useStyles from '@modules/history/pages/list/components/Header/style';

const HeaderContent = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.headerContainer}>
            <h2 className={classes.title}>Update Stock History</h2>
        </div>
    );
};

export default HeaderContent;
