/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, { useState } from 'react';
import TextField from '@common_textfield';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Autocomplete from '@common_autocomplete';
import channelGqlService from '@modules/channel/services/graphql';
import { optionsYesNo } from '@modules/channel/helpers';
import clsx from 'clsx';
import useStyles from '@modules/channel/pages/create/components/style';

const ChannelCreateContent = (props) => {
    const { formik } = props;
    const classes = useStyles();
    const router = useRouter();
    const [getVirtualStockList, getVirtualStockListRes] = channelGqlService.getVirtualStockList();
    const [getShipmentStatus, getShipmentStatusRes] = channelGqlService.getShipmentStatus();
    const [getChannelFrameworkOptions, getChannelFrameworkOptionsRes] = channelGqlService.getChannelFrameworkOptions();
    const [getChannelRuleTypeOptions, getChannelRuleTypeOptionsRes] = channelGqlService.getChannelRuleTypeOptions();

    const [virtualStockOptions, setVirtualStockOptions] = useState([]);
    const [searchVirtualStock, setSearchVirtualStock] = useState('');

    React.useEffect(() => {
        const onChangeTimeOut = setTimeout(() => {
            const isExist = searchVirtualStock && virtualStockOptions.filter((elm) => elm?.vs_name?.toLowerCase().includes(searchVirtualStock?.toLowerCase()));
            if (searchVirtualStock && isExist.length === 0) {
                getVirtualStockList({
                    variables: {
                        filter: {
                            vs_name: {
                                like: searchVirtualStock,
                            },
                        },
                        pageSize: 20,
                        currentPage: 1,
                    },
                });
            }

            return null;
        }, 500);

        return () => clearTimeout(onChangeTimeOut);
    }, [searchVirtualStock]);

    React.useEffect(() => {
        if (
            getVirtualStockListRes
            && getVirtualStockListRes.data
            && getVirtualStockListRes.data.getVirtualStockList
            && getVirtualStockListRes.data.getVirtualStockList.items
        ) {
            const names = new Set(virtualStockOptions.map((d) => d.vs_name));
            setVirtualStockOptions([
                ...virtualStockOptions,
                ...getVirtualStockListRes.data.getVirtualStockList.items.filter((d) => !names.has(d.vs_name)),
            ]);
        }
    }, [getVirtualStockListRes.data]);

    return (
        <>
            <Button className={classes.btnBack} onClick={() => router.push('/oms/channel')} variant="contained" style={{ marginRight: 16 }}>
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
            <h2 className={classes.titleTop}>Create Sales Channel</h2>
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
                            mode="lazy"
                            className={classes.autocompleteRoot}
                            value={formik.values.framework}
                            onChange={(e) => formik.setFieldValue('framework', e)}
                            loading={getChannelFrameworkOptionsRes.loading}
                            options={
                                getChannelFrameworkOptionsRes
                                && getChannelFrameworkOptionsRes.data
                                && getChannelFrameworkOptionsRes.data.getChannelFrameworkOptions
                            }
                            getOptions={getChannelFrameworkOptions}
                            error={!!(formik.touched.framework && formik.errors.framework)}
                            helperText={(formik.touched.framework && formik.errors.framework) || ''}
                            primaryKey="value"
                            labelKey="label"
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={[classes.label, classes.labelRequired].join(' ')}>Rule Type</span>
                        </div>
                        <Autocomplete
                            mode="lazy"
                            className={classes.autocompleteRoot}
                            value={formik.values.type}
                            onChange={(e) => formik.setFieldValue('type', e)}
                            loading={getChannelRuleTypeOptionsRes.loading}
                            options={
                                getChannelRuleTypeOptionsRes
                                && getChannelRuleTypeOptionsRes.data
                                && getChannelRuleTypeOptionsRes.data.getChannelRuleTypeOptions
                            }
                            getOptions={getChannelRuleTypeOptions}
                            error={!!(formik.touched.type && formik.errors.type)}
                            helperText={(formik.touched.type && formik.errors.type) || ''}
                            primaryKey="value"
                            labelKey="label"
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
                            options={virtualStockOptions}
                            getOptions={getVirtualStockList}
                            primaryKey="vs_id"
                            labelKey="vs_name"
                            onInputChange={(e) => setSearchVirtualStock(e && e.target && e.target.value)}
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>Auto Confirm Shipment</span>
                        </div>
                        <Autocomplete
                            className={classes.autocompleteRoot}
                            value={formik.values.auto_confirm_shipment}
                            onChange={(e) => formik.setFieldValue('auto_confirm_shipment', e)}
                            options={optionsYesNo}
                            error={!!(formik.touched.auto_confirm_shipment && formik.errors.auto_confirm_shipment)}
                            helperText={(formik.touched.auto_confirm_shipment && formik.errors.auto_confirm_shipment) || ''}
                            primaryKey="id"
                            labelKey="name"
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>Prio One Store</span>
                        </div>
                        <Autocomplete
                            className={classes.autocompleteRoot}
                            value={formik.values.prio_one_store}
                            onChange={(e) => formik.setFieldValue('prio_one_store', e)}
                            options={optionsYesNo}
                            error={!!(formik.touched.prio_one_store && formik.errors.prio_one_store)}
                            helperText={(formik.touched.prio_one_store && formik.errors.prio_one_store) || ''}
                            primaryKey="id"
                            labelKey="name"
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>Split Prio One Store</span>
                        </div>
                        <Autocomplete
                            className={classes.autocompleteRoot}
                            value={formik.values.split_prio_one_store}
                            onChange={(e) => formik.setFieldValue('split_prio_one_store', e)}
                            options={optionsYesNo}
                            error={!!(formik.touched.split_prio_one_store && formik.errors.split_prio_one_store)}
                            helperText={(formik.touched.split_prio_one_store && formik.errors.split_prio_one_store) || ''}
                            primaryKey="id"
                            labelKey="name"
                        />
                    </div>
                    <div className={classes.formField}>
                        <div className={classes.divLabel}>
                            <span className={classes.label}>Release Stock</span>
                        </div>
                        <Autocomplete
                            className={clsx(classes.autocompleteRoot, classes.autocompleteMulti)}
                            mode="lazy"
                            multiple
                            value={formik.values.release_stock}
                            onChange={(e) => formik.setFieldValue('release_stock', e)}
                            loading={getShipmentStatusRes.loading}
                            options={getShipmentStatusRes && getShipmentStatusRes.data && getShipmentStatusRes.data.getShipmentStatus}
                            getOptions={getShipmentStatus}
                            primaryKey="value"
                            labelKey="label"
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
                    <Button className={classes.btn} onClick={formik.handleSubmit} variant="contained">
                        Submit
                    </Button>
                </div>
            </Paper>
        </>
    );
};

export default ChannelCreateContent;
