/* eslint-disable no-unused-vars */
import React from 'react';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import clsx from 'clsx';
import useStyles from '@modules/shipment/pages/edit/components/style';

const shipmentEditContent = (props) => {
    const {
        shipmentDetail,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push('/sales/shipment')}
                variant="contained"
                style={{ marginRight: 16 }}
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
            <h2 className={classes.titleTop}>
                Detail Shipment #
                {shipmentDetail.id}
            </h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <h5 className={classes.title}>Shipment & Order Information</h5>
                    <div className={clsx(classes.contentLeft, classes.contentRight)}>
                        <table className={classes.table}>
                            <tbody>
                                <tr className={classes.tr}>
                                    <td className={classes.td}>Ship From</td>
                                    <td className={classes.td}>{shipmentDetail.locName}</td>
                                    <td />
                                    <td className={classes.td}>Order Date</td>
                                    <td className={classes.td}>{shipmentDetail.orderDate}</td>
                                </tr>
                                <tr className={classes.tr}>
                                    <td className={classes.td}>Last Update</td>
                                    <td className={classes.td}>{shipmentDetail.lastUpdate}</td>
                                    <td />
                                    <td className={classes.td}>Channel Order Number</td>
                                    <td className={classes.td}>{shipmentDetail.channelOrderNumber}</td>
                                </tr>
                                <tr className={classes.tr}>
                                    <td className={classes.td}>Status</td>
                                    <td className={classes.td}>{shipmentDetail.status}</td>
                                    <td />
                                    <td className={classes.td}>Email</td>
                                    <td className={classes.td}>{shipmentDetail.email}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={classes.content}>
                    <div className={classes.contentLeft}>
                        <h5 className={classes.title}>Billing Address</h5>
                        <span className={classes.orderLabel}>
                            {`${shipmentDetail.billing.firstname} ${shipmentDetail.billing.lastname}`}
                        </span>
                        <span className={classes.orderLabel}>
                            {shipmentDetail.billing.street}
                        </span>
                        <span className={classes.orderLabel}>
                            {`${shipmentDetail.billing.city}, ${shipmentDetail.billing.region}, ${shipmentDetail.billing.postcode}`}
                        </span>
                        <span className={classes.orderLabel}>
                            {shipmentDetail.billing.country_id}
                        </span>
                        <span className={classes.orderLabel}>
                            {shipmentDetail.billing.telephone}
                        </span>
                    </div>
                    <div className={classes.contentLeft}>
                        <h5 className={classes.title}>Shipping Adress</h5>
                        <span className={classes.orderLabel}>
                            {`${shipmentDetail.shipping.firstname} ${shipmentDetail.shipping.lastname}`}
                        </span>
                        <span className={classes.orderLabel}>
                            {shipmentDetail.shipping.street}
                        </span>
                        <span className={classes.orderLabel}>
                            {`${shipmentDetail.shipping.city}, ${shipmentDetail.shipping.region}, ${shipmentDetail.shipping.postcode}`}
                        </span>
                        <span className={classes.orderLabel}>
                            {shipmentDetail.shipping.country_id}
                        </span>
                        <span className={classes.orderLabel}>
                            {shipmentDetail.shipping.telephone}
                        </span>
                    </div>
                </div>
                <div className={classes.content}>
                    <h5 className={classes.title}>Items Shipped</h5>
                    <table className={classes.table}>
                        <tbody>
                            <tr className={classes.tr}>
                                <th className={classes.th}>SKU</th>
                                <th className={classes.th}>Name</th>
                                <th className={classes.th}>Unit Price</th>
                                <th className={classes.th}>QTY</th>
                            </tr>
                            {shipmentDetail.orderItem.length ? shipmentDetail.orderItem.map((e) => (
                                <tr>
                                    <td className={classes.td}>{e.sku}</td>
                                    <td className={classes.td}>{e.name}</td>
                                    <td className={classes.td}>{e.price}</td>
                                    <td className={classes.td}>{e.qty}</td>
                                </tr>
                            ))
                                : (
                                    <tr>
                                        <td className={classes.td}>-</td>
                                        <td className={classes.td}>-</td>
                                        <td className={classes.td}>-</td>
                                        <td className={classes.td}>-</td>
                                    </tr>
                                )}
                        </tbody>
                    </table>
                </div>
                <div className={classes.content}>
                    <h5 className={classes.title}>Shipping & Tracking Information</h5>
                    <span className={classes.orderLabel} style={{ fontSize: 24, marginTop: 20 }}>
                        Shipping Method:
                        {shipmentDetail.shipMethod}
                    </span>
                    <table className={classes.table}>
                        <tbody>
                            <tr className={classes.tr}>
                                <th className={classes.th}>Date</th>
                                <th className={classes.th}>Courier</th>
                                <th className={classes.th}>Name</th>
                                <th className={classes.th}>Tracking Number</th>
                            </tr>
                            {shipmentDetail.tracking.length ? shipmentDetail.tracking.map((e) => (
                                <tr>
                                    <td className={classes.td}>{e.created_at}</td>
                                    <td className={classes.td}>{e.description || '-'}</td>
                                    <td className={classes.td}>{e.title}</td>
                                    <td className={classes.td}>{e.track_number}</td>
                                </tr>
                            ))
                                : (
                                    <tr>
                                        <td className={classes.td}>-</td>
                                        <td className={classes.td}>-</td>
                                        <td className={classes.td}>-</td>
                                        <td className={classes.td}>-</td>
                                    </tr>
                                )}
                        </tbody>
                    </table>
                </div>
                <div className={classes.content}>
                    <h5 className={classes.title}>Status history</h5>
                    <table className={classes.table}>
                        <tbody>
                            <tr className={classes.tr}>
                                <th className={classes.th}>Date</th>
                                <th className={classes.th}>Status</th>
                                <th className={classes.th}>Note</th>
                            </tr>
                            {shipmentDetail.statusHistory.length ? shipmentDetail.statusHistory.map((e) => (
                                <tr>
                                    <td className={classes.td}>{e.created_at}</td>
                                    <td className={classes.td}>{e.status}</td>
                                    <td className={classes.td}>{e.comment}</td>
                                </tr>
                            ))
                                : (
                                    <tr>
                                        <td className={classes.td}>-</td>
                                        <td className={classes.td}>-</td>
                                        <td className={classes.td}>-</td>
                                        <td className={classes.td}>-</td>
                                    </tr>
                                )}
                        </tbody>
                    </table>
                </div>
            </Paper>
        </>
    );
};

export default shipmentEditContent;