/* eslint-disable no-unused-vars */
import React from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import useStyles from '@modules/marketplacebrand/pages/mpdetail/components/style';
import Select from '@common_select';

const AdminStoreCreateContent = (props) => {
    const {
        data, dataOptions, loadingOptions, formik,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push(`/configurations/marketplacebrand/view/${router?.query?.id}`)}
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
                Manage Marketplace  -
                {' '}
                {data && data.length && data[0].marketplace_name}
            </h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    {data.map((field, idx) => (
                        <div className={classes.formField} key={field.id}>
                            <div className={classes.divLabel}>
                                <span className={clsx(classes.label, classes.labelRequired)}>{field.type.split('_').join(' ')}</span>
                            </div>
                            {field.type === 'default_shipping_method'
                                ? (
                                    <Select
                                        name={`input[${idx}].value`}
                                        value={formik.values.input[idx].value}
                                        onChange={formik.handleChange}
                                        dataOptions={dataOptions && dataOptions.getMarketplaceDefaultShippingMethods}
                                        selectClasses={classes.fieldInputSelect}
                                        formControlClasses={classes.selectControl}
                                        loading={loadingOptions}
                                        error={!!(formik.touched.input && formik.touched.input[idx]?.value
                                            && formik.errors.input && formik.errors.input[idx]?.value)}
                                        helperText={(formik.touched.input && formik.touched.input[idx]?.value
                                            && formik.errors.input && formik.errors.input[idx]?.value) || ''}
                                    />
                                ) : (
                                    <TextField
                                        name={`input[${idx}].value`}
                                        value={formik.values.input[idx].value}
                                        onChange={formik.handleChange}
                                        className={classes.fieldRoot}
                                        variant="outlined"
                                        InputProps={{
                                            className: classes.fieldInput,
                                        }}
                                        error={!!(formik.touched.input && formik.touched.input[idx]?.value
                                            && formik.errors.input && formik.errors.input[idx]?.value)}
                                        helperText={(formik.touched.input && formik.touched.input[idx]?.value
                                            && formik.errors.input && formik.errors.input[idx]?.value) || ''}
                                    />
                                )}
                        </div>
                    ))}
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
            </Paper>
        </>
    );
};

export default AdminStoreCreateContent;
