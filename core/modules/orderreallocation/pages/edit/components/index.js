/* eslint-disable no-unused-vars */
import React from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import clsx from 'clsx';
import useStyles from './style';

const orderreallocationEditContent = (props) => {
    const {
        formik,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push('/sales/orderreallocation')}
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
            <h2 className={classes.titleTop}>Detail Order Reallocation</h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <h5 className={classes.title}>Order Information</h5>
                    <div className={clsx(classes.contentLeft, classes.contentRight)}>
                        <table className={classes.table}>
                            <tbody>
                                <tr className={classes.tr}>
                                    <td className={classes.td}>Order Date</td>
                                    <td className={classes.td}>Masih Kosong</td>
                                </tr>
                                <tr className={classes.tr}>
                                    <td className={classes.td}>Order Number</td>
                                    <td className={classes.td}>Masih Kosong</td>
                                </tr>
                                <tr className={classes.tr}>
                                    <td className={classes.td}>Channel Order Number</td>
                                    <td className={classes.td}>Masih Kosong</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={classes.content}>
                    <h5 className={classes.title}>Fullfilled By</h5>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>Company</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.name && formik.errors.name)}
                            helperText={(formik.touched.name && formik.errors.name) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>Location</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.name && formik.errors.name)}
                            helperText={(formik.touched.name && formik.errors.name) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
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
                <div className={classes.content}>
                    <h5 className={classes.title}>Shipping Item(s)</h5>
                    <table className={classes.table}>
                        <tbody>
                            <tr className={classes.tr}>
                                <th className={classes.th}>SKU</th>
                                <th className={classes.th}>Name</th>
                                <th className={classes.th}>Qty</th>
                                <th className={classes.th}>Action</th>
                            </tr>
                            <tr>
                                <td className={classes.td}>masih kosong</td>
                                <td className={classes.td}>masih kosong</td>
                                <td className={classes.td}>masih kosong</td>
                                <td className={classes.td}>Link Action</td>
                            </tr>
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
                                <th className={classes.th}>Notes</th>
                            </tr>
                            <tr>
                                <td className={classes.td}>masih kosong</td>
                                <td className={classes.td}>masih kosong</td>
                                <td className={classes.td}>masih kosong</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Paper>
        </>
    );
};

export default orderreallocationEditContent;
