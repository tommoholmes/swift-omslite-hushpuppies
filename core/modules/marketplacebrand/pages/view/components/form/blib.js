import React from 'react';
import TextField from '@common_textfield';
import clsx from 'clsx';
import useStyles from '@modules/marketplacebrand/pages/view/components/style';

const FormContent = ({ formik }) => {
    const classes = useStyles();
    return (
        <>
            <div className={classes.formField}>
                <div className={classes.divLabel}>
                    <span className={clsx(classes.label, classes.labelRequired)}>Merchant Code</span>
                </div>
                <TextField
                    className={classes.fieldRoot}
                    variant="outlined"
                    name="merchant_code"
                    value={formik.values.merchant_code}
                    onChange={formik.handleChange}
                    error={!!(formik.touched.merchant_code && formik.errors.merchant_code)}
                    helperText={(formik.touched.merchant_code && formik.errors.merchant_code) || ''}
                    InputProps={{
                        className: classes.fieldInput,
                    }}
                    required
                />
            </div>
            <div className={classes.formField}>
                <div className={classes.divLabel}>
                    <span className={clsx(classes.label, classes.labelRequired)}>Signature Key</span>
                </div>
                <TextField
                    className={classes.fieldRoot}
                    variant="outlined"
                    name="signature_key"
                    value={formik.values.signature_key}
                    onChange={formik.handleChange}
                    error={!!(formik.touched.signature_key && formik.errors.signature_key)}
                    helperText={(formik.touched.signature_key && formik.errors.signature_key) || ''}
                    InputProps={{
                        className: classes.fieldInput,
                    }}
                    required
                />
            </div>
            <div className={classes.formField}>
                <div className={classes.divLabel}>
                    <span className={clsx(classes.label, classes.labelRequired)}>Api seller Key</span>
                </div>
                <TextField
                    className={classes.fieldRoot}
                    variant="outlined"
                    name="api_seller_key"
                    value={formik.values.api_seller_key}
                    onChange={formik.handleChange}
                    error={!!(formik.touched.api_seller_key && formik.errors.api_seller_key)}
                    helperText={(formik.touched.api_seller_key && formik.errors.api_seller_key) || ''}
                    InputProps={{
                        className: classes.fieldInput,
                    }}
                    required
                />
            </div>
        </>
    );
};

export default FormContent;
