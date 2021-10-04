/* eslint-disable no-unused-vars */
import React from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Autocomplete from '@common_autocomplete';
import priorityLocationGqlService from '@modules/prioritylocation/services/graphql';
import useStyles from '@modules/prioritylocation/pages/create/components/style';

const PriorityLocationCreateContent = (props) => {
    const {
        formik,
    } = props;
    const classes = useStyles();
    const router = useRouter();
    const [getChannelList, getChannelListRes] = priorityLocationGqlService.getChannelList();
    const [getCityList, getCityListRes] = priorityLocationGqlService.getCityList();
    const [getLocationList, getLocationListRes] = priorityLocationGqlService.getLocationList();

    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push('/oms/prioritylocation')}
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
            <h2 className={classes.titleTop}>Create Priority Location</h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}> Channel Code</span>
                        </div>
                        <Autocomplete
                            className={classes.autocompleteRoot}
                            mode="lazy"
                            value={formik.values.channelCode}
                            onChange={(e) => formik.setFieldValue('channelCode', e)}
                            loading={getChannelListRes.loading}
                            options={
                                getChannelListRes
                                && getChannelListRes.data
                                && getChannelListRes.data.getChannelList
                                && getChannelListRes.data.getChannelList.items
                            }
                            getOptions={getChannelList}
                            getOptionLabel={(option) => ((option && (`${option.channel_code } - ${ option.channel_name}`)) || '')}
                            primaryKey="channel_id"
                            labelKey="channel_name"
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}> City</span>
                        </div>
                        <Autocomplete
                            className={classes.autocompleteRoot}
                            mode="lazy"
                            value={formik.values.city}
                            onChange={(e) => formik.setFieldValue('city', e)}
                            loading={getCityListRes.loading}
                            options={
                                getCityListRes
                                && getCityListRes.data
                                && getCityListRes.data.getCityList
                                && getCityListRes.data.getCityList.items
                            }
                            getOptions={getCityList}
                            primaryKey="id"
                            labelKey="city"
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}> Location Code</span>
                        </div>
                        <Autocomplete
                            className={classes.autocompleteRoot}
                            mode="lazy"
                            value={formik.values.locationCode}
                            onChange={(e) => formik.setFieldValue('locationCode', e)}
                            loading={getLocationListRes.loading}
                            options={
                                getLocationListRes
                                && getLocationListRes.data
                                && getLocationListRes.data.getLocationList
                                && getLocationListRes.data.getLocationList.items
                            }
                            getOptions={getLocationList}
                            primaryKey="loc_id"
                            labelKey="loc_name"
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
                            type="text"
                            value={formik.values.priority}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.priority && formik.errors.priority)}
                            helperText={(formik.touched.priority && formik.errors.priority) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
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

export default PriorityLocationCreateContent;
