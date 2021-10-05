import React from 'react';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import useStyles from '@modules/wavelist/pages/pickitem/components/style';

const BatchListPickListContent = (props) => {
    const {
        itemProps,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    return (
        <div className={classes.container}>
            <Paper className={classes.paper}>
                <div className={classes.section}>
                    <h5 className={classes.name}>
                        {itemProps.name}
                    </h5>
                    <p className={classes.text}>
                        {`SKU ${itemProps.sku}`}
                    </p>
                    <p className={classes.text}>
                        {`Loc ${itemProps.location}`}
                    </p>
                </div>
                <div className={classes.divider} />
                <div className={classes.imgContainer}>
                    {itemProps.image
                        ? <img src={itemProps.image} className={classes.img} alt="item-preview" />
                        : <div className={classes.emptyImg} />}
                </div>
                <div className={classes.divider} />
                <div className={classes.section}>
                    <p className={classes.text}>
                        Qty item to pick
                    </p>
                    <p className={classes.qty}>
                        {itemProps.qty}
                    </p>
                    <p className={classes.text}>
                        put picked items in
                    </p>
                    <p className={classes.qty}>
                        {`Slot ${itemProps.slot}`}
                    </p>
                </div>
                <div className={classes.divider} />
                <div className={classes.section}>
                    <Button
                        className={classes.btn}
                        onClick={() => router.push(`/pickpack/wavelist/picklist/item/scan/${itemProps.id}`)}
                        buttonType="primary-rounded"
                    >
                        Scan
                    </Button>
                </div>
                <div className={classes.divider} />
                <div className={classes.section}>
                    <a className={classes.back} href={`/pickpack/wavelist/picklist/${itemProps.parentId}`}>
                        Back to Pick List
                    </a>
                </div>
            </Paper>
        </div>
    );
};

export default BatchListPickListContent;
