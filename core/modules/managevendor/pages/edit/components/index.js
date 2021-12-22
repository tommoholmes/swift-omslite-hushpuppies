/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable no-unused-vars */
import React from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import DropFile from '@common_dropfile';
import Autocomplete from '@common_autocomplete';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';

import { useRouter } from 'next/router';
import clsx from 'clsx';
import useStyles from '@modules/managevendor/pages/edit/components/style';

const ManageVendorEditContent = (props) => {
    const {
        formik, isVendor, vendor, handleDropFile, dataCourier, dataShipper,
    } = props;
    const classes = useStyles();
    const router = useRouter();
    const option = [
        {
            name: 'Yes',
            value: 1,
        },
        {
            name: 'No',
            value: 0,
        },
    ];

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 15 }}>
                <div>
                    <Button
                        className={classes.btnBack}
                        onClick={() => router.push('/vendorportal/managevendor')}
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
                        Manage Vendor
                        {' '}
                        {formik.values.company_name}
                    </h2>
                </div>
                <img
                    className="logo"
                    alt="logo"
                    src={vendor.logo}
                    style={{ width: 128, height: 'auto' }}
                    onError={(event) => event.target.style.display = 'none'}
                />
            </div>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <h5 className={classes.titleSmall}>
                        {isVendor ? 'Upload ' : ''}
                        Logo Vendor
                    </h5>
                    {isVendor
                        && (
                            <DropFile
                                error={formik.errors.logo && formik.touched.logo}
                                getBase64={(file) => handleDropFile('logo', file)}
                                formatFile=".jpg, .jpeg, .png, .gif"
                            />
                        )}
                    {formik.values.logo
                        ? (
                            <img
                                className="logo"
                                alt="logo"
                                src={formik.values.logo}
                                style={{ height: 128, width: 'auto', marginLeft: 20 }}
                                onError={(event) => event.target.style.display = 'none'}
                            />
                        ) : (
                            <img
                                className="logo"
                                alt="logo"
                                src="/assets/img/placeholder_image.jpg"
                                style={{ height: 128, width: 'auto', marginLeft: 20 }}
                                onError={(event) => event.target.style.display = 'none'}
                            />
                        )}
                </div>

                <div className={classes.content}>
                    <h5 className={classes.titleSmall}>
                        {isVendor ? 'Upload ' : ''}
                        Promotion Banner
                    </h5>
                    {isVendor
                        && (
                            <DropFile
                                error={formik.errors.promotion_banner && formik.touched.promotion_banner}
                                getBase64={(file) => handleDropFile('promotion_banner', file)}
                                formatFile=".jpg, .jpeg, .png, .gif"
                            />
                        )}

                    {formik.values.promotion_banner
                        ? (
                            <img
                                className="promotion_banner"
                                alt="promotion_banner"
                                src={formik.values.promotion_banner}
                                style={{ height: 128, width: 'auto', marginLeft: 20 }}
                                onError={(event) => event.target.style.display = 'none'}
                            />
                        ) : (
                            <img
                                className="logo"
                                alt="logo"
                                src="/assets/img/placeholder_image.jpg"
                                style={{ height: 128, width: 'auto', marginLeft: 20 }}
                                onError={(event) => event.target.style.display = 'none'}
                            />
                        )}
                </div>

                <div className={classes.content}>
                    <h5 className={classes.titleSmall}>Companny Information</h5>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>Vendor Code</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            disabled={!isVendor}
                            name="company_code"
                            value={formik.values.company_code}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.company_code && formik.errors.company_code)}
                            helperText={(formik.touched.company_code && formik.errors.company_code) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label)}>Vendor Name</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="company_name"
                            disabled={!isVendor}
                            value={formik.values.company_name}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.company_name && formik.errors.company_name)}
                            helperText={(formik.touched.company_name && formik.errors.company_name) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    {!isVendor
                        && (
                            <>
                                <div className={classes.formField}>
                                    <div className={classes.divLabel}>
                                        <span className={classes.label}>New Product</span>
                                    </div>
                                    <div className={clsx(classes.fieldRoot, classes.fieldRootDesc)} style={{ display: 'inline-block' }}>
                                        <TextField
                                            style={{ width: '100%' }}
                                            variant="outlined"
                                            select
                                            name="is_new_product"
                                            value={formik.values.is_new_product}
                                            onChange={formik.handleChange}
                                            helperText="Can upload new product"
                                            InputProps={{
                                                className: classes.fieldInput,
                                            }}
                                        >
                                            {option.map((item, index) => (
                                                <MenuItem value={item.value} key={index}>{item.name}</MenuItem>
                                            ))}
                                        </TextField>
                                    </div>
                                </div>

                                <div className={classes.formField}>
                                    <div className={classes.divLabel}>
                                        <span className={classes.label}>Margin</span>
                                    </div>
                                    <div className={clsx(classes.fieldRoot, classes.fieldRootDesc)} style={{ display: 'inline-block' }}>
                                        <TextField
                                            style={{ width: '100%' }}
                                            variant="outlined"
                                            name="company_margin"
                                            value={formik.values.company_margin}
                                            onChange={formik.handleChange}
                                            error={!!(formik.touched.company_margin && formik.errors.company_margin)}
                                            helperText={(formik.touched.company_margin && formik.errors.company_margin) || ''}
                                            InputProps={{
                                                className: classes.fieldInput,
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className={classes.formField}>
                                    <div className={classes.divLabel}>
                                        <span className={classes.label}>Product Auto Approval</span>
                                    </div>
                                    <div className={clsx(classes.fieldRoot, classes.fieldRootDesc)} style={{ display: 'inline-block' }}>
                                        <TextField
                                            style={{ width: '100%' }}
                                            variant="outlined"
                                            select
                                            name="is_product_approval"
                                            value={formik.values.is_product_approval}
                                            onChange={formik.handleChange}
                                            error={!!(formik.touched.is_product_approval && formik.errors.is_product_approval)}
                                            helperText="Can auto approve product"
                                            InputProps={{
                                                className: classes.fieldInput,
                                            }}
                                        >
                                            {option.map((item, index) => (
                                                <MenuItem value={item.value} key={index}>{item.name}</MenuItem>
                                            ))}
                                        </TextField>
                                    </div>
                                </div>
                            </>
                        )}
                </div>

                <div className={classes.content}>
                    <h5 className={classes.titleSmall}>Shipping</h5>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>Shipper Shipping</span>
                        </div>
                        <Autocomplete
                            multiple
                            className={classes.autocompleteRoot}
                            name="shipper_shipping"
                            value={typeof formik.values.shipper_shipping === 'object' ? formik.values.shipper_shipping
                                : [formik.values.shipper_shipping]}
                            onChange={(e) => formik.setFieldValue('shipper_shipping', e)}
                            primaryKey="value"
                            labelKey="label"
                            options={dataShipper}
                            fullWidth
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>Vendor Shipping</span>
                        </div>
                        <Autocomplete
                            multiple
                            className={classes.autocompleteRoot}
                            name="vendor_shipping"
                            value={typeof formik.values.vendor_shipping === 'object' ? formik.values.vendor_shipping
                                : [formik.values.vendor_shipping]}
                            onChange={(e) => formik.setFieldValue('vendor_shipping', e)}
                            primaryKey="value"
                            labelKey="label"
                            options={dataCourier}
                            fullWidth
                        />
                    </div>
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

export default ManageVendorEditContent;
