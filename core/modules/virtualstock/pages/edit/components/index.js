/* eslint-disable no-unused-vars */
import React from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Autocomplete from '@common_autocomplete';
import virtualStockGqlService from '@modules/virtualstock/services/graphql';
import channelGqlService from '@modules/channel/services/graphql';
import { optionsPriorityEnable, optionsPriorityType, optionsFramework } from '@modules/virtualstock/helpers';
import clsx from 'clsx';
import useStyles from './style';

const VirtualStockEditContent = (props) => {
    const {
        formik,
    } = props;
    const classes = useStyles();
    const router = useRouter();
    const [getLocationList, getLocationListRes] = virtualStockGqlService.getLocationList();
    const [getChannelList, getChannelListRes] = channelGqlService.getChannelList();

    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push('/cataloginventory/virtualstock')}
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
            <h2 className={classes.titleTop}>Edit Virtual Stock</h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <h2 className={classes.title}>General Information</h2>
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
                            <span className={classes.label}>Notes</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="notes"
                            value={formik.values.notes}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.notes && formik.errors.notes)}
                            helperText={(formik.touched.notes && formik.errors.notes) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                </div>
                <div className={classes.content}>
                    <h2 className={classes.title}>Priority</h2>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>Enable Priority</span>
                        </div>
                        <Autocomplete
                            className={classes.autocompleteRoot}
                            value={formik.values.priorityEnable}
                            onChange={(e) => formik.setFieldValue('priorityEnable', e)}
                            options={optionsPriorityEnable}
                            error={!!(formik.touched.priorityEnable && formik.errors.priorityEnable)}
                            helperText={(formik.touched.priorityEnable && formik.errors.priorityEnable) || ''}
                        />
                    </div>
                    {(formik.values.priorityEnable && formik.values.priorityEnable.id === 1) ? (
                        <>
                            <div className={classes.formField}>
                                <div className={classes.divLabel}>
                                    <span className={classes.label}>Priority Type</span>
                                </div>
                                <Autocomplete
                                    className={classes.autocompleteRoot}
                                    value={formik.values.priorityType}
                                    onChange={(e) => formik.setFieldValue('priorityType', e)}
                                    options={optionsPriorityType}
                                    error={!!(formik.touched.priorityType && formik.errors.priorityType)}
                                    helperText={(formik.touched.priorityType && formik.errors.priorityType) || ''}
                                />
                            </div>
                            {(formik.values.priorityEnable && formik.values.priorityType.name === 'channel') ? (
                                <div className={classes.formField}>
                                    <div className={classes.divLabel}>
                                        <span className={classes.label}>Channel</span>
                                    </div>
                                    <Autocomplete
                                        className={classes.autocompleteRoot}
                                        mode="lazy"
                                        value={formik.values.channelPriority}
                                        onChange={(e) => formik.setFieldValue('channelPriority', e)}
                                        loading={getChannelListRes.loading}
                                        options={
                                            getChannelListRes
                                            && getChannelListRes.data
                                            && getChannelListRes.data.getChannelList
                                            && getChannelListRes.data.getChannelList.items
                                        }
                                        getOptions={getChannelList}
                                        primaryKey="channel_id"
                                        labelKey="channel_name"
                                    />
                                </div>
                            ) : (
                                <div className={classes.formField}>
                                    <div className={classes.divLabel}>
                                        <span className={classes.label}>Framework</span>
                                    </div>
                                    <Autocomplete
                                        className={classes.autocompleteRoot}
                                        value={formik.values.frameworkPriority}
                                        onChange={(e) => formik.setFieldValue('frameworkPriority', e)}
                                        options={optionsFramework}
                                        error={!!(formik.touched.frameworkPriority && formik.errors.frameworkPriority)}
                                        helperText={(formik.touched.frameworkPriority && formik.errors.frameworkPriority) || ''}
                                    />
                                </div>
                            )}
                            <div className={classes.formField}>
                                <div className={classes.divLabel}>
                                    <span className={classes.label}>Minimal Stock</span>
                                </div>
                                <TextField
                                    className={classes.fieldRoot}
                                    variant="outlined"
                                    name="minStock"
                                    value={formik.values.minStock}
                                    onChange={formik.handleChange}
                                    error={!!(formik.touched.minStock && formik.errors.minStock)}
                                    helperText={(formik.touched.minStock && formik.errors.minStock) || ''}
                                    InputProps={{
                                        className: classes.fieldInput,
                                    }}
                                />
                            </div>
                        </>
                    ) : null}
                </div>
                <div className={classes.content}>
                    <h2 className={classes.title}>Locations</h2>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}> Assigned Locations</span>
                        </div>
                        <Autocomplete
                            className={clsx(classes.autocompleteRoot, classes.autocompleteMulti)}
                            mode="lazy"
                            multiple
                            value={formik.values.location}
                            onChange={(e) => formik.setFieldValue('location', e)}
                            loading={getLocationListRes.loading}
                            options={
                                getLocationListRes
                                && getLocationListRes.data
                                && getLocationListRes.data.getLocationList
                                && getLocationListRes.data.getLocationList.items
                            }
                            getOptions={getLocationList}
                            getOptionLabel={(option) => ((option && (`${option.loc_code } - ${ option.loc_name}`)) || '')}
                            primaryKey="loc_id"
                            labelKey="loc_code"
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

export default VirtualStockEditContent;
