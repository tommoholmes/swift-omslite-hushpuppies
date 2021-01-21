/* eslint-disable no-unused-vars */
import React from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Autocomplete from '@common_autocomplete';
import channelGqlService from '@modules/channel/services/graphql';
import { optionsFramework, optionsRuleType } from '@modules/channel/helpers';
import clsx from 'clsx';
import useStyles from './style';

const ChannelEditContent = (props) => {
    const {
        formik,
    } = props;
    const classes = useStyles();
    const router = useRouter();
    const [getVirtualStockList, getVirtualStockListRes] = channelGqlService.getVirtualStockList();

    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push('/oms/channel')}
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
            <h2 className={classes.titleTop}>Edit Sales Channel</h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <h2 className={classes.title}>General Information</h2>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={[classes.label, classes.labelRequired].join(' ')}>Channel Code</span>
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
                            <span className={[classes.label, classes.labelRequired].join(' ')}>Channel Name</span>
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
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>Channel Url</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="url"
                            value={formik.values.url}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.url && formik.errors.url)}
                            helperText={(formik.touched.url && formik.errors.url) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>Access Token</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="token"
                            value={formik.values.token}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.token && formik.errors.token)}
                            helperText={(formik.touched.token && formik.errors.token) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>End Point</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="endPoint"
                            value={formik.values.endPoint}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.endPoint && formik.errors.endPoint)}
                            helperText={(formik.touched.endPoint && formik.errors.endPoint) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>Delta Stock Url</span>
                        </div>
                        <TextField
                            className={classes.fieldRoot}
                            variant="outlined"
                            name="deltaStock"
                            value={formik.values.deltaStock}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.deltaStock && formik.errors.deltaStock)}
                            helperText={(formik.touched.deltaStock && formik.errors.deltaStock) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={[classes.label, classes.labelRequired].join(' ')}>Framework</span>
                        </div>
                        <Autocomplete
                            className={classes.autocompleteRoot}
                            value={formik.values.framework}
                            onChange={(e) => formik.setFieldValue('framework', e)}
                            options={optionsFramework}
                            error={!!(formik.touched.framework && formik.errors.framework)}
                            helperText={(formik.touched.framework && formik.errors.framework) || ''}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={[classes.label, classes.labelRequired].join(' ')}>Rule Type</span>
                        </div>
                        <Autocomplete
                            className={classes.autocompleteRoot}
                            value={formik.values.type}
                            onChange={(e) => formik.setFieldValue('type', e)}
                            options={optionsRuleType}
                            error={!!(formik.touched.stype && formik.errors.type)}
                            helperText={(formik.touched.type && formik.errors.type) || ''}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}> Virtual Stock</span>
                        </div>
                        <Autocomplete
                            className={clsx(classes.autocompleteRoot, classes.autocompleteMulti)}
                            mode="lazy"
                            multiple
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
                            primaryKey="vs_id"
                            labelKey="vs_name"
                        />
                    </div>
                </div>
                <div className={classes.content}>
                    <h2 className={classes.title}>Shipment Webhook</h2>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>Callback URL on Shipment Complete</span>
                        </div>
                        <div className={clsx(classes.fieldRoot, classes.fieldRootDesc)} style={{ display: 'inline-block' }}>
                            <TextField
                                style={{ width: '100%' }}
                                variant="outlined"
                                name="shipment"
                                value={formik.values.shipment}
                                onChange={formik.handleChange}
                                error={!!(formik.touched.shipment && formik.errors.shipment)}
                                helperText={(formik.touched.shipment && formik.errors.shipment) || ''}
                                InputProps={{
                                    className: classes.fieldInput,
                                }}
                            />
                            <span className={classes.notes}>Triggered when all shipments of an order are picked up or shipped or delivered</span>
                        </div>
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>Callback URL on Invoice</span>
                        </div>
                        <TextField
                            className={clsx(classes.fieldRoot, classes.fieldRootDesc)}
                            variant="outlined"
                            name="invoice"
                            value={formik.values.invoice}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.invoice && formik.errors.invoice)}
                            helperText={(formik.touched.invoice && formik.errors.invoice) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                </div>
                <div className={classes.content}>
                    <h2 className={classes.title}>Rma Webhook</h2>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>Callback URL on Refund</span>
                        </div>
                        <TextField
                            className={clsx(classes.fieldRoot, classes.fieldRootDesc)}
                            variant="outlined"
                            name="refund"
                            value={formik.values.refund}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.refund && formik.errors.refund)}
                            helperText={(formik.touched.refund && formik.errors.refund) || ''}
                            InputProps={{
                                className: classes.fieldInput,
                            }}
                        />
                    </div>
                </div>
                <div className={classes.content}>
                    <h2 className={classes.title}>Creditmemo Webhook</h2>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>Callback URL on Creditmemo</span>
                        </div>
                        <TextField
                            className={clsx(classes.fieldRoot, classes.fieldRootDesc)}
                            variant="outlined"
                            name="creditmemo"
                            value={formik.values.creditmemo}
                            onChange={formik.handleChange}
                            error={!!(formik.touched.creditmemo && formik.errors.creditmemo)}
                            helperText={(formik.touched.creditmemo && formik.errors.creditmemo) || ''}
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

export default ChannelEditContent;
