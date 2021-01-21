/* eslint-disable no-unused-vars */
import React from 'react';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import clsx from 'clsx';
import useStyles from './style';

const OrderQueueEditContent = (props) => {
    const {
        formikAllocation,
        formikNew,
        orderQueue,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push('/sales/orderqueue')}
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
            <h2 className={classes.titleTop}>Detail Order Queue</h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <h5 className={classes.title}>Order & Account Information</h5>
                    <div className={clsx(classes.contentLeft, classes.contentRight)}>
                        <table className={classes.table}>
                            <tbody>
                                <tr className={classes.tr}>
                                    <td className={classes.td}>Order Date</td>
                                    <td className={classes.td}>{orderQueue.lastUpdated}</td>
                                    <td />
                                    <td className={classes.td}>Customer Name</td>
                                    <td className={classes.td}>
                                        {orderQueue.firstnameShip}
                                        {' '}
                                        {orderQueue.lastnameShip}
                                    </td>
                                </tr>
                                <tr className={classes.tr}>
                                    <td className={classes.td}>Order Status</td>
                                    {(orderQueue.status === 'failed') ? (
                                        <>
                                            {(orderQueue.errorLog === 'Allocation not found') ? (
                                                <td className={classes.td}>
                                                    <Button
                                                        className={classes.btn}
                                                        onClick={formikAllocation.handleSubmit}
                                                        variant="contained"
                                                    >
                                                        Set As Reallocation
                                                    </Button>
                                                </td>
                                            ) : (
                                                <td className={classes.td}>
                                                    <Button
                                                        className={classes.btn}
                                                        onClick={formikNew.handleSubmit}
                                                        variant="contained"
                                                    >
                                                        set as new
                                                    </Button>
                                                </td>
                                            )}
                                        </>
                                    ) : (
                                        <td className={classes.td}>{orderQueue.status}</td>
                                    )}
                                    <td />
                                    <td className={classes.td}>Email</td>
                                    <td className={classes.td}>{orderQueue.email}</td>
                                </tr>
                                <tr className={classes.tr}>
                                    <td className={classes.td}>Channel Order ID</td>
                                    <td className={classes.td}>{orderQueue.channelOrderId}</td>
                                    <td />
                                    <td className={classes.td} />
                                    <td className={classes.td}>(The order confirmation email is not sent)</td>
                                </tr>
                                <tr className={classes.tr}>
                                    <td className={classes.td}>Channel Name</td>
                                    <td className={classes.td}>{orderQueue.channelCode}</td>
                                    <td />
                                    <td className={classes.td}>Customer Group</td>
                                    <td className={classes.td}>{orderQueue.customerGroup}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={classes.content}>
                    <div className={classes.contentLeft}>
                        <h5 className={classes.title}>Billing Address</h5>
                        <span className={classes.orderLabel}>
                            {orderQueue.firstname}
                            {' '}
                            {orderQueue.lastname}
                        </span>
                        <span className={classes.orderLabel}>{orderQueue.street}</span>
                        <span className={classes.orderLabel}>
                            {orderQueue.city}
                            ,
                            {' '}
                            {orderQueue.region}
                            ,
                            {' '}
                            {orderQueue.postcode}
                        </span>
                        <span className={classes.orderLabel}>{orderQueue.countryId}</span>
                        <span className={classes.orderLabel}>{orderQueue.telephone}</span>
                    </div>
                    <div className={classes.contentLeft}>
                        <h5 className={classes.title}>Shipping Adress</h5>
                        <span className={classes.orderLabel}>{orderQueue.firstnameShip}</span>
                        <span className={classes.orderLabel}>{orderQueue.streetShip}</span>
                        <span className={classes.orderLabel}>
                            {orderQueue.cityShip}
                            ,
                            {' '}
                            {orderQueue.regionShip}
                            ,
                            {' '}
                            {orderQueue.postcodeShip}
                        </span>
                        <span className={classes.orderLabel}>{orderQueue.countryIdShip}</span>
                        <span className={classes.orderLabel}>{orderQueue.telephoneShip}</span>
                    </div>
                </div>
                <div className={classes.content}>
                    <div className={classes.contentLeft}>
                        <h5 className={clsx(classes.title, 'title-information')}>Payment Information</h5>
                        <span className={classes.orderLabel}>{orderQueue.channelPaymentMethod}</span>
                    </div>
                    <div className={classes.contentLeft}>
                        <h5 className={clsx(classes.title, 'title-information')}>Shipping & Handling Information</h5>
                        <span className={classes.orderLabel}>{orderQueue.channelShippingMethod}</span>
                    </div>
                </div>
                <div className={classes.content}>
                    <h5 className={classes.title}>Items Ordered</h5>
                    <table className={classes.table}>
                        <tbody>
                            <tr className={classes.tr}>
                                <th className={classes.th}>SKU Product</th>
                                <th className={classes.th}>Base Price</th>
                                <th className={classes.th}>Sell Price</th>
                                <th className={classes.th}>QTY</th>
                                <th className={classes.th}>Discount Amount</th>
                                <th className={classes.th}>Location Code</th>
                            </tr>
                            {orderQueue.orderItem.map((e) => (
                                <tr>
                                    <td className={classes.td}>{e.sku}</td>
                                    <td className={classes.td}>{e.base_price}</td>
                                    <td className={classes.td}>{e.sell_price}</td>
                                    <td className={classes.td}>{e.qty}</td>
                                    <td className={classes.td}>{e.discount_amount}</td>
                                    <td className={classes.td}>{e.loc_code}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className={classes.content}>
                    <div className={classes.contentLeft}>
                        <h5 className={classes.title}>Notes for this Order</h5>
                        <span className={classes.orderLabel}>This is my note for delivery (contoh)</span>
                        <br />
                    </div>
                    <div className={classes.contentLeft}>
                        <h5 className={classes.title}>Order Totals</h5>
                        <span className={classes.orderLabel}>Grand Total</span>
                        <span className={classes.grandTotal}>
                            {' '}
                            {orderQueue.grandTotal}
                        </span>
                    </div>
                </div>
            </Paper>
        </>
    );
};

export default OrderQueueEditContent;
