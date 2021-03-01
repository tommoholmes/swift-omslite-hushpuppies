/* eslint-disable no-unused-vars */
import React from 'react';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import clsx from 'clsx';
import useStyles from './style';

const managermaEditContent = (props) => {
    const {
        formik,
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
            <h2 className={classes.titleTop}>Detail Manage Request</h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <h5 className={classes.title}>General & Account Information</h5>
                    <div className={clsx(classes.contentLeft, classes.contentRight)}>
                        <table className={classes.table}>
                            <tbody>
                                <tr className={classes.tr}>
                                    <td className={classes.td}>Status</td>
                                    <td className={classes.td}>Masih Kosong</td>
                                    <td />
                                    <td className={classes.td}>Customer Name</td>
                                    <td className={classes.td}>Masih Kosong</td>
                                </tr>
                                <tr className={classes.tr}>
                                    <td className={classes.td}>Request Date</td>
                                    <td className={classes.td}>Masih Kosong</td>
                                    <td />
                                    <td className={classes.td}>Customer Email</td>
                                    <td className={classes.td}>Masih Kosong</td>
                                </tr>
                                <tr className={classes.tr}>
                                    <td className={classes.td}>Last Update</td>
                                    <td className={classes.td}>Masih Kosong</td>
                                    <td />
                                    <td className={classes.td}>Shipping Address</td>
                                    <td className={classes.td}>Masih Kosong</td>
                                </tr>
                                <tr className={classes.tr}>
                                    <td className={classes.td}>Return Type</td>
                                    <td className={classes.td}>Masih Kosong</td>
                                </tr>
                                <tr className={classes.tr}>
                                    <td className={classes.td}>Refund Type</td>
                                    <td className={classes.td}>Masih Kosong</td>
                                </tr>
                                <tr className={classes.tr}>
                                    <td className={classes.td}>Package Received</td>
                                    <td className={classes.td}>Masih Kosong</td>
                                </tr>
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
                            <tr>
                                <td className={classes.td}>masih kosong</td>
                                <td className={classes.td}>masih kosong</td>
                                <td className={classes.td}>masih kosong</td>
                                <td className={classes.td}>masih kosong</td>
                                <td className={classes.td}>masih kosong</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className={classes.content}>
                    <h5 className={classes.title}>Messages</h5>
                    <ul>
                        <li>kosong ini</li>
                        <span>kosong</span>
                        <li>kosong ini</li>
                        <span>kosong</span>
                        <li>kosong ini</li>
                        <span>kosong</span>
                    </ul>
                </div>
            </Paper>
        </>
    );
};

export default managermaEditContent;
