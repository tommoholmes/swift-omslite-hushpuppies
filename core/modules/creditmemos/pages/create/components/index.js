/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import React from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import clsx from 'clsx';
import useStyles from '@modules/creditmemos/pages/create/components/style';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const creditmemosCreateContent = (props) => {
    const {
        formik,
        creditmemoDetail,
        parentId,
        grandTotal,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    const getClassByStatus = (status) => {
        if (status === 'failed') {
            return classes.statusFailed;
        }
        if (status === 'new') {
            return classes.statusProcessing;
        }
        if (status === 'success') {
            return classes.statusSuccess;
        }
        if (status === 'closed') {
            return classes.statusClosed;
        }
        if (status === 'allocating') {
            return classes.statusAllocating;
        }
        return classes.statusSuccess;
    };

    const iconFilter = (channel_code) => {
        if (channel_code) {
            if (channel_code.toLowerCase().includes('swi')) {
                return '/assets/img/dashboard/channel_official.png';
            }
            if (channel_code.toLowerCase().includes('bklp')) {
                return '/assets/img/dashboard/channel_bukalapak.svg';
            }
            if (channel_code.toLowerCase().includes('blib')) {
                return '/assets/img/dashboard/channel_blibli.png';
            }
            if (channel_code.toLowerCase().includes('jdid')) {
                return '/assets/img/dashboard/channel_jd.png';
            }
            if (channel_code.toLowerCase().includes('lzda')) {
                return '/assets/img/dashboard/channel_lazada.png';
            }
            if (channel_code.toLowerCase().includes('shpe')) {
                return '/assets/img/dashboard/channel_shopee.png';
            }
            if (channel_code.toLowerCase().includes('srcl')) {
                return '/assets/img/dashboard/channel_sirclo.png';
            }
            if (channel_code.toLowerCase().includes('tkpd')) {
                return '/assets/img/dashboard/channel_tokopedia.png';
            }
            if (channel_code.toLowerCase().includes('zlra')) {
                return '/assets/img/dashboard/channel_zalora.png';
            }
            return `/assets/img/dashboard/${channel_code}.png`;
        }
        return null;
    };

    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push(`/sales/managerma/edit/${parentId}`)}
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
                #
                {creditmemoDetail.entityId}
            </h2>
            <Paper className={classes.container}>
                <div className={classes.contentHeader}>
                    <div className="divHeader">
                        <div className={getClassByStatus(creditmemoDetail.status)}>
                            {creditmemoDetail.status}
                        </div>
                    </div>
                    <div className="divHeader">
                        <h5 className="titleHeaderWithIcon">
                            <img
                                src={iconFilter(creditmemoDetail.channelCode)}
                                alt=""
                                className="iconHeader"
                                onError={(event) => event.target.style.display = 'none'}
                            />
                            {creditmemoDetail.channelName}
                        </h5>
                    </div>
                    <div className="divHeader">
                        <h5 className="titleHeader">
                            Channel Order Number
                        </h5>
                        <span className="spanHeader">{creditmemoDetail.orderNumber}</span>
                    </div>
                    <div className="divHeader">
                        <h5 className="titleHeader">
                            Channel Order Date
                        </h5>
                        <span className="spanHeader">{creditmemoDetail.orderDate}</span>
                    </div>
                </div>

                <div className={classes.content}>
                    <div className={classes.grid}>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>Customer Info</h5>
                            <span className={classes.orderLabel}>
                                <img className="imgIcon" alt="" src="/assets/img/icon_user.png" />
                                {creditmemoDetail.customerName}
                            </span>
                            <span className={classes.orderLabel}>
                                <img className="imgIcon" alt="" src="/assets/img/icon_email.png" />
                                {creditmemoDetail.customerEmail}
                            </span>
                            <span className={classes.orderLabel}>
                                <img className="imgIcon" alt="" src="/assets/img/icon_phone.png" />
                                {creditmemoDetail.billing.telephone}
                            </span>
                        </div>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>Billing Address</h5>
                            <span className={classes.orderLabel}>{creditmemoDetail.billing.street}</span>
                            <span className={classes.orderLabel}>{creditmemoDetail.billing.city}</span>
                            <span className={classes.orderLabel}>
                                {`${creditmemoDetail.billing.region}, 
                                ${creditmemoDetail.billing.postcode}, ${creditmemoDetail.billing.country_name}`}
                            </span>
                        </div>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>Shipping Address</h5>
                            <span className={classes.orderLabel}>{creditmemoDetail.shipping.street}</span>
                            <span className={classes.orderLabel}>{creditmemoDetail.shipping.city}</span>
                            <span className={classes.orderLabel}>
                                {`${creditmemoDetail.shipping.region},
                                ${creditmemoDetail.shipping.postcode}, ${creditmemoDetail.shipping.country_name}`}
                            </span>
                        </div>
                    </div>
                    <br />
                    <div className={classes.grid}>
                        <div className="grid-child" />
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>Payment Method</h5>
                            <span className={classes.orderLabel}>{creditmemoDetail.paymentMethod}</span>
                        </div>
                        <div className="grid-child">
                            <h5 className={classes.titleSmall}>Shipping Method</h5>
                            <span className={classes.orderLabel}>{creditmemoDetail.shippingMethod}</span>
                        </div>
                    </div>
                    <br />
                </div>
                <div className={classes.content}>
                    <h5 className={classes.titleSmall}>Items To Refund</h5>
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
                            {creditmemoDetail.items?.map((e) => (
                                <tr>
                                    <td className={classes.td}>
                                        {e.name}
                                        <br />
                                        SKU:
                                        {' '}
                                        {e.sku}
                                    </td>
                                    <td className={classes.td}>{e.price}</td>
                                    <td className={classes.td}>
                                        {e.order_item.qty_ordered > 0
                                            && (
                                                <>
                                                    Ordered:
                                                    {' '}
                                                    {e.order_item.qty_ordered}
                                                    <br />
                                                </>
                                            )}
                                        {e.order_item.qty_invoiced > 0
                                            && (
                                                <>
                                                    Invoiced:
                                                    {' '}
                                                    {e.order_item.qty_invoiced}
                                                    <br />
                                                </>
                                            )}
                                        {e.order_item.qty_shipped > 0
                                            && (
                                                <>
                                                    Shipped:
                                                    {' '}
                                                    {e.order_item.qty_shipped}
                                                    <br />
                                                </>
                                            )}
                                        {e.order_item.qty_refunded > 0
                                            && (
                                                <>
                                                    Refunded:
                                                    {' '}
                                                    {e.order_item.qty_refunded}
                                                    <br />
                                                </>
                                            )}
                                        {e.order_item.qty_canceled > 0
                                            && (
                                                <>
                                                    Canceled:
                                                    {' '}
                                                    {e.order_item.qty_canceled}
                                                </>
                                            )}
                                    </td>
                                    <td className={classes.td}>{e.qty_to_refund}</td>
                                    <td className={classes.td}>{e.row_total}</td>
                                    <td className={classes.td}>{e.tax_amount || 0}</td>
                                    <td className={classes.td}>{e.discount_amount || 0}</td>
                                    <td className={classes.td}>{e.total_amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className={classes.content}>
                    <div className={classes.gridTotal}>
                        <div style={{ paddingRight: 20 }}>
                            <table className={classes.table}>
                                <tbody>
                                    <tr className={classes.tr}>
                                        <th className={classes.th}>Refund Totals</th>
                                    </tr>
                                    <tr>
                                        <td className={classes.td}>Subtotal</td>
                                        <td className={classes.td} style={{ textAlign: 'right' }}>
                                            {creditmemoDetail.subtotal}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={classes.td}>Discount</td>
                                        <td className={classes.td} style={{ textAlign: 'right' }}>
                                            {creditmemoDetail.discount}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={classes.td}>Refund Shipping</td>
                                        <td className={classes.td}>
                                            <OutlinedInput
                                                name="shipping_amount"
                                                value={formik.values.shipping_amount}
                                                onChange={formik.handleChange}
                                                classes={{
                                                    input: classes.fieldInput,
                                                    root: classes.fieldRoot,
                                                }}
                                                startAdornment={(
                                                    <InputAdornment position="start">
                                                        <span style={{ fontSize: 14 }}>IDR</span>
                                                    </InputAdornment>
                                                )}
                                                error={!!(formik.touched.shipping_amount && formik.errors.shipping_amount)}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={classes.td}>Adjusment Refund</td>
                                        <td className={classes.td}>
                                            <OutlinedInput
                                                name="adjustment_positive"
                                                value={formik.values.adjustment_positive}
                                                onChange={formik.handleChange}
                                                classes={{
                                                    input: classes.fieldInput,
                                                    root: classes.fieldRoot,
                                                }}
                                                startAdornment={(
                                                    <InputAdornment position="start">
                                                        <span style={{ fontSize: 14 }}>IDR</span>
                                                    </InputAdornment>
                                                )}
                                                error={!!(formik.touched.adjustment_positive && formik.errors.adjustment_positive)}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={classes.td}>Adjusment Fee</td>
                                        <td className={classes.td}>
                                            <OutlinedInput
                                                name="adjustment_negative"
                                                value={formik.values.adjustment_negative}
                                                onChange={formik.handleChange}
                                                classes={{
                                                    input: classes.fieldInput,
                                                    root: classes.fieldRoot,
                                                }}
                                                startAdornment={(
                                                    <InputAdornment position="start">
                                                        <span style={{ fontSize: 14 }}>IDR</span>
                                                    </InputAdornment>
                                                )}
                                                error={!!(formik.touched.adjustment_negative && formik.errors.adjustment_negative)}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className={clsx(classes.td, classes.th)} style={{ fontWeight: 600 }}>Grand Total</td>
                                        <td className={clsx(classes.td, classes.th)} style={{ textAlign: 'right', fontWeight: 600 }}>
                                            {grandTotal}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div style={{ paddingLeft: 20 }}>
                            <span className={classes.th} style={{ fontWeight: 600, paddingLeft: 0 }}>Credit Memo Comments</span>
                            <td className={classes.td} style={{ paddingLeft: 0 }}>
                                Comment Text
                            </td>

                            <TextField
                                className={clsx(classes.fieldRootNote, 'full')}
                                variant="outlined"
                                name="comment_text"
                                value={formik.values.comment_text}
                                onChange={formik.handleChange}
                                fullWidth
                                multiline
                                rows={3}
                            />
                            <FormGroup className={classes.formgroup}>
                                <FormControlLabel
                                    control={(
                                        <Checkbox
                                            name="comment_customer_notify"
                                            checked={formik.values.comment_customer_notify}
                                            onChange={formik.handleChange}
                                        />
                                    )}
                                    className={classes.controlLabel}
                                    classes={{ root: classes.rootLabel }}
                                    label="Append Comments"
                                />
                                <FormControlLabel
                                    control={(
                                        <Checkbox
                                            name="send_email"
                                            checked={formik.values.send_email}
                                            onChange={formik.handleChange}
                                        />
                                    )}
                                    className={classes.controlLabel}
                                    classes={{ root: classes.rootLabel }}
                                    label="Email Copy of Credit Memo"
                                />
                            </FormGroup>
                        </div>
                    </div>
                </div>
                <div className={classes.formFieldButton}>
                    <Button
                        className={classes.btn}
                        // onClick={formik.handleSubmit}
                        onClick={() => {
                            formik.setFieldValue('action', 'submit');
                            setTimeout(() => { formik.handleSubmit(); }, 500);
                        }}
                        variant="contained"
                        style={{ marginRight: 10 }}
                    >
                        Submit
                    </Button>
                    <Button
                        className={clsx(classes.btn, 'reverse')}
                        // onClick={() => handleCalculate(formik.values)}
                        onClick={() => {
                            formik.setFieldValue('action', 'calculate');
                            setTimeout(() => { formik.handleSubmit(); }, 500);
                        }}
                        variant="contained"
                    >
                        Calculate Totals
                    </Button>
                </div>

            </Paper>
        </>
    );
};

export default creditmemosCreateContent;
