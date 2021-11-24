import React from 'react';
import Button from '@common_button';
import { useRouter } from 'next/router';
import useStyles from '@modules/orderqueue/pages/list/components/Header/style';

const HeaderContent = () => {
    const classes = useStyles();
    const router = useRouter();
    return (
        <div className={classes.headerContainer}>
            <h2 className={classes.title}>Product Assembly</h2>
            <Button
                className={classes.buttonAdd}
                onClick={() => router.push('/product/productassembly/import')}
            >
                Import Product Assembly
            </Button>
        </div>
    );
};

export default HeaderContent;
