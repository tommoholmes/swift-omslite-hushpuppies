/* eslint-disable no-unused-vars */
import React from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import Autocomplete from '@common_autocomplete';
import locationGqlService from '@modules/location/services/graphql';
import channelGqlService from '@modules/channel/services/graphql';
import clsx from 'clsx';
import useStyles from '@modules/warehouse/pages/edit/components/style';

const WarehouseEditContent = (props) => {
    const {
        formik,
    } = props;
    const classes = useStyles();
    const router = useRouter();
    const [getLocationList, getLocationListRes] = locationGqlService.getLocationList();
    const [getChannelList, getChannelListRes] = channelGqlService.getChannelList();

    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push('/marketplace/warehouse')}
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
            <h2 className={classes.titleTop}>Edit Marketplace Warehouse</h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>Channel</span>
                        </div>
                        <Autocomplete
                            className={clsx(classes.autocompleteRoot, classes.labelRequired)}
                            mode="lazy"
                            value={formik.values.channel}
                            onChange={(e) => formik.setFieldValue('channel', e)}
                            loading={getChannelListRes.loading}
                            options={
                                getChannelListRes
                                && getChannelListRes.data
                                && getChannelListRes.data.getChannelList
                                && getChannelListRes.data.getChannelList.items
                            }
                            getOptions={getChannelList}
                            getOptionsVariables={
                                {
                                    variables: {
                                        filter: {
                                            framework: { in: 'marketplace' },
                                        },
                                        pageSize: 50,
                                        currentPage: 1,
                                    },
                                }
                            }
                            primaryKey="channel_code"
                            labelKey="channel_name"
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={clsx(classes.label, classes.labelRequired)}>Marketplace Warehouse ID</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="marketplace"
                            value={formik.values.marketplace}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.marketplace && formik.errors.marketplace)}
                            helperText={(formik.touched.marketplace && formik.errors.marketplace) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>Location</span>
                        </div>
                        <Autocomplete
                            className={clsx(classes.autocompleteRoot, classes.autocompleteMulti)}
                            mode="lazy"
                            value={formik.values.location}
                            onChange={(e) => formik.setFieldValue('location', e)}
                            locading={getLocationListRes.loading}
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

export default WarehouseEditContent;
