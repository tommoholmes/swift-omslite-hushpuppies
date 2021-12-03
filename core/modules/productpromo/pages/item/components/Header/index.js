/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import { useRouter } from 'next/router';
import Button from '@common_button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import useStyles from '@modules/productpromo/pages/item/components/Header/style';

const HeaderContent = (props) => {
    const classes = useStyles();
    const router = useRouter();
    return (
        <div className={classes.headerContainer}>
            <Button
                className={classes.btnBack}
                onClick={() => router.push('/marketplace/productpromo')}
                variant="contained"
                style={{ marginRight: 10 }}
            >
                <ChevronLeftIcon style={{
                    fontSize: 30,
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
                />
            </Button>
            <h2 className={classes.title}>Marketplace Product Promo Item</h2>
        </div>
    );
};

export default HeaderContent;
