/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable consistent-return */

import React from 'react';
import { useRouter } from 'node_modules/next/router';
import useStyles from '@modules/stockadjustment/pages/edit/components/style';
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

const StockAdjustmentEdit = (props) => {
    const [getLocationList, getLocationListRes] = gqlLocation.getLocationList();
    const [getSourceList, getSourceListRes] = gqlSource.getSourceList();
    const { initialValues, submitHandler } = props;
    const classes = useStyles();
    const router = useRouter();
    const [locID, setLocID] = React.useState(0);
    const [searchSku, setSearchSku] = React.useState('');
    const [searchLocation, setSearchLocation] = React.useState('');
    const [customer_loc_code, setCustomerLocCode] = React.useState([]);
    const [baseSkuOption, setBaseSkuOption] = React.useState([]);
    const alreadyFetch = React.useRef(true);
    const firstRender1 = React.useRef(true);
    const firstRender2 = React.useRef(true);

    React.useEffect(() => {
        if (!firstRender1.current) {
            const onChangeTimeOut = setTimeout(() => {
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
                return 0;
            }, 500);

            return () => clearTimeout(onChangeTimeOut);
        }
        firstRender1.current = false;
    }, [searchSku]);

    React.useEffect(() => {
        if (!firstRender2.current) {
            const onChangeTimeOut = setTimeout(() => {
                getLocationList({
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
                });
                return 0;
            }, 500);

            return () => clearTimeout(onChangeTimeOut);
        }
        if (
            getLocationListRes
            && getLocationListRes.data
            && getLocationListRes.data.getLocationList
            && getLocationListRes.data.getLocationList.items
        ) {
            firstRender2.current = false;
        }
    }, [searchLocation]);

    const handleSearchSkuChange = (e) => {
        setSearchSku(e && e.target && e.target.value.toString());
    };

    const handleSearchLocationChange = (e) => {
        setSearchLocation(e && e.target && e.target.value.toString());
    };

    const handleSetUserInfo = (customer) => {
        const customerLocCodeTemp = customer && customer.customer_loc_code;
        setCustomerLocCode(customerLocCodeTemp.split(','));
    };

    React.useEffect(() => {
        getLocationList({
            variables: {
                pageSize: 1,
                currentPage: 1,
                filter: {
                    loc_code: {
                        eq: initialValues.loc_code.loc_code,
                    },
                },
            },
        });
        if (Cookies.getJSON(custDataNameCookie)) {
            handleSetUserInfo(Cookies.getJSON(custDataNameCookie));
        }
    }, []);

    React.useEffect(() => {
        if (alreadyFetch.current) {
            if (
                getLocationListRes
                && getLocationListRes.data
                && getLocationListRes.data.getLocationList
                && getLocationListRes.data.getLocationList.items
            ) {
                setLocID(getLocationListRes.data.getLocationList.items[0].loc_id);
                alreadyFetch.current = false;
            }
        }
    }, [getLocationListRes.data]);

    React.useEffect(() => {
        if (getSourceListRes && getSourceListRes.data && getSourceListRes.data.getSourceList && getSourceListRes.data.getSourceList.items) {
            setBaseSkuOption([...baseSkuOption, ...getSourceListRes.data.getSourceList.items]);
        }
    }, [getSourceListRes.data]);

    const editchemaValidaton = Yup.object().shape({
        loc_code: Yup.object().required('Required!'),
        reason: Yup.string().required('Required!'),
        items: Yup.array()
            .of(
                Yup.object().shape({
                    sku: Yup.object().required('Required!'),
                    stock_adjustment: Yup.number().required('Required!'),
                }),
            )
            .min(1)
            .required('Required!'),
    });

    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push('/cataloginventory/stockadjustment')}
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
                Edit Stock Adjustment #
                {initialValues.increment_id}
            </h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <h2 className={classes.title}>Stock Adjustment Information</h2>
                    <Formik initialValues={initialValues} onSubmit={submitHandler} validationSchema={editchemaValidaton}>
                        {({ values, setFieldValue, submitForm }) => (
                            <Form>
                                <div className={classes.formField}>
                                    <div className={classes.divLabel}>
                                        <span className={[classes.label, classes.labelRequired].join(' ')}>Location</span>
                                    </div>
                                    <Autocomplete
                                        mode="lazy"
                                        className={classes.autocompleteRoot}
                                        value={values.loc_code}
                                        onChange={(e) => {
                                            setFieldValue('loc_code', e);
                                            setLocID(e.loc_id);
                                            setFieldValue('items', []);
                                        }}
                                        loading={getLocationListRes.loading}
                                        options={
                                            getLocationListRes
                                            && getLocationListRes.data
                                            && getLocationListRes.data.getLocationList
                                            && getLocationListRes.data.getLocationList.items
                                        }
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
                                        onInputChange={handleSearchLocationChange}
                                    />
                                </div>
                                <div className={classes.formField}>
                                    <div className={classes.divLabel}>
                                        <span className={[classes.label, classes.labelRequired].join(' ')}>Product</span>
                                    </div>

                                    <FieldArray name="items">
                                        {({ remove, push }) => (
                                            <>
                                                {values.items.length > 0 && (
                                                    <table className={classes.table}>
                                                        <thead className={classes.th}>
                                                            <tr className={classes.tr}>
                                                                <td className={classes.td}>SKU Product</td>
                                                                <td className={classes.td}>Qty Available</td>
                                                                <td className={classes.td}>Qty Adjustment</td>
                                                                <td className={classes.td}>Action</td>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {values.items.map((item, idx) => (
                                                                <tr key={idx}>
                                                                    <td className={classes.td}>
                                                                        {!item.entity_id ? (
                                                                            <Autocomplete
                                                                                name={`items.${idx}.sku`}
                                                                                mode="lazy"
                                                                                className={classes.autocomplete}
                                                                                value={values.items[idx].sku}
                                                                                onChange={(e) => {
                                                                                    setFieldValue(`items.${idx}.stock_available`, e?.qty_total ?? 0);
                                                                                    setFieldValue(`items.${idx}.sku`, {
                                                                                        sku: e?.sku ?? '',
                                                                                        source_id: e?.source_id ?? '',
                                                                                    });
                                                                                }}
                                                                                loading={!values.items[idx].sku && getSourceListRes.loading}
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
                                                                                onInputChange={handleSearchSkuChange}
                                                                                defaultValue={{ sku: 'select', source_id: 0 }}
                                                                            />
                                                                        ) : (
                                                                            item.sku
                                                                        )}
                                                                    </td>
                                                                    <td className={classes.td}>{item.stock_available}</td>
                                                                    <td className={classes.td}>
                                                                        <Field
                                                                            className={classes.fieldQty}
                                                                            name={`items.${idx}.stock_adjustment`}
                                                                            type="number"
                                                                        />
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
                                                            entity_id: null,
                                                            stock_adjustment: 0,
                                                            stock_available: 0,
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
                                            style={{ width: '100%', padding: '5px' }}
                                            value={values.reason}
                                            onChange={(e) => setFieldValue('reason', e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className={`${classes.formFieldButton}`}>
                                    <Button
                                        type="button"
                                        onClick={() => {
                                            setFieldValue('is_apply', false);
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
                                            setFieldValue('is_apply', true);
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

export default StockAdjustmentEdit;
