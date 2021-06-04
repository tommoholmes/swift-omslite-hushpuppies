/* eslint-disable no-unused-vars */
import React from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import Autocomplete from '@common_autocomplete';
import locationGqlService from '@modules/location/services/graphql';
import clsx from 'clsx';
import useStyles from './style';

const VirtualLocationInventoryEditContent = (props) => {
    const {
        formik,
    } = props;
    const classes = useStyles();
    const router = useRouter();
    const [getLocationList, getLocationListRes] = locationGqlService.getLocationList();
    const [getLocationVirtualList, getLocationVirtualListRes] = locationGqlService.getLocationList();

    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push('/cataloginventory/virtuallocationinventory')}
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
            <h2 className={classes.titleTop}>Edit Virtual Location</h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>Parent Location</span>
                        </div>
                        <Autocomplete
                            className={clsx(classes.autocompleteRoot, classes.labelRequired)}
                            mode="lazy"
                            value={formik.values.parentLocation}
                            onChange={(e) => formik.setFieldValue('parentLocation', e)}
                            loading={getLocationListRes.loading}
                            options={
                                getLocationListRes
                                && getLocationListRes.data
                                && getLocationListRes.data.getLocationList
                                && getLocationListRes.data.getLocationList.items
                            }
                            getOptions={getLocationList}
                            getOptionsVariables={
                                {
                                    variables: {
                                        filter: {
                                            is_virtual_location: { in: '0' },
                                        },
                                        pageSize: 100,
                                        currentPage: 1,
                                    },
                                }
                            }
                            primaryKey="loc_code"
                            labelKey="loc_name"
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>Virtual Location</span>
                        </div>
                        <Autocomplete
                            className={clsx(classes.autocompleteRoot, classes.labelRequired)}
                            mode="lazy"
                            value={formik.values.virtualLocation}
                            onChange={(e) => formik.setFieldValue('virtualLocation', e)}
                            loading={getLocationVirtualListRes.loading}
                            options={
                                getLocationVirtualListRes
                                && getLocationVirtualListRes.data
                                && getLocationVirtualListRes.data.getLocationList
                                && getLocationVirtualListRes.data.getLocationList.items
                            }
                            getOptions={getLocationVirtualList}
                            getOptionsVariables={
                                {
                                    variables: {
                                        filter: {
                                            is_virtual_location: { in: '1' },
                                        },
                                        pageSize: 100,
                                        currentPage: 1,
                                    },
                                }
                            }
                            primaryKey="loc_code"
                            labelKey="loc_name"
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>Percentage</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="percentage"
                            value={formik.values.percentage}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.percentage && formik.errors.percentage)}
                            helperText={(formik.touched.percentage && formik.errors.percentage) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>Priority</span>
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

export default VirtualLocationInventoryEditContent;
