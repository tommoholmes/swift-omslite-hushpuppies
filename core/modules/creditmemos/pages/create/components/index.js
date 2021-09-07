/* eslint-disable no-unused-vars */
import React from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import clsx from 'clsx';
import useStyles from '@modules/creditmemos/pages/create/components/style';

const creditmemosCreateContent = (props) => {
    const {
        formik,
        creditmemoDetail,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push(`/sales/managerma/edit/${creditmemoDetail.id}`)}
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
                New Memo
                {' '}
                {creditmemoDetail.id}
            </h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <h5 className={classes.title}>Shipment & Order Information</h5>
                    <div className={clsx(classes.contentLeft, classes.contentRight)}>
                        <table className={classes.table}>
                            <tbody>
                                <tr className={classes.tr}>
                                    <td className={classes.td}>Order Date</td>
                                    <td className={classes.td}>{creditmemoDetail.orderDate}</td>
                                    <td />
                                    <td className={classes.td}>Customer Name</td>
                                    <td className={classes.td}>{creditmemoDetail.name}</td>
                                </tr>
                                <tr className={classes.tr}>
                                    <td className={classes.td}>Order Status</td>
                                    <td className={classes.td}>{creditmemoDetail.status}</td>
                                    <td />
                                    <td className={classes.td}>Email</td>
                                    <td className={classes.td}>{creditmemoDetail.email}</td>
                                </tr>
                                <tr className={classes.tr}>
                                    <td className={classes.td}>Channel Order</td>
                                    <td className={classes.td}>{creditmemoDetail.channelOrder}</td>
                                    <td />
                                    <td className={classes.td}>Customer Group</td>
                                    <td className={classes.td}>{creditmemoDetail.group}</td>
                                </tr>
                                <tr className={classes.tr}>
                                    <td className={classes.td}>Channel Name</td>
                                    <td className={classes.td}>{creditmemoDetail.channelName}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={classes.content}>
                    <div className={classes.contentLeft}>
                        <h5 className={classes.title}>Billing Address</h5>
                        <span className={classes.orderLabel}>
                            {creditmemoDetail.billing.firstname}
                            {' '}
                            {creditmemoDetail.billing.lastname}
                        </span>
                        <span className={classes.orderLabel}>
                            {creditmemoDetail.billing.street}
                        </span>
                        <span className={classes.orderLabel}>
                            {creditmemoDetail.billing.city}
                            ,
                            {creditmemoDetail.billing.region}
                            ,
                            {creditmemoDetail.billing.postcode}
                        </span>
                        <span className={classes.orderLabel}>
                            {creditmemoDetail.billing.country_id}
                        </span>
                        <span className={classes.orderLabel}>
                            {creditmemoDetail.billing.telephone}
                        </span>
                    </div>
                    <div className={classes.contentLeft}>
                        <h5 className={classes.title}>Shipping Adress</h5>
                        <span className={classes.orderLabel}>
                            {creditmemoDetail.shipping.firstname}
                            {' '}
                            {creditmemoDetail.shipping.lastname}
                        </span>
                        <span className={classes.orderLabel}>
                            {creditmemoDetail.shipping.street}
                        </span>
                        <span className={classes.orderLabel}>
                            {creditmemoDetail.shipping.city}
                            ,
                            {creditmemoDetail.shipping.region}
                            ,
                            {creditmemoDetail.shipping.postcode}
                        </span>
                        <span className={classes.orderLabel}>
                            {creditmemoDetail.shipping.country_id}
                        </span>
                        <span className={classes.orderLabel}>
                            {creditmemoDetail.shipping.telephone}
                        </span>
                    </div>
                </div>
                <div className={classes.content}>
                    <div className={classes.contentLeft}>
                        <h5 className={clsx(classes.title, 'title-information')}>Payment Information</h5>
                        <span className={classes.orderLabel}>{creditmemoDetail.paymentMethod}</span>
                        <span className={classes.orderLabel}>The order was placed using IDR.</span>
                    </div>
                    <div className={classes.contentLeft}>
                        <h5 className={clsx(classes.title, 'title-information')}>Shipping Information</h5>
                        <span className={classes.orderLabel}>{creditmemoDetail.shippingMethod}</span>
                        <span className={classes.orderLabel}>
                            Total Shipping Charges: IDR
                            {creditmemoDetail.shippingAmount}
                        </span>
                    </div>
                </div>
                <div className={classes.content}>
                    <h5 className={classes.title}>Items Refunded</h5>
                    <table className={classes.table}>
                        <tbody>
                            <tr className={classes.tr}>
                                <th className={classes.th}>Product</th>
                                <th className={classes.th}>Price</th>
                                <th className={classes.th}>Qty</th>
                                <th className={classes.th}>Qty to Refund</th>
                                <th className={classes.th}>Subtotal</th>
                                <th className={classes.th}>Tax Amount</th>
                                <th className={classes.th}>Discount Amount</th>
                                <th className={classes.th}>Row Total</th>
                            </tr>
                            {creditmemoDetail.item.map((e) => (
                                <tr>
                                    <td className={classes.td}>
                                        {e.name}
                                        {' '}
                                        <br />
                                        SKU:
                                        {' '}
                                        {e.sku}
                                    </td>
                                    <td className={classes.td}>{e.price}</td>
                                    <td className={classes.td}>
                                        Ordered:
                                        {' '}
                                        {e.qty_detail.qty_ordered}
                                        <br />
                                        Invoiced:
                                        {' '}
                                        {e.qty_detail.qty_invoiced}
                                        <br />
                                        Shipped:
                                        {' '}
                                        {e.qty_detail.qty_shipped}
                                        <br />
                                        Refunded:
                                        {' '}
                                        {e.qty_detail.qty_refunded}
                                        <br />
                                        Canceled:
                                        {' '}
                                        {e.qty_detail.qty_canceled}
                                    </td>
                                    <td className={classes.td}>{e.qty}</td>
                                    <td className={classes.td}>{e.base_row_total}</td>
                                    <td className={classes.td}>{e.base_tax_amount || 0}</td>
                                    <td className={classes.td}>{e.base_discount_amount || 0}</td>
                                    <td className={classes.td}>{e.row_total}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className={classes.content}>
                    <h5 className={classes.title}>Order Total</h5>
                    <table className={classes.table}>
                        <tbody>
                            <tr className={classes.tr}>
                                <th className={classes.th}>Refund Totals</th>
                            </tr>
                            <tr>
                                <td className={classes.td}>Subtotal</td>
                                <td className={classes.td}>
                                    IDR
                                    {''}
                                    {creditmemoDetail.subtotal}
                                </td>
                            </tr>
                            <tr>
                                <td className={classes.td}>Discount</td>
                                <td className={classes.td}>
                                    IDR
                                    {''}
                                    {creditmemoDetail.discount}
                                </td>
                            </tr>
                            <tr>
                                <td className={classes.td}>Refund Shipping</td>
                                <td className={classes.td}>
                                    <TextField
                                        className={classes.fieldRoot}
                                        variant="outlined"
                                        name="refundShip"
                                        value={formik.values.refundShip}
                                        onChange={formik.handleChange}
                                        error={!!(formik.touched.refundShip && formik.errors.refundShip)}
                                        helperText={(formik.touched.refundShip && formik.errors.refundShip) || ''}
                                        InputProps={{
                                            className: classes.fieldInput,
                                        }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className={classes.td}>Adjusment Refund</td>
                                <td className={classes.td}>
                                    <TextField
                                        className={classes.fieldRoot}
                                        variant="outlined"
                                        name="adjustRefund"
                                        value={formik.values.adjustRefund}
                                        onChange={formik.handleChange}
                                        error={!!(formik.touched.adjustRefund && formik.errors.adjustRefund)}
                                        helperText={(formik.touched.adjustRefund && formik.errors.adjustRefund) || ''}
                                        InputProps={{
                                            className: classes.fieldInput,
                                        }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className={classes.td}>Adjusment Fee</td>
                                <td className={classes.td}>
                                    <TextField
                                        className={classes.fieldRoot}
                                        variant="outlined"
                                        name="adjustFee"
                                        value={formik.values.adjustFee}
                                        onChange={formik.handleChange}
                                        error={!!(formik.touched.adjustFee && formik.errors.adjustFee)}
                                        helperText={(formik.touched.adjustFee && formik.errors.adjustFee) || ''}
                                        InputProps={{
                                            className: classes.fieldInput,
                                        }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className={clsx(classes.td, classes.th)}>Grand Total</td>
                                <td className={clsx(classes.td, classes.th)}>
                                    IDR
                                    {''}
                                    {creditmemoDetail.grandTotal}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className={classes.content}>
                    <div className={classes.formFieldButton}>
                        <Button
                            className={classes.btn}
                            onClick={formik.handleSubmit}
                            variant="contained"
                        >
                            Submit
                        </Button>
                    </div>
                </div>
            </Paper>
        </>
    );
};

export default creditmemosCreateContent;
