/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Autocomplete from '@common_autocomplete';
import DropFile from '@common_dropfile';
import { optionsCondition, optionsReason } from '@modules/requestreturn/helpers';
import clsx from 'clsx';
import useStyles from '@modules/requestreturn/pages/return/components/style';
import gqlService from '@modules/requestreturn/services/graphql';

const OrderQueueEditContent = (props) => {
    const {
        formik,
        requestreturn,
        handleDropFile,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    const convertToRupiah = (number) => {
        const currencyFractionDigits = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
        }).resolvedOptions().maximumFractionDigits;

        const value = (number).toLocaleString('id-ID', { maximumFractionDigits: currencyFractionDigits });

        return value;
    };

    return (
        <div className={classes.body}>
            <Button
                className={classes.btnBack}
                // onClick={() => router.push.history.goBack}
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
            <h2 className={classes.titleTop}>New Return for Order #</h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <h5 className={classes.title}>Return Type</h5>
                    <Autocomplete
                        className={classes.autocompleteRootTop}
                        // value={formik.values.framework}
                        // onChange={(e) => formik.setFieldValue('framework', e)}
                        // options={optionsFramework}
                        // error={!!(formik.touched.framework && formik.errors.framework)}
                        // helperText={(formik.touched.framework && formik.errors.framework) || ''}
                    />
                </div>
                <div className={classes.content}>
                    <h5 className={classes.title}>Products To Return</h5>
                    <table className={classes.table}>
                        <tbody>
                            <tr className={classes.tr}>
                                <th className={classes.th}>Image</th>
                                <th className={classes.th}>Name</th>
                                <th className={classes.th}>Price</th>
                                <th className={clsx(classes.th, classes.center)}>Actions</th>
                            </tr>
                            {requestreturn.map((e) => (
                                <tr>
                                    <td className={classes.td}>
                                        <img src={`${e.image_url}`} />
                                    </td>
                                    <td className={classes.td}>{e.name}</td>
                                    <td className={classes.td}>{convertToRupiah(e.price)}</td>
                                    <td className={clsx(classes.td, classes.center)}>
                                        <span className={classes.orderLabel}><strong>Quantity</strong></span>
                                        {e.qty}
                                        <br />
                                        <span className={classes.orderLabel}><strong>Package Condition</strong></span>
                                        <Autocomplete
                                            className={classes.autocompleteRoot}
                                            // value={formik.values.framework}
                                            // onChange={(e) => formik.setFieldValue('framework', e)}
                                            options={optionsCondition}
                                        />
                                        <br />
                                        <span className={classes.orderLabel}><strong>Reason</strong></span>
                                        <Autocomplete
                                            className={classes.autocompleteRoot}
                                            // value={formik.values.framework}
                                            // onChange={(e) => formik.setFieldValue('framework', e)}
                                            options={optionsReason}
                                        />
                                        <br />
                                        <DropFile
                                            formatFile=".zip, .rar, .jpg, .jpeg, .png, .gif, .pdf, .doc, .docx, .xls, .xlsx"
                                            error={formik.errors.binary && formik.touched.binary}
                                            getBase64={handleDropFile}
                                        />
                                        <span className={classes.spanInfo}>The following file types are allowed: zip, rar, jpg, jpeg, png, gif, pdf, doc, docx, xls, xlsx</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className={classes.content}>
                    <h5 className={classes.titleSmall}>Messages</h5>
                    <TextField
                        className={clsx(classes.fieldRoot, 'fieldNotes')}
                        variant="outlined"
                        multiline
                        rows={4}
                        name="message"
                        value={formik.values.message}
                        onChange={formik.handleChange}
                        error={!!(formik.touched.message && formik.errors.message)}
                        helperText={(formik.touched.message && formik.errors.message) || ''}
                    />
                    <div className={classes.formFieldButton}>
                        <Button
                            className={classes.btn}
                            type="submit"
                            onClick={formik.handleSubmit}
                            variant="contained"
                        >
                            Submit Request
                        </Button>
                    </div>
                </div>
            </Paper>
        </div>
    );
};

export default OrderQueueEditContent;
