/* eslint-disable no-unused-vars */
import React from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Autocomplete from '@common_autocomplete';
import locationGqlService from '@modules/location/services/graphql';
import clsx from 'clsx';
import useStyles from '@modules/locationpickup/pages/edit/components/style';
import { optionsActive } from '@modules/locationpickup/helpers';

const LocationPickupEditContent = (props) => {
    const [getLocationList, getLocationListRes] = locationGqlService.getLocationList();
    const { formik } = props;
    const classes = useStyles();
    const router = useRouter();
    const [locationOption, setLocationOption] = React.useState([]);
    const [locationSearch, setLocationSearch] = React.useState('');

    React.useEffect(() => {
        const onChangeTimeOut = setTimeout(() => {
            const isExist = locationSearch && locationOption.filter((elm) => elm?.loc_name?.toLowerCase().includes(locationSearch?.toLowerCase()));
            if (locationSearch && isExist.length === 0) {
                getLocationList({
                    variables: {
                        search: locationSearch,
                        pageSize: 20,
                        currentPage: 1,
                    },
                });
            }

            return null;
        }, 500);

        return () => clearTimeout(onChangeTimeOut);
    }, [locationSearch]);

    React.useEffect(() => {
        if (
            getLocationListRes
            && getLocationListRes.data
            && getLocationListRes.data.getLocationList
            && getLocationListRes.data.getLocationList.items
        ) {
            setLocationOption([...locationOption, ...getLocationListRes.data.getLocationList.items]);
        }
    }, [getLocationListRes.data]);

    return (
        <>
            <Button className={classes.btnBack} onClick={() => router.push('/oms/locationpickup')} variant="contained" style={{ marginRight: 16 }}>
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
            <h2 className={classes.titleTop}>Create Location Pickup</h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>Parent Location</span>
                        </div>
                        <Autocomplete
                            className={classes.autocompleteRoot}
                            mode="lazy"
                            value={formik.values.loc}
                            onChange={(e) => formik.setFieldValue('loc', e)}
                            loading={getLocationListRes.loading}
                            options={locationOption}
                            onInputChange={(e) => {
                                setLocationSearch(e && e.target && e.target.value);
                            }}
                            getOptions={getLocationList}
                            primaryKey="loc_id"
                            labelKey="loc_name"
                            error={!!(formik.touched.loc && formik.errors.loc)}
                            helperText={(formik.touched.loc && formik.errors.loc) || ''}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>Pickup Name</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="pickup_name"
                            value={formik.values.pickup_name}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.pickup_name && formik.errors.pickup_name)}
                            helperText={(formik.touched.pickup_name && formik.errors.pickup_name) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>Pickup Type</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="pickup_type"
                            value={formik.values.pickup_type}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.pickup_type && formik.errors.pickup_type)}
                            helperText={(formik.touched.pickup_type && formik.errors.pickup_type) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>Pickup Description</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="pickup_description"
                            value={formik.values.pickup_description}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.pickup_description && formik.errors.pickup_description)}
                            helperText={(formik.touched.pickup_description && formik.errors.pickup_description) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>Pickup Phone</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="pickup_phone"
                            value={formik.values.pickup_phone}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.pickup_phone && formik.errors.pickup_phone)}
                            helperText={(formik.touched.pickup_phone && formik.errors.pickup_phone) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>Pickup Charge</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="pickup_charge"
                            value={formik.values.pickup_charge}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.pickup_charge && formik.errors.pickup_charge)}
                            helperText={(formik.touched.pickup_charge && formik.errors.pickup_charge) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label)}>Pickup Fulfillment Time</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="pickup_fulfillment_time"
                            value={formik.values.pickup_fulfillment_time}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.pickup_fulfillment_time && formik.errors.pickup_fulfillment_time)}
                            helperText={(formik.touched.pickup_fulfillment_time && formik.errors.pickup_fulfillment_time) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>Status</span>
                        </div>
                        <Autocomplete
                            className={classes.autocompleteRoot}
                            value={formik.values.status}
                            onChange={(e) => formik.setFieldValue('status', e)}
                            options={optionsActive}
                            primaryKey="id"
                            labelKey="name"
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

export default LocationPickupEditContent;
