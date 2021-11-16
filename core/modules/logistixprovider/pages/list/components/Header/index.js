/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Button from '@common_button';
import { useRouter } from 'next/router';
import useStyles from '@modules/logistixprovider/pages/list/components/Header/style';

const HeaderContent = () => {
    const classes = useStyles();
    const router = useRouter();
    return (
        <div className={classes.headerContainer}>
            <h2 className={classes.title}>Logistix Provider</h2>
            <Button
                className={classes.buttonAdd}
                onClick={() => router.push('/configurations/logistixprovider/addnew')}
            >
                Add Logistix Provider
            </Button>
        </div>
    );
};

export default HeaderContent;
