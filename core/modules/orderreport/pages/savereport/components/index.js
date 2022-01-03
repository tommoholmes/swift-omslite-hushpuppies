/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import useStyles from '@modules/orderreport/pages/savereport/components/style';

const PrintPdfContent = (props) => {
    const {
        printPdf,
        aclCheckData,
    } = props;
    const classes = useStyles();

    React.useEffect(() => {
        if (aclCheckData.isAccessAllowed === true) {
            setTimeout(() => {
                window.print();
            }, 2000);
        }
    }, []);

    return (
        <>
            {(printPdf.data) && (
                <>
                    {printPdf.data.map((eParent) => (
                        <Paper className={classes.container}>
                            <div className={classes.content}>
                                <h2 className={classes.titleTop}>Order Report</h2>
                                <h5 className={classes.titleSmall}>{`Print Date : ${printPdf.print_date}`}</h5>
                            </div>
                            <div className={clsx(classes.content, classes.wrapperGrid)}>
                                <h5 className={classes.titleSmall}>
                                    Order Date
                                </h5>
                                <h5 className={clsx(classes.titleSmall, 'gridColumn')}>
                                    {`: ${eParent.created_at}`}
                                </h5>
                                <h5 className={classes.titleSmall}>
                                    Channel Order Number
                                </h5>
                                <h5 className={clsx(classes.titleSmall, 'gridColumn')}>
                                    {`: ${eParent.channel_order_increment_id}`}
                                </h5>
                                <h5 className={classes.titleSmall}>
                                    Status Order Channel
                                </h5>
                                <h5 className={clsx(classes.titleSmall, 'gridColumn')}>
                                    {`: ${eParent.channel_order_status}`}
                                </h5>
                            </div>
                            <div className={clsx(classes.content, classes.wrapperColumn)}>
                                <div className="column">
                                    <h2 className={classes.title}>Billing Address</h2>
                                    <h5 className={classes.titleSmall}>
                                        {`${eParent.billing_firstname} ${eParent.billing_lastname}`}
                                    </h5>
                                    <h5 className={classes.titleSmall}>
                                        {eParent.billing_street}
                                    </h5>
                                    <h5 className={classes.titleSmall}>
                                        {eParent.billing_city}
                                    </h5>
                                    <h5 className={classes.titleSmall}>
                                        {`No: ${eParent.billing_telephone}`}
                                    </h5>
                                </div>
                                <div className="column">
                                    <h2 className={classes.title}>Shipping Address</h2>
                                    <h5 className={classes.titleSmall}>
                                        {`${eParent.shipping_firstname} ${eParent.shipping_lastname}`}
                                    </h5>
                                    <h5 className={classes.titleSmall}>
                                        {eParent.shipping_street}
                                    </h5>
                                    <h5 className={classes.titleSmall}>
                                        {eParent.shipping_city}
                                    </h5>
                                    <h5 className={classes.titleSmall}>
                                        {`No: ${eParent.shipping_telephone}`}
                                    </h5>
                                </div>
                            </div>
                            <div className={classes.content}>
                                <table className={classes.table}>
                                    <tbody>
                                        <tr className={classes.tr}>
                                            <th className={classes.th}>SKU</th>
                                            <th className={classes.th}>Name</th>
                                            <th className={clsx(classes.th, 'alignRight')}>Qty</th>
                                            <th className={clsx(classes.th, 'alignRight')}>Base Price</th>
                                            <th className={clsx(classes.th, 'alignRight')}>Sale Price</th>
                                            <th className={clsx(classes.th, 'alignRight')}>Discount Amount</th>
                                        </tr>
                                        {eParent.items.map((z) => (
                                            <tr>
                                                <td className={classes.td}>{z.sku}</td>
                                                <td className={classes.td}>{z.name}</td>
                                                <td className={clsx(classes.td, 'alignRight')}>{z.qty}</td>
                                                <td className={clsx(classes.td, 'alignRight')}>{z.base_price}</td>
                                                <td className={clsx(classes.td, 'alignRight')}>{z.sell_price}</td>
                                                <td className={clsx(classes.td, 'alignRight')}>{z.discount_amount}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className={clsx(classes.content, classes.wrapperGrid)}>
                                <h2 className={classes.title} style={{ gridColumn: '3/5' }}>Order Total</h2>
                                <h5 className={classes.titleSmall}>
                                    Payment Method
                                </h5>
                                <h5 className={classes.titleSmall}>
                                    {`: ${eParent.payment_method}`}
                                </h5>
                                <h5 className={classes.titleSmall}>
                                    Grand Total
                                </h5>
                                <h5 className={clsx(classes.titleSmall, 'alignRight')}>
                                    {eParent.channel_grand_total}
                                </h5>
                                <h5 className={classes.titleSmall}>
                                    Shipping Method
                                </h5>
                                <h5 className={classes.titleSmall}>
                                    {`: ${eParent.shipping_method}`}
                                </h5>
                                <h5 className={classes.titleSmall}>
                                    Shipping Cost
                                </h5>
                                <h5 className={clsx(classes.titleSmall, 'alignRight')}>
                                    {eParent.channel_shipping_cost}
                                </h5>
                            </div>
                            <hr className={classes.hr} />
                        </Paper>
                    ))}
                </>
            )}
        </>
    );
};

export default PrintPdfContent;
