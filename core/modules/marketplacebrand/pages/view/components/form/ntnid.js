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
                    <span className={clsx(classes.label, classes.labelRequired)}>Shop Id</span>
                </div>
                <TextField
                    className={classes.fieldRoot}
                    variant="outlined"
                    name="shop_id"
                    value={formik.values.shop_id}
                    onChange={formik.handleChange}
                    error={!!(formik.touched.shop_id && formik.errors.shop_id)}
                    helperText={(formik.touched.shop_id && formik.errors.shop_id) || ''}
                    InputProps={{
                        className: classes.fieldInput,
                    }}
                    required
                />
            </div>
            <div className={classes.formField}>
                <div className={classes.divLabel}>
                    <span className={clsx(classes.label, classes.labelRequired)}>Shop Secret</span>
                </div>
                <TextField
                    className={classes.fieldRoot}
                    variant="outlined"
                    name="shop_secret"
                    value={formik.values.shop_secret}
                    onChange={formik.handleChange}
                    error={!!(formik.touched.shop_secret && formik.errors.shop_secret)}
                    helperText={(formik.touched.shop_secret && formik.errors.shop_secret) || ''}
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
