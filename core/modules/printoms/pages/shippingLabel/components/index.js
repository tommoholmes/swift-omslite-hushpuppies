/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import useStyles from '@modules/printoms/pages/shippingLabel/components/style';

const PrintPickContent = (props) => {
    const {
        shippingLabel,
    } = props;
    const classes = useStyles();
    const [show, setShow] = useState('non-hide');

    return (
        <>
            {(shippingLabel.length) && (
                <>
                    <div className={classes.containerBtn}>
                        <div className={classes.content}>
                            <Button
                                onClick={() => {
                                    setShow('hide');
                                    setTimeout(() => {
                                        window.print();
                                    }, 100);
                                    setTimeout(() => {
                                        setShow('non-hide');
                                    }, 1000);
                                }}
                                className={show}
                            >
                                Print
                            </Button>
                        </div>
                    </div>
                    <Paper className={classes.container}>
                        {shippingLabel.map((eParent) => (
                            <div style={{ marginBottom: 10 }}>
                                <div className={clsx(classes.content, classes.contentImg)}>
                                    {eParent.store_logo_url
                                        && <img className="imgIcon" alt="" src={eParent.store_logo_url} />}
                                    <span>{eParent.shipping_method}</span>
                                </div>
                                <div className={clsx(classes.content2, classes.wrapperColumn, 'borderTop')}>
                                    <div className="column">
                                        <h5 className={classes.barcodeContainer}>
                                            {eParent.order_number_barcode_url
                                                && <img alt="barcode order" src={eParent.order_number_barcode_url} style={{ maxWidth: '80%' }} />}
                                            <br />
                                            {`Order Number : ${eParent.order_number || '-'}`}
                                        </h5>
                                    </div>
                                    <div className="column">
                                        <h5 className={classes.barcodeContainer}>
                                            {eParent.track_number_barcode_url
                                                && <img alt="barcode order" src={eParent.track_number_barcode_url} style={{ maxWidth: '80%' }} />}
                                            <br />
                                            {`Airway Bill : ${eParent.track_number || '-'}`}
                                        </h5>
                                    </div>
                                </div>

                                <div className={clsx(classes.content2, classes.wrapperColumn, 'borderTop', 'borderBottom')}>
                                    <div className="column">
                                        <h5 className={classes.descName}>
                                            <span>{`Ship To : ${eParent.shipping_address.firstname} ${eParent.shipping_address.lastname}`}</span>
                                        </h5>
                                        {eParent.shipping_address.street}
                                        <br />
                                        {eParent.shipping_address.city}
                                        <br />
                                        {`${eParent.shipping_address.region}, ${eParent.shipping_address.postcode}`}
                                        <br />
                                        {eParent.shipping_address.country_name}
                                    </div>
                                    <div className="column">
                                        <h5 className={classes.descName}>
                                            <span>{`Seller : ${eParent.store.name}`}</span>
                                        </h5>
                                        {eParent.store.street}
                                        <br />
                                        {eParent.store.city}
                                        <br />
                                        {`${eParent.store.region}, ${eParent.store.post_code}`}
                                        <br />
                                        {eParent.store.country}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Paper>
                </>
            )}
        </>
    );
};

export default PrintPickContent;
