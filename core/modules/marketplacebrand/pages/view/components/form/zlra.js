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
                    <span className={clsx(classes.label, classes.labelRequired)}>User Id</span>
                </div>
                <TextField
                    className={classes.fieldRoot}
                    variant="outlined"
                    name="user_id"
                    value={formik.values.user_id}
                    onChange={formik.handleChange}
                    error={!!(formik.touched.user_id && formik.errors.user_id)}
                    helperText={(formik.touched.user_id && formik.errors.user_id) || ''}
                    InputProps={{
                        className: classes.fieldInput,
                    }}
                    required
                />
            </div>
            <div className={classes.formField}>
                <div className={classes.divLabel}>
                    <span className={clsx(classes.label, classes.labelRequired)}>Api Key</span>
                </div>
                <TextField
                    className={classes.fieldRoot}
                    variant="outlined"
                    name="api_key"
                    value={formik.values.api_key}
                    onChange={formik.handleChange}
                    error={!!(formik.touched.api_key && formik.errors.api_key)}
                    helperText={(formik.touched.api_key && formik.errors.api_key) || ''}
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
