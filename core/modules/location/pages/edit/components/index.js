/* eslint-disable no-unused-vars */
import React from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Autocomplete from '@common_autocomplete';
import companyGqlService from '@modules/company/services/graphql';
import locationGqlService from '@modules/location/services/graphql';
import clsx from 'clsx';
import useStyles from '@modules/location/pages/edit/components/style';
import { optionsYesNo, optionsActive, optionsZone } from '@modules/location/helpers';

const LocationEditContent = (props) => {
    const { formik } = props;
    const classes = useStyles();
    const router = useRouter();
    const [getCompanyList, getCompanyListRes] = companyGqlService.getCompanyList();
    const [getCountries, getCountriesRes] = locationGqlService.getCountries();
    const [getCountry, getCountryRes] = locationGqlService.getCountry();
    const [getCityList, getCityListRes] = locationGqlService.getCityList();
    const isIndonesia = () => formik && formik.values && formik.values.countries && formik.values.countries.id === 'ID';
    const [getCityKecByRegionCode, getCityKecByRegionCodeRes] = locationGqlService.getCityKecByRegionCode();

    React.useEffect(() => {
        getCountry({ variables: { id: formik.values.countries && formik.values.countries.id } });
    }, []);

    React.useEffect(() => {
        if (getCountryRes.data && getCountryRes.data.country && getCountryRes.data.country.available_regions) {
            const currentRegion = getCountryRes.data.country.available_regions.find((val) => val.name === formik.values.region.name);
            formik.setFieldValue('region', currentRegion);
        }
    }, [getCountryRes.data]);

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
            <h2 className={classes.titleTop}>Edit Location</h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>Company</span>
                        </div>
                        <Autocomplete
                            className={classes.autocompleteRoot}
                            mode="lazy"
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
                            onChange={(e) => {
                                formik.setFieldValue('countries', e);
                                formik.setFieldValue('region', null);
                                formik.setFieldValue('city', null);
                            }}
                            loading={getCountriesRes.loading}
                            options={getCountriesRes && getCountriesRes.data && getCountriesRes.data.countries}
                            getOptions={getCountries}
                            primaryKey="id"
                            labelKey="full_name_english"
                            error={!!(formik.touched.countries && formik.errors.countries)}
                            helperText={(formik.touched.countries && formik.errors.countries) || ''}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}> Province</span>
                        </div>
                        {isIndonesia() && (
                            <Autocomplete
                                disabled={!(formik.values.countries && formik.values.countries.id)}
                                className={classes.autocompleteRoot}
                                mode="lazy"
                                value={formik.values.region}
                                onChange={(e) => {
                                    formik.setFieldValue('region', e);
                                    formik.setFieldValue('city', null);
                                }}
                                loading={getCountryRes.loading}
                                options={
                                    getCountryRes && getCountryRes.data && getCountryRes.data.country && getCountryRes.data.country.available_regions
                                }
                                getOptions={getCountry}
                                getOptionsVariables={{ variables: { id: formik.values.countries && formik.values.countries.id } }}
                                primaryKey="id"
                                labelKey="name"
                                error={!!(formik.touched.region && formik.errors.region)}
                                helperText={(formik.touched.region && formik.errors.region) || ''}
                            />
                        )}
                        {!isIndonesia() && (
                            <TextField
                                className={classes.fieldRoot}
                                variant="outlined"
                                name="region"
                                value={(formik.values.region && formik.values.region.name) || ''}
                                onChange={(e) => {
                                    formik.setFieldValue('region', {
                                        id: e.target.value,
                                        name: e.target.value,
                                    });
                                }}
                                error={!!(formik.touched.region && formik.errors.region)}
                                helperText={(formik.touched.region && formik.errors.region) || ''}
                                InputProps={{ className: classes.fieldInput }}
                            />
                        )}
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>City</span>
                        </div>
                        {isIndonesia() && (
                            <Autocomplete
                                disabled={!(formik.values.region && formik.values.region.id)}
                                className={classes.autocompleteRoot}
                                mode="lazy"
                                value={formik.values.city}
                                onChange={(e) => formik.setFieldValue('city', e)}
                                loading={getCityKecByRegionCodeRes.loading}
                                options={
                                    getCityKecByRegionCodeRes
                                    && getCityKecByRegionCodeRes.data
                                    && getCityKecByRegionCodeRes.data.getCityKecByRegionCode
                                }
                                getOptions={getCityKecByRegionCode}
                                getOptionsVariables={{
                                    variables: {
                                        region_code: formik.values.region.code,
                                    },
                                }}
                                primaryKey="value"
                                labelKey="label"
                                error={!!(formik.touched.city && formik.errors.city)}
                                helperText={(formik.touched.city && formik.errors.city) || ''}
                            />
                        )}
                        {!isIndonesia() && (
                            <TextField
                                className={classes.fieldRoot}
                                variant="outlined"
                                name="city"
                                value={(formik.values.city && formik.values.city.value) || ''}
                                onChange={(e) => {
                                    formik.setFieldValue('city', {
                                        id: e.target.value,
                                        value: e.target.value,
                                    });
                                }}
                                error={!!(formik.touched.city && formik.errors.city)}
                                helperText={(formik.touched.city && formik.errors.city) || ''}
                                InputProps={{ className: classes.fieldInput }}
                            />
                        )}
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

export default LocationEditContent;
