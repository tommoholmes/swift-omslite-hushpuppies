/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable indent */
/* eslint-disable max-len */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-closing-tag-location */

import React from 'react';
import { useRouter } from 'node_modules/next/router';
import useStyles from '@modules/stocktransfer/pages/edit/components/style';
import Button from '@common_button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Paper from '@material-ui/core/Paper';
import {
 Formik, Field, Form, FieldArray,
} from 'formik';
import Autocomplete from '@common_autocomplete';
import gqlLocation from '@modules/location/services/graphql';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import clsx from 'clsx';
import gqlSource from '@modules/source/services/graphql';
import Cookies from 'js-cookie';
import { custDataNameCookie } from '@config';
import * as Yup from 'yup';
import Head from 'next/head';

const StockTransferEdit = (props) => {
    const [getLocationList, getLocationListRes] = gqlLocation.getLocationList();
    const [getSourceList, getSourceListRes] = gqlSource.getSourceList();
    const { initialValues, submitHandler } = props;
    const classes = useStyles();
    const router = useRouter();
    const [locID, setLocID] = React.useState(0);
    const [searchSku, setSearchSku] = React.useState('');
    const [searchLocation, setSearchLocation] = React.useState('');
    const [customer_loc_code, setCustomerLocCode] = React.useState([]);
    const [locationOption, setLocationOption] = React.useState([]);
    const [baseSkuOption, setBaseSkuOption] = React.useState([]);
    const [focusedForm, setFocusedForm] = React.useState({});
    const firstRender = React.useRef(true);
    const firstRenderSetLocation = React.useRef(true);

    React.useEffect(() => {
        const onChangeTimeOut = setTimeout(() => {
            const isExist = searchSku && baseSkuOption.filter((elm) => elm?.sku?.toLowerCase().includes(searchSku?.toLowerCase()));
            if (searchSku && isExist.length === 0) {
                getSourceList({
                    variables: {
                        search: searchSku,
                        pageSize: 20,
                        currentPage: 1,
                        filter: {
                            loc_id: {
                                from: locID.toString(),
                                to: locID.toString(),
                            },
                        },
                    },
                });
            }

            return null;
        }, 500);

        return () => clearTimeout(onChangeTimeOut);
    }, [searchSku]);

    React.useEffect(() => {
        if (getSourceListRes && getSourceListRes.data && getSourceListRes.data.getSourceList && getSourceListRes.data.getSourceList.items) {
            const sku = new Set(baseSkuOption.map((d) => d.sku));
            setBaseSkuOption([...baseSkuOption, ...getSourceListRes.data.getSourceList.items.filter((d) => !sku.has(d.sku))]);
        }
    }, [getSourceListRes.data]);

    React.useEffect(() => {
        const onChangeTimeOut = setTimeout(
            () => {
                let filter = {};
                if (firstRender.current) {
                    filter = {
                        loc_code: {
                            in: [initialValues.source_location.loc_code, initialValues.target_location.loc_code],
                        },
                    };
                } else {
                    filter = {
                        loc_code: {
                            in: customer_loc_code,
                        },
                    };
                }
                const isExist = searchLocation && locationOption.filter((elm) => elm?.loc_name?.toLowerCase().includes(searchLocation?.toLowerCase()));
                if (firstRender.current || (searchLocation && isExist.length === 0)) {
                    getLocationList({
                        variables: {
                            search: searchLocation,
                            pageSize: 20,
                            currentPage: 1,
                            filter,
                        },
                    });
                    firstRender.current = false;
                }

                return null;
            },
            firstRender.current ? 0 : 500,
        );

        return () => clearTimeout(onChangeTimeOut);
    }, [searchLocation]);

    React.useEffect(() => {
        if (
            getLocationListRes
            && getLocationListRes.data
            && getLocationListRes.data.getLocationList
            && getLocationListRes.data.getLocationList.items
        ) {
            if (firstRenderSetLocation.current && getLocationListRes.data.getLocationList.items.length > 0) {
                const loc = getLocationListRes.data.getLocationList.items.filter((item) => item.loc_code === initialValues.source_location.loc_code);

                setLocID(loc[0].loc_id);
                firstRenderSetLocation.current = false;
            }

            const ids = new Set(locationOption.map((d) => d.loc_code));
            setLocationOption([...locationOption, ...getLocationListRes.data.getLocationList.items.filter((d) => !ids.has(d.loc_code))]);
        }
    }, [getLocationListRes.data]);

    const handleSetUserInfo = (customer) => {
        const customerLocCodeTemp = customer && customer.customer_loc_code;
        setCustomerLocCode(customerLocCodeTemp.split(','));
    };

    React.useEffect(() => {
        if (Cookies.getJSON(custDataNameCookie)) {
            handleSetUserInfo(Cookies.getJSON(custDataNameCookie));
        }
    }, []);

    const editSchemaValidaton = Yup.object().shape({
        source_location: Yup.object().required('Required!'),
        target_location: Yup.object().required('Required!'),
        reason: Yup.string().required('Required!'),
        data: Yup.array()
            .of(
                Yup.object().shape({
                    sku: Yup.object().required('Required!'),
                    transfer: Yup.number()
                        .min(1)
                        .test({
                            name: 'max',
                            exclusive: false,
                            params: {},
                            message: 'qty transfer must be less than qty available',
                            test(value) {
                                // You can access the price field with `this.parent`.
                                // eslint-disable-next-line react/no-this-in-sfc
                                return value <= parseFloat(this.parent.qty);
                            },
                        })
                        .required('Required!'),
                }),
            )
            .min(1)
            .required('Required!'),
    });

    return (
        <>
            <Head>
                <title>
Edit Stock Transfer #
{initialValues.incrementID}
</title>
            </Head>
            <Button
                className={classes.btnBack}
                onClick={() => router.push('/cataloginventory/stocktransfer')}
                variant="contained"
                style={{ marginRight: 16 }}
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

            <h2 className={classes.titleTop}>
Edit Stock Transfer #
{initialValues.incrementID}
</h2>

            <Paper className={classes.container}>
                <div className={classes.content}>
                    <h2 className={classes.title}>Stock Transfer Information</h2>
                    <Formik initialValues={initialValues} onSubmit={submitHandler} validationSchema={editSchemaValidaton}>
                        {({
 values, setFieldValue, submitForm, errors, touched,
}) => (
                            <Form>
                                <div className={classes.formField}>
                                    <div className={classes.divLabel}>
                                        <span className={[classes.label, classes.labelRequired].join(' ')}>Source Location</span>
                                    </div>
                                    <Autocomplete
                                        onFocus={() => setFocusedForm({ ...focusedForm, source_location: true })}
                                        onBlur={() => setFocusedForm({ ...focusedForm, source_location: false })}
                                        mode="lazy"
                                        value={values.source_location}
                                        className={classes.autocompleteRoot}
                                        onChange={(e) => {
                                            setFieldValue('source_location', e);
                                            setLocID(e?.loc_id ?? 0);
                                            setFieldValue('data', []);
                                            setFocusedForm({ ...focusedForm, source_location: false });
                                        }}
                                        defaultValue={{ loc_name: 'select', loc_code: 0 }}
                                        loading={focusedForm?.source_location && getLocationListRes.loading}
                                        options={locationOption}
                                        getOptions={getLocationList}
                                        getOptionsVariables={{
                                            variables: {
                                                search: searchLocation,
                                                pageSize: 20,
                                                currentPage: 1,
                                                filter: {
                                                    loc_code: {
                                                        in: customer_loc_code,
                                                    },
                                                },
                                            },
                                        }}
                                        primaryKey="loc_code"
                                        labelKey="loc_name"
                                        onInputChange={(e) => setSearchLocation(e && e.target && e.target.value)}
                                        error={!!(touched.source_location && errors.source_location)}
                                        helperText={(touched.source_location && errors.source_location) || ''}
                                    />
                                </div>
                                <div className={classes.formField}>
                                    <div className={classes.divLabel}>
                                        <span className={[classes.label, classes.labelRequired].join(' ')}>Target Location</span>
                                    </div>
                                    <Autocomplete
                                        onFocus={() => setFocusedForm({ ...focusedForm, target_location: true })}
                                        onBlur={() => setFocusedForm({ ...focusedForm, target_location: false })}
                                        mode="lazy"
                                        value={values.target_location}
                                        className={classes.autocompleteRoot}
                                        onChange={(e) => {
                                            setFieldValue('target_location', e);
                                            setFieldValue('data', []);
                                        }}
                                        defaultValue={{ loc_name: 'select', loc_code: 0 }}
                                        loading={focusedForm?.target_location && getLocationListRes.loading}
                                        options={locationOption}
                                        getOptions={getLocationList}
                                        getOptionsVariables={{
                                            variables: {
                                                search: searchLocation,
                                                pageSize: 20,
                                                currentPage: 1,
                                                filter: {
                                                    loc_code: {
                                                        in: customer_loc_code,
                                                    },
                                                },
                                            },
                                        }}
                                        primaryKey="loc_code"
                                        labelKey="loc_name"
                                        onInputChange={(e) => setSearchLocation(e && e.target && e.target.value)}
                                        error={!!(touched.target_location && errors.target_location)}
                                        helperText={(touched.target_location && errors.target_location) || ''}
                                    />
                                </div>
                                <div className={classes.formField}>
                                    <div className={classes.divLabel}>
                                        <span className={[classes.label, classes.labelRequired].join(' ')}>Product</span>
                                    </div>
                                    {errors?.data && touched?.data && typeof errors?.data === 'string' && (
                                        <p style={{ margin: 0, color: 'red', fontSize: 12 }}>{errors?.data}</p>
                                    )}

                                    <FieldArray name="data">
                                        {({ remove, push }) => (
                                            <>
                                                {values.data.length > 0 && (
                                                    <table className={classes.table}>
                                                        <thead className={classes.th}>
                                                            <tr className={classes.tr}>
                                                                <td className={classes.td}>SKU Product</td>
                                                                <td className={classes.td}>Qty Available</td>
                                                                <td className={classes.td}>Qty Transfer</td>
                                                                <td className={classes.td}>Action</td>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {values.data.map((item, idx) => (
                                                                <tr key={idx}>
                                                                    <td className={classes.td}>
                                                                        {!item?.target_id ? (
                                                                            <Autocomplete
                                                                                name={`data.${idx}.sku`}
                                                                                mode="lazy"
                                                                                className={classes.autocomplete}
                                                                                value={values.data[idx].sku}
                                                                                onChange={(e) => {
                                                                                    setFieldValue(`data.${idx}.qty`, e?.qty_total ?? 0);
                                                                                    setFieldValue(`data.${idx}.sku`, e);
                                                                                }}
                                                                                loading={!values.data[idx].sku && getSourceListRes.loading}
                                                                                options={baseSkuOption}
                                                                                getOptionsVariables={{
                                                                                    variables: {
                                                                                        search: searchSku,
                                                                                        pageSize: 20,
                                                                                        currentPage: 1,
                                                                                        filter: {
                                                                                            loc_id: {
                                                                                                from: locID.toString(),
                                                                                                to: locID.toString(),
                                                                                            },
                                                                                        },
                                                                                    },
                                                                                }}
                                                                                getOptions={getSourceList}
                                                                                primaryKey="source_id"
                                                                                labelKey="sku"
                                                                                onInputChange={(e) => setSearchSku(e && e.target && e.target.value)}
                                                                                error={!!(errors?.data?.[idx]?.sku && touched?.data?.[idx]?.sku)}
                                                                                helperText={
                                                                                    (touched?.data?.[idx]?.sku && errors?.data?.[idx]?.sku) || ''
                                                                                }
                                                                            />
                                                                        ) : (
                                                                            item.sku.sku
                                                                        )}
                                                                    </td>
                                                                    <td className={classes.td}>{item.qty}</td>
                                                                    <td className={classes.td}>
                                                                        <Field
                                                                            max={values.data[idx].qty}
                                                                            className={classes.fieldQty}
                                                                            name={`data.${idx}.transfer`}
                                                                            type="number"
                                                                            style={{
                                                                                borderColor: `${
                                                                                    errors?.data?.[idx]?.transfer && touched?.data?.[idx]?.transfer
                                                                                        ? 'red'
                                                                                        : 'none'
                                                                                }`,
                                                                            }}
                                                                        />
                                                                        {errors?.data?.[idx]?.transfer && touched?.data?.[idx]?.transfer && (
                                                                            <p style={{ margin: 0, color: 'red', fontSize: 12 }}>
                                                                                {errors?.data?.[idx]?.transfer}
                                                                            </p>
                                                                        )}
                                                                    </td>
                                                                    <td
                                                                        className={`${classes.td} ${classes.btnRemove} link-button`}
                                                                        onClick={() => remove(idx)}
                                                                    >
                                                                        remove
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                )}
                                                <div className={`${classes.formFieldButton} ${classes.formFieldButtonRight}`}>
                                                    <Button
                                                        className={classes.btn}
                                                        variant="contained"
                                                        onClick={() => push({
                                                                sku: null,
                                                                qty: 0,
                                                                transfer: 0,
                                                            })}
                                                    >
                                                        Add Product
                                                    </Button>
                                                </div>
                                            </>
                                        )}
                                    </FieldArray>
                                </div>

                                <div className={classes.formField}>
                                    <div className={classes.divLabel}>
                                        <span className={[classes.label, classes.labelRequired].join(' ')}>Reason</span>
                                    </div>
                                    <div style={{ widht: '100%' }}>
                                        <TextareaAutosize
                                            minRows={4}
                                            style={{
                                                width: '100%',
                                                padding: '5px',
                                                borderColor: `${errors?.reason && touched?.reason ? 'red' : 'black'}`,
                                            }}
                                            value={values.reason}
                                            onChange={(e) => setFieldValue('reason', e.target.value)}
                                        />
                                        {errors?.reason && touched?.reason && (
                                            <p style={{ margin: 0, color: 'red', fontSize: 12 }}>{errors?.reason}</p>
                                        )}
                                    </div>
                                </div>

                                <div className={`${classes.formFieldButton}`}>
                                    <Button
                                        type="button"
                                        onClick={() => {
                                            setFieldValue('apply', false);
                                            submitForm();
                                        }}
                                        className={classes.btn}
                                        variant="contained"
                                    >
                                        Submit
                                    </Button>
                                    <Button
                                        type="button"
                                        onClick={() => {
                                            setFieldValue('apply', true);
                                            submitForm();
                                        }}
                                        className={clsx(classes.btnSecondary)}
                                        variant="contained"
                                    >
                                        Submit and Apply
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Paper>
        </>
    );
};

export default StockTransferEdit;
