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
                    <span className={clsx(classes.label, classes.labelRequired)}>Api Email</span>
                </div>
                <TextField
                    className={classes.fieldRoot}
                    variant="outlined"
                    name="api_email"
                    value={formik.values.api_email}
                    onChange={formik.handleChange}
                    error={!!(formik.touched.api_email && formik.errors.api_email)}
                    helperText={(formik.touched.api_email && formik.errors.api_email) || ''}
                    InputProps={{
                        className: classes.fieldInput,
                    }}
                    required
                />
            </div>
            <div className={classes.formField}>
                <div className={classes.divLabel}>
                    <span className={clsx(classes.label, classes.labelRequired)}>Application Key</span>
                </div>
                <TextField
                    className={classes.fieldRoot}
                    variant="outlined"
                    name="application_key"
                    value={formik.values.application_key}
                    onChange={formik.handleChange}
                    error={!!(formik.touched.application_key && formik.errors.application_key)}
                    helperText={(formik.touched.application_key && formik.errors.application_key) || ''}
                    InputProps={{
                        className: classes.fieldInput,
                    }}
                    required
                />
            </div>
            <div className={classes.formField}>
                <div className={classes.divLabel}>
                    <span className={clsx(classes.label, classes.labelRequired)}>Secret Key</span>
                </div>
                <TextField
                    className={classes.fieldRoot}
                    variant="outlined"
                    name="secret_key"
                    value={formik.values.secret_key}
                    onChange={formik.handleChange}
                    error={!!(formik.touched.secret_key && formik.errors.secret_key)}
                    helperText={(formik.touched.secret_key && formik.errors.secret_key) || ''}
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
