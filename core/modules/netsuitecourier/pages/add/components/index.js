import React, { useEffect, useState } from 'react';
import { useRouter } from 'node_modules/next/router';
import TextField from '@common_textfield';
import useStyles from '@modules/stockadjustment/pages/edit/components/style';
import Button from '@common_button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Paper from '@material-ui/core/Paper';
import Autocomplete from '@common_autocomplete';
import gqlService from '@modules/netsuitecourier/services/graphql';

const NetsuitecourierEditContent = (props) => {
    const { formik } = props;
    const classes = useStyles();
    const router = useRouter();

    const [
        getNetsuiteDeliveryMethodOptions,
        { data: deliveryMethodData, loading: deliveryMethodLoading },
    ] = gqlService.getNetsuiteDeliveryMethodOptions();

    const [optionsDeliveryMethod, setOptionsDeliveryMethod] = useState([]);

    useEffect(() => {
        if (deliveryMethodData && deliveryMethodData.getNetsuiteDeliveryMethodOptions) {
            setOptionsDeliveryMethod(
                deliveryMethodData.getNetsuiteDeliveryMethodOptions.map((item) => ({
                    ...item,
                    delivery_method: `${item.delivery_method} (${item.code})`,
                })),
            );
        }
    }, [deliveryMethodData]);

    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push('/configurations/netsuitecourier')}
                variant="contained"
                style={{ marginRight: 10 }}
            >
                <ChevronLeftIcon
                    style={{
                        fontSize: 30,
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                />
            </Button>
            <h2 className={classes.titleTop}>Add Netsuite Courier</h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={[classes.label, classes.labelRequired].join(' ')}>Courier(RAW)</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="courier"
                            value={formik.values.courier}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.courier && formik.errors.courier)}
                            helperText={(formik.touched.courier && formik.errors.courier) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={[classes.label, classes.labelRequired].join(' ')}>Delivery Method</span>
                        </div>
                        <Autocomplete
                            mode="lazy"
                            className={classes.autocompleteRoot}
                            value={formik.values.delivery_method_code}
                            onChange={(e) => {
                                formik.setFieldValue('delivery_method_code', e);
                            }}
                            loading={deliveryMethodLoading}
                            options={optionsDeliveryMethod}
                            getOptions={getNetsuiteDeliveryMethodOptions}
                            primaryKey="code"
                            labelKey="delivery_method"
                            error={!!(formik.touched.delivery_method_code && formik.errors.delivery_method_code)}
                            helperText={(formik.touched.delivery_method_code && formik.errors.delivery_method_code) || ''}
                        />
                    </div>
                </div>
                <div className={classes.formFieldButton}>
                    <Button className={classes.btn} onClick={formik.submitForm} variant="contained">
                        Submit
                    </Button>
                </div>
            </Paper>
        </>
    );
};

export default NetsuitecourierEditContent;
