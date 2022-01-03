/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Autocomplete from '@common_autocomplete';
import companyGqlService from '@modules/company/services/graphql';
import locationGqlService from '@modules/location/services/graphql';
import clsx from 'clsx';
import useStyles from '@modules/location/pages/create/components/style';
import {
    optionsYesNo, optionsActive, optionsZone, optionsQtyBuffer,
} from '@modules/location/helpers';

const LocationCreateContent = (props) => {
    const { formik, customer } = props;
    const classes = useStyles();
    const router = useRouter();
    const [getCompanyList, getCompanyListRes] = companyGqlService.getCompanyList();
    const [getCountries, getCountriesRes] = locationGqlService.getCountries();
    const [getCountry, getCountryRes] = locationGqlService.getCountry();
    const [getCityKecByRegionCode, getCityKecByRegionCodeRes] = locationGqlService.getCityKecByRegionCode();

    const isCustomerVendor = customer?.customer_company_code !== null;
    const firstRender = useRef(true);

    useEffect(() => {
        if (isCustomerVendor) {
            getCompanyList({
                variables: {
                    pageSize: 20,
                    currentPage: 1,
                },
            });
        }
    }, []);

    useEffect(() => {
        if (
            firstRender.current
            && isCustomerVendor
            && getCompanyListRes
            && getCompanyListRes.data
            && getCompanyListRes.data.getCompanyList
            && getCompanyListRes.data.getCompanyList.items
        ) {
            const company = getCompanyListRes.data.getCompanyList.items.find((item) => item.company_id === Number(customer.customer_company_code));
            formik.setFieldValue('company', company ?? null);
            firstRender.current = false;
        }
    }, [getCompanyListRes]);

    return (
        <>
            <Button className={classes.btnBack} onClick={() => router.push('/oms/location')} variant="contained" style={{ marginRight: 16 }}>
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
            <h2 className={classes.titleTop}>Create Location</h2>
            <Paper className={classes.container}>
                <div className={classes.contentWithoutBorder}>
                    <h5 className={classes.titleSmall}>Location Information</h5>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>Status</span>
                        </div>
                        <Autocomplete
                            className={classes.autocompleteRoot}
                            value={formik.values.status}
                            onChange={(e) => formik.setFieldValue('status', e)}
                            options={optionsActive}
                            error={!!(formik.touched.status && formik.errors.status)}
                            helperText={(formik.touched.status && formik.errors.status) || ''}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>Company</span>
                        </div>
                        <Autocomplete
                            className={classes.autocompleteRoot}
                            mode={isCustomerVendor ? 'default' : 'lazy'}
                            value={formik.values.company}
                            onChange={(e) => formik.setFieldValue('company', e)}
                            loading={getCompanyListRes.loading}
                            options={
                                getCompanyListRes
                                && getCompanyListRes.data
                                && getCompanyListRes.data.getCompanyList
                                && getCompanyListRes.data.getCompanyList.items
                            }
                            getOptions={getCompanyList}
                            primaryKey="company_id"
                            labelKey="company_name"
                            disabled={isCustomerVendor}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>Code</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="code"
                            value={formik.values.code}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.code && formik.errors.code)}
                            helperText={(formik.touched.code && formik.errors.code) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>Name</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.name && formik.errors.name)}
                            helperText={(formik.touched.name && formik.errors.name) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>Adress</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="street"
                            value={formik.values.street}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.street && formik.errors.street)}
                            helperText={(formik.touched.street && formik.errors.street) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}> Country</span>
                        </div>
                        <Autocomplete
                            className={classes.autocompleteRoot}
                            mode="lazy"
                            value={formik.values.countries}
                            onChange={(e) => formik.setFieldValue('countries', e)}
                            loading={getCountriesRes.loading}
                            options={getCountriesRes && getCountriesRes.data && getCountriesRes.data.countries}
                            getOptions={getCountries}
                            primaryKey="id"
                            labelKey="full_name_english"
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}> Province</span>
                        </div>
                        <Autocomplete
                            disabled={!(formik.values.countries && formik.values.countries.id)}
                            className={classes.autocompleteRoot}
                            mode="lazy"
                            value={formik.values.region}
                            onChange={(e) => formik.setFieldValue('region', e)}
                            loading={getCountryRes.loading}
                            options={
                                getCountryRes && getCountryRes.data && getCountryRes.data.country && getCountryRes.data.country.available_regions
                            }
                            getOptions={getCountry}
                            getOptionsVariables={{ variables: { id: formik.values.countries && formik.values.countries.id } }}
                            primaryKey="id"
                            labelKey="name"
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>City</span>
                        </div>
                        <Autocomplete
                            disabled={!(formik.values.region && formik.values.region.id)}
                            className={classes.autocompleteRoot}
                            mode="lazy"
                            value={formik.values.city}
                            onChange={(e) => formik.setFieldValue('city', e)}
                            loading={getCityKecByRegionCodeRes.loading}
                            options={
                                getCityKecByRegionCodeRes && getCityKecByRegionCodeRes.data && getCityKecByRegionCodeRes.data.getCityKecByRegionCode
                            }
                            getOptions={getCityKecByRegionCode}
                            getOptionsVariables={{
                                variables: {
                                    region_code: formik.values.region.code,
                                },
                            }}
                            primaryKey="value"
                            labelKey="label"
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>Telephone</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="telephone"
                            value={formik.values.telephone}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.telephone && formik.errors.telephone)}
                            helperText={(formik.touched.telephone && formik.errors.telephone) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>Zip Code</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="postcode"
                            value={formik.values.postcode}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.postcode && formik.errors.postcode)}
                            helperText={(formik.touched.postcode && formik.errors.postcode) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>Longitude</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="longitude"
                            value={formik.values.longitude}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.longitude && formik.errors.longitude)}
                            helperText={(formik.touched.longitude && formik.errors.longitude) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>Latitude</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="latitude"
                            value={formik.values.latitude}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.latitude && formik.errors.latitude)}
                            helperText={(formik.touched.latitude && formik.errors.latitude) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                </div>
            </Paper>
            {!isCustomerVendor && (
                <Paper className={classes.container}>
                    <div className={classes.contentWithoutBorder}>
                        <h5 className={classes.titleSmall}>Additional Settings</h5>
                        <div className={classes.formField}>
                            <div className={classes.divLabel}>
                                <span className={classes.label}>Zona</span>
                            </div>
                            <Autocomplete
                                className={classes.autocompleteRoot}
                                value={formik.values.zone}
                                onChange={(e) => formik.setFieldValue('zone', e)}
                                options={optionsZone}
                                error={!!(formik.touched.zone && formik.errors.zone)}
                                helperText={(formik.touched.zone && formik.errors.zone) || ''}
                            />
                        </div>
                        <div className={classes.formField}>
                            <div className={classes.divLabel}>
                                <span className={classes.label}>Is Warehouse</span>
                            </div>
                            <Autocomplete
                                className={classes.autocompleteRoot}
                                value={formik.values.warehouse}
                                onChange={(e) => formik.setFieldValue('warehouse', e)}
                                options={optionsYesNo}
                                error={!!(formik.touched.warehouse && formik.errors.warehouse)}
                                helperText={(formik.touched.warehouse && formik.errors.warehouse) || ''}
                            />
                        </div>
                        <div className={classes.formField}>
                            <div className={classes.divLabel}>
                                <span className={classes.label}>Use in Frontend</span>
                            </div>
                            <Autocomplete
                                className={classes.autocompleteRoot}
                                value={formik.values.useFrontend}
                                onChange={(e) => formik.setFieldValue('useFrontend', e)}
                                options={optionsYesNo}
                                error={!!(formik.touched.useFrontend && formik.errors.useFrontend)}
                                helperText={(formik.touched.useFrontend && formik.errors.useFrontend) || ''}
                            />
                        </div>
                        <div className={classes.formField}>
                            <div className={classes.divLabel}>
                                <span className={classes.label}>Is Sirclo Warehouse</span>
                            </div>
                            <Autocomplete
                                className={classes.autocompleteRoot}
                                value={formik.values.sircloWarehouse}
                                onChange={(e) => formik.setFieldValue('sircloWarehouse', e)}
                                options={optionsYesNo}
                                error={!!(formik.touched.sircloWarehouse && formik.errors.sircloWarehouse)}
                                helperText={(formik.touched.sircloWarehouse && formik.errors.sircloWarehouse) || ''}
                            />
                        </div>
                        <div className={classes.formField}>
                            <div className={classes.divLabel}>
                                <span className={classes.label}>Is Virtual Location</span>
                            </div>
                            <Autocomplete
                                className={classes.autocompleteRoot}
                                value={formik.values.virtualLocation}
                                onChange={(e) => formik.setFieldValue('virtualLocation', e)}
                                options={optionsYesNo}
                                error={!!(formik.touched.virtualLocation && formik.errors.virtualLocation)}
                                helperText={(formik.touched.virtualLocation && formik.errors.virtualLocation) || ''}
                            />
                        </div>
                        <div className={classes.formField}>
                            <div className={classes.divLabel}>
                                <span className={classes.label}>Priority</span>
                            </div>
                            <TextField
                                className={classes.fieldRoot}
                                variant="outlined"
                                name="priority"
                                value={formik.values.priority}
                                onChange={formik.handleChange}
                                error={!!(formik.touched.priority && formik.errors.priority)}
                                helperText={(formik.touched.priority && formik.errors.priority) || ''}
                                InputProps={{
                                    className: classes.fieldInput,
                                }}
                            />
                        </div>
                        <div className={classes.formField}>
                            <div className={classes.divLabel}>
                                <span className={classes.label}>Qty Buffer</span>
                            </div>
                            <Autocomplete
                                className={classes.autocompleteRoot}
                                value={formik.values.qty_buffer}
                                onChange={(e) => formik.setFieldValue('qty_buffer', e)}
                                options={optionsQtyBuffer}
                                error={!!(formik.touched.qty_buffer && formik.errors.qty_buffer)}
                                helperText={(formik.touched.qty_buffer && formik.errors.qty_buffer) || ''}
                            />
                        </div>
                        <div className={classes.formField}>
                            <div className={classes.divLabel}>
                                <span className={classes.label}>Is Manage Stock</span>
                            </div>
                            <Autocomplete
                                className={classes.autocompleteRoot}
                                value={formik.values.is_manage_stock}
                                onChange={(e) => formik.setFieldValue('is_manage_stock', e)}
                                options={optionsYesNo}
                                error={!!(formik.touched.is_manage_stock && formik.errors.is_manage_stock)}
                                helperText={(formik.touched.is_manage_stock && formik.errors.is_manage_stock) || ''}
                            />
                        </div>
                        <div className={classes.formField}>
                            <div className={classes.divLabel}>
                                <span className={classes.label}>Is Shipment Auto Complete</span>
                            </div>
                            <Autocomplete
                                className={classes.autocompleteRoot}
                                value={formik.values.is_shipment_auto_complete}
                                onChange={(e) => formik.setFieldValue('is_shipment_auto_complete', e)}
                                options={optionsYesNo}
                                error={!!(formik.touched.is_shipment_auto_complete && formik.errors.is_shipment_auto_complete)}
                                helperText={(formik.touched.is_shipment_auto_complete && formik.errors.is_shipment_auto_complete) || ''}
                            />
                        </div>
                        <div className={classes.formField}>
                            <div className={classes.divLabel}>
                                <span className={classes.label}>Shipper ID </span>
                            </div>
                            <TextField
                                className={classes.fieldRoot}
                                variant="outlined"
                                name="shipper_id"
                                value={formik.values.shipper_id}
                                onChange={formik.handleChange}
                                error={!!(formik.touched.shipper_id && formik.errors.shipper_id)}
                                helperText={(formik.touched.shipper_id && formik.errors.shipper_id) || ''}
                                InputProps={{
                                    className: classes.fieldInput,
                                }}
                            />
                        </div>
                    </div>
                </Paper>
            )}
            <div className={classes.formFieldButton}>
                <Button className={classes.btn} onClick={formik.handleSubmit} variant="contained">
                    Submit
                </Button>
            </div>
        </>
    );
};

export default LocationCreateContent;
