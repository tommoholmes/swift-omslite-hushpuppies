import React from 'react';
import useStyles from '@modules/batchpack/pages/list/components/Header/style';

const HeaderContent = () => {
    const classes = useStyles();
    return (
        <div className={classes.headerContainer}>
            <h2 className={classes.title}>Pack List</h2>
        </div>
    );
};

export default HeaderContent;
