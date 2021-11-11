/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Autocomplete from '@common_autocomplete';
import DropFile from '@common_dropfile';
import clsx from 'clsx';
import useStyles from '@modules/requestreturn/pages/return/components/style';
import gqlService from '@modules/requestreturn/services/graphql';

const OrderQueueEditContent = (props) => {
    const {
        queryOrder,
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

    const { loading: loadingReturnType, data: dataReturnType } = gqlService.getStoreConfig({
        path: 'swiftoms_rma/rma_request/return_type',
    });
    const { loading: loadingPackageCondition, data: dataPackageCondition } = gqlService.getStoreConfig({
        path: 'swiftoms_rma/rma_request/package_condition',
    });
    const { loading: loadingReason, data: dataReason } = gqlService.getStoreConfig({
        path: 'swiftoms_rma/rma_request/reason',
    });

    const [checkedRows, setCheckedRows] = React.useState([]);

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
            <h2 className={classes.titleTop}>
                New Return for Order #
                {queryOrder}
            </h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <h5 className={clsx(classes.title, classes.labelRequired)}>Return Type</h5>
                    <Autocomplete
                        className={classes.autocompleteRootTop}
                        value={formik.values.return_type}
                        onChange={(e) => formik.setFieldValue('return_type', e)}
                        // loading={loadingReturnType}
                        options={
                            dataReturnType
                            && dataReturnType.getStoreConfig
                            && Object.values(JSON.parse(dataReturnType.getStoreConfig))
                        }
                        error={!!(formik.touched.return_type && formik.errors.return_type)}
                        helperText={(formik.touched.return_type && formik.errors.return_type) || 'Please Select'}
                        primaryKey="code"
                        labelKey="title"
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
                            {requestreturn.map((eMap) => (
                                <tr>
                                    <td className={classes.td}>
                                        <input
                                            // checked={checkboxValue}
                                            // onChange={() => setCheckboxValue(!checkboxValue)}
                                            type="checkbox"
                                            name={eMap.entity_id}
                                        />
                                        <img src={`${eMap.image_url}`} />
                                    </td>
                                    <td className={classes.td}>{eMap.name}</td>
                                    <td className={classes.td}>{convertToRupiah(eMap.price)}</td>
                                    <td className={clsx(classes.td, classes.center)}>
                                        <span className={clsx(classes.spanLabel, classes.labelRequired2)}><strong>Quantity</strong></span>
                                        <br />
                                        {eMap.qty}
                                        <br />
                                        <span className={clsx(classes.spanLabel, classes.labelRequired2)}><strong>Package Condition</strong></span>
                                        <Autocomplete
                                            className={classes.autocompleteRoot}
                                            value={formik.values.package_condition}
                                            onChange={(e) => formik.setFieldValue('package_condition', e)}
                                            // loading={loadingPackageCondition}
                                            options={
                                                dataPackageCondition
                                                && dataPackageCondition.getStoreConfig
                                                && Object.values(JSON.parse(dataPackageCondition.getStoreConfig))
                                            }
                                            error={!!(formik.touched.package_condition && formik.errors.package_condition)}
                                            helperText={(formik.touched.package_condition && formik.errors.package_condition) || 'Please Select'}
                                            primaryKey="code"
                                            labelKey="title"
                                        />
                                        <br />
                                        <span className={clsx(classes.spanLabel, classes.labelRequired2)}><strong>Reason</strong></span>
                                        <Autocomplete
                                            className={classes.autocompleteRoot}
                                            value={formik.values.reason}
                                            onChange={(e) => formik.setFieldValue('reason', e)}
                                            // loading={loadingReason}
                                            options={
                                                dataReason
                                                && dataReason.getStoreConfig
                                                && Object.values(JSON.parse(dataReason.getStoreConfig))
                                            }
                                            error={!!(formik.touched.reason && formik.errors.reason)}
                                            helperText={(formik.touched.reason && formik.errors.reason) || 'Please Select'}
                                            primaryKey="code"
                                            labelKey="title"
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
                    <h5 className={classes.title}>Messages</h5>
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
