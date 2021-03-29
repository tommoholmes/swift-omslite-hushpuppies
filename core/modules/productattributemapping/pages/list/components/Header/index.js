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
            <h2 className={classes.title}>Marketplace Product Attribute Mapping</h2>
            <div className={classes.headerContainer}>
                <Button
                    className={classes.buttonAdd}
                    onClick={() => router.push('/marketplace/productattributemapping/add')}
                >
                    Add New Mapping
                </Button>
                <Button
                    className={classes.buttonAdd}
                    onClick={() => router.push('/marketplace/productattributemapping/export')}
                >
                    Export Marketplace Product Attributes
                </Button>
                <Button
                    className={classes.buttonAdd}
                    onClick={() => router.push('/marketplace/productattributemapping/import')}
                >
                    Import Mapping
                </Button>
            </div>
        </div>
    );
};

export default HeaderContent;
