/* eslint-disable no-unused-vars */
import React from 'react';
import Button from '@common_button';
import Link from 'next/link';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import clsx from 'clsx';
import useStyles from './style';

const ManageRmaEditContent = (props) => {
    const {
        formik, rmaDetail,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push('/sales/managerma')}
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
            {(rmaDetail.status === 'processing') && (
                <Button
                    className={classes.btn}
                    onClick={formik.handleSubmit}
                >
                    Refund
                </Button>
            )}
            {(rmaDetail.status === 'package_received') && (
                <Button
                    className={classes.btn}
                    onClick={() => router.push('/sales/creditmemos/create')}
                >
                    Credit Memo
                </Button>
            )}
            <h2 className={classes.titleTop}>Detail Manage Request</h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <h5 className={classes.title}>General & Account Information</h5>
                    <div className={clsx(classes.contentLeft, classes.contentRight)}>
                        <table className={classes.table}>
                            <tbody>
                                <tr className={classes.tr}>
                                    <td className={classes.td}>Status</td>
                                    <td className={classes.td}>{rmaDetail.status}</td>
                                    <td />
                                    <td className={classes.td}>Customer Name</td>
                                    <td className={classes.td}>{rmaDetail.name}</td>
                                </tr>
                                <tr className={classes.tr}>
                                    <td className={classes.td}>Request Date</td>
                                    <td className={classes.td}>{rmaDetail.createdAt}</td>
                                    <td />
                                    <td className={classes.td}>Customer Email</td>
                                    <td className={classes.td}>{rmaDetail.email}</td>
                                </tr>
                                <tr className={classes.tr}>
                                    <td className={classes.td}>Last Update</td>
                                    <td className={classes.td}>{rmaDetail.updatedAt}</td>
                                    <td />
                                    <td className={classes.td}>Shipping Address</td>
                                    <td className={classes.td}>
                                        <span className={classes.orderLabel}>
                                            {rmaDetail.firstname}
                                            {' '}
                                            {rmaDetail.lastname}
                                        </span>
                                        <span className={classes.orderLabel}>
                                            {rmaDetail.street}
                                        </span>
                                        <span className={classes.orderLabel}>
                                            {rmaDetail.city}
                                            {', '}
                                            {rmaDetail.region}
                                            {', '}
                                            {rmaDetail.postcode}
                                        </span>
                                        <span className={classes.orderLabel}>
                                            {rmaDetail.country}
                                        </span>
                                        <span className={classes.orderLabel}>
                                            {rmaDetail.telephone}
                                        </span>
                                    </td>
                                </tr>
                                <tr className={classes.tr}>
                                    <td className={classes.td}>Channel Order</td>
                                    <td className={classes.td}>{rmaDetail.channelOrder}</td>
                                </tr>
                                <tr className={classes.tr}>
                                    <td className={classes.td}>Return Type</td>
                                    <td className={classes.td}>{rmaDetail.return}</td>
                                </tr>
                                <tr className={classes.tr}>
                                    <td className={classes.td}>Refund Type</td>
                                    <td className={classes.td}>{rmaDetail.refund}</td>
                                </tr>
                                <tr className={classes.tr}>
                                    <td className={classes.td}>Package Received</td>
                                    <td className={classes.td}>{rmaDetail.package}</td>
                                </tr>
                                {(rmaDetail.status === 'processing' || rmaDetail.status === 'complete') && (
                                    <tr className={classes.tr}>
                                        <td className={classes.td}>Creditmemo</td>
                                        <td className={classes.td}>
                                            <Link href={`/sales/creditmemos/edit/${rmaDetail.creditmemo}`}>
                                                <a className={classes.link}>{rmaDetail.creditmemo}</a>
                                            </Link>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={classes.content}>
                    <h5 className={classes.title}>Products</h5>
                    <table className={classes.table}>
                        <tbody>
                            <tr className={classes.tr}>
                                <th className={classes.th}>Products</th>
                                <th className={classes.th}>Return Qty</th>
                                <th className={classes.th}>Return Details</th>
                                <th className={classes.th}>Status</th>
                                <th className={classes.th}>Return Stock</th>
                            </tr>
                            {rmaDetail.item.map((e) => (
                                <tr>
                                    <td className={classes.td}>
                                        {e.name}
                                        <br />
                                        <span className={classes.spanLabel} style={{ display: 'inline-block' }}>SKU:</span>
                                        {' '}
                                        {e.sku}
                                        <br />
                                        <span className={classes.spanLabel} style={{ display: 'inline-block' }}>Price:</span>
                                        {' '}
                                        {e.price}
                                    </td>
                                    <td className={classes.td}>{e.qty}</td>
                                    <td className={classes.td}>
                                        <span className={classes.spanLabel} style={{ display: 'inline-block' }}>Package Condition:</span>
                                        {' '}
                                        {e.package_condition}
                                        <br />
                                        <span className={classes.spanLabel} style={{ display: 'inline-block' }}>Reason:</span>
                                        {' '}
                                        {e.reason}
                                    </td>
                                    <td className={classes.td}>{e.status_code}</td>
                                    {(e.return_stock === 1) ? (
                                        <td className={classes.td}>Yes</td>
                                    ) : (
                                        <td className={classes.td}>No</td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className={classes.content}>
                    <h5 className={classes.title}>Messages</h5>
                    <ul>
                        {rmaDetail.message.map((e) => (
                            <li style={{ marginBottom: 10 }}>
                                <span className={classes.spanLabel}>
                                    {e.customer_name}
                                    {', '}
                                    {e.created_at}
                                </span>
                                <span>{e.text}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </Paper>
        </>
    );
};

export default ManageRmaEditContent;
