/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Link from 'next/link';
import Autocomplete from '@common_autocomplete';
import channelGqlService from '@modules/channel/services/graphql';
import Header from '@modules/orderqueue/pages/list/components/Header';
import useStyles from '@modules/orderqueue/pages/list/components/style';
import { optionsStatus } from '@modules/orderqueue/helpers';

const OrderQueueListContent = (props) => {
    const classes = useStyles();
    const { data, loading, getOrderQueueList, varExport, handleExport, setVarExport } = props;
    const orderQueueList = (data && data.getOrderQueueList && data.getOrderQueueList.items) || [];
    const orderQueueTotal = (data && data.getOrderQueueList && data.getOrderQueueList.total_count) || 0;

    const columns = [
        { field: 'id', headerName: 'ID', sortable: true, hidden: true },
        { field: 'channel_order_increment_id', headerName: 'Channel Order Number', sortable: true, hideable: true },
        { field: 'channel_order_id', headerName: 'Marketplace Order Number', sortable: true, hideable: true, hidden: true },
        { field: 'created_at', headerName: 'Channel Order Date', sortable: true, hideable: true, initialSort: 'DESC' },
        { field: 'channel_order_status', headerName: 'Channel Order Status', sortable: true, hideable: true },
        { field: 'last_updated', headerName: 'Last Updated', sortable: true, hideable: true },
        { field: 'channel_code', headerName: 'Channel Code', sortable: true, hideable: true },
        { field: 'status', headerName: 'Queue Status', sortable: true, hideable: true },
        { field: 'error_log', headerName: 'Error Log', sortable: true, hideable: true },
        { field: 'actions', headerName: 'Actions', hideable: true },
    ];

    const filters = [
        { field: 'channel_order_increment_id', name: 'channel_order_increment_id', type: 'like', label: 'Channel Order Number', initialValue: '' },
        { field: 'channel_order_id', name: 'channel_order_id', type: 'like', label: 'Marketplace Order Number', initialValue: '' },
        {
            field: 'channel_code',
            name: 'channel_code',
            type: 'eq',
            label: 'Channel Code',
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => {
                const [getChannelList, getChannelListRes] = channelGqlService.getChannelList();
                const channelOptions = (getChannelListRes
                    && getChannelListRes.data
                    && getChannelListRes.data.getChannelList
                    && getChannelListRes.data.getChannelList.items) || [];
                const primaryKey = 'channel_code';
                const labelKey = 'channel_name';
                return (
                    <Autocomplete
                        mode="lazy"
                        style={{ width: 228 }}
                        getOptions={getChannelList}
                        value={channelOptions.find((e) => e[primaryKey] === filterValue)}
                        onChange={(newValue) => setFilterValue(newValue && newValue[primaryKey])}
                        options={channelOptions}
                        primaryKey={primaryKey}
                        labelKey={labelKey}
                    />
                );
            },
        },
        {
            field: 'status',
            name: 'status',
            type: 'eq',
            label: 'Queue Status',
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <Autocomplete
                    style={{ width: 228 }}
                    value={optionsStatus.find((e) => e.idValue === filterValue)}
                    onChange={(newValue) => setFilterValue(newValue && newValue.idValue)}
                    options={optionsStatus}
                />
            ),
        },
        { field: 'error_log', name: 'error_log', type: 'like', label: 'Error Log', initialValue: '' },
    ];

    const getClassByStatus = (status) => {
        if (status === 'failed') {
            return classes.statusFailed;
        }
        if (status === 'new') {
            return classes.statusProcessing;
        }
        if (status === 'allocating') {
            return classes.statusAllocating;
        }
        return classes.statusSuccess;
    };
    const getClassByChannelOrderStatus = (channel_order_status) => {
        if (channel_order_status === 'canceled') {
            return classes.statusFailed;
        }
        if (channel_order_status === 'processing') {
            return classes.statusProcessing;
        }
        if (channel_order_status === 'closed') {
            return classes.statusClosed;
        }
        return classes.statusSuccess;
    };

    const rows = orderQueueList.map((orderQueue) => ({
        ...orderQueue,
        id: orderQueue.id,
        actions: () => (
            <Link href={`/order/allorder/edit/${orderQueue.id}`}>
                <a className="link-button">Edit</a>
            </Link>
        ),
        status: () => (
            <div className={getClassByStatus(orderQueue.status)} style={{ textTransform: 'capitalize' }}>
                {orderQueue.status}
            </div>
        ),
        channel_order_status: () => (
            <div className={getClassByChannelOrderStatus(orderQueue.channel_order_status)} style={{ textTransform: 'capitalize' }}>
                {orderQueue.channel_order_status}
            </div>
        ),
    }));

    // const actions = [
    //     {
    //         label: 'Set as New',
    //         message: 'Are you sure to confirm ?',
    //         onClick: async (checkedRows) => {
    //             const variables = { id: checkedRows.map((checkedRow) => checkedRow.id) };
    //             await variables.id.map((id) => setReallocation({
    //                 variables: {
    //                     id,
    //                     type: 'new',
    //                 },
    //             }));
    //         },
    //     },
    //     {
    //         label: 'Set as Reallocation',
    //         message: 'Are you sure to confirm ?',
    //         onClick: async (checkedRows) => {
    //             const variables = { id: checkedRows.map((checkedRow) => checkedRow.id) };
    //             await variables.id.map((id) => setReallocation({
    //                 variables: {
    //                     id,
    //                     type: 'allocation',
    //                 },
    //             }));
    //         },
    //     },
    // ];

    return (
        <>
            <Header />
            <Table
                filters={filters}
                // actions={actions}
                hideActions
                rows={rows}
                getRows={getOrderQueueList}
                loading={loading}
                columns={columns}
                count={orderQueueTotal}
                showCheckbox
                handleExport={handleExport}
                varExport={varExport}
                setVarExport={setVarExport}
                exportWithId
            />
        </>
    );
};

export default OrderQueueListContent;
