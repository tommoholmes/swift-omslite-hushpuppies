/* eslint-disable no-unused-vars */
import React from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import Autocomplete from '@common_autocomplete';
import virtualStockGqlService from '@modules/virtualstock/services/graphql';
import productListGqlService from '@modules/productlist/services/graphql';
import clsx from 'clsx';
import useStyles from '@modules/overridestock/pages/create/components/style';

const OverridedStockCreateContent = (props) => {
    const { formik } = props;
    const classes = useStyles();
    const router = useRouter();
    const [getVirtualStockList, getVirtualStockListRes] = virtualStockGqlService.getVirtualStockList();
    const [getProductListBySku, getProductListBySkuRes] = productListGqlService.getProductListBySku();

    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push('/cataloginventory/overridestock')}
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
            <h2 className={classes.titleTop}>Create Override Stock</h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>Virtual Stock</span>
                        </div>
                        <Autocomplete
                            className={clsx(classes.autocompleteRoot, classes.autocompleteMulti)}
                            mode="lazy"
                            value={formik.values.virtualStock}
                            onChange={(e) => formik.setFieldValue('virtualStock', e)}
                            loading={getVirtualStockListRes.loading}
                            options={
                                getVirtualStockListRes
                                && getVirtualStockListRes.data
                                && getVirtualStockListRes.data.getVirtualStockList
                                && getVirtualStockListRes.data.getVirtualStockList.items
                            }
                            getOptions={getVirtualStockList}
                            getOptionsVariables={{
                                variables: {
                                    pageSize: null,
                                    currentPage: 1,
                                },
                            }}
                            primaryKey="vs_id"
                            labelKey="vs_name"
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>SKU</span>
                        </div>
                        <Autocomplete
                            className={clsx(classes.autocompleteRoot, classes.autocompleteMulti)}
                            mode="server"
                            value={formik.values.sku}
                            onChange={(e) => formik.setFieldValue('sku', e)}
                            loading={getProductListBySkuRes.loading}
                            options={
                                getProductListBySkuRes
                                && getProductListBySkuRes.data
                                && getProductListBySkuRes.data.getProductList
                                && getProductListBySkuRes.data.getProductList.items
                            }
                            getOptions={getProductListBySku}
                            primaryKey="sku"
                            labelKey="sku"
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>Quantity</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="qty"
                            value={formik.values.qty}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.qty && formik.errors.qty)}
                            helperText={(formik.touched.qty && formik.errors.qty) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>Reason</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="reason"
                            value={formik.values.reason}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.reason && formik.errors.reason)}
                            helperText={(formik.touched.reason && formik.errors.reason) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                </div>
                <div className={classes.formFieldButton}>
                    <Button className={classes.btn} onClick={formik.handleSubmit} variant="contained">
                        Submit
                    </Button>
                </div>
            </Paper>
        </>
    );
};

export default OverridedStockCreateContent;
