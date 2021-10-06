/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Link from 'next/link';
import Autocomplete from '@common_autocomplete';
import orderQueueGqlService from '@modules/orderqueue/services/graphql';
import channelGqlService from '@modules/channel/services/graphql';
import Header from '@modules/orderqueue/pages/list/components/Header';
import useStyles from '@modules/orderqueue/pages/list/components/style';

const OrderQueueListContent = (props) => {
    const classes = useStyles();
    const { data, loading, getOrderQueueList, setReallocation } = props;
    const orderQueueList = (data && data.getOrderQueueList && data.getOrderQueueList.items) || [];
    const orderQueueTotal = (data && data.getOrderQueueList && data.getOrderQueueList.total_count) || 0;
    const [getOrderQueueListx, getOrderQueueListRes] = orderQueueGqlService.getOrderQueueList();

    const columns = [
        { field: 'id', headerName: 'ID', sortable: true, initialSort: 'DESC', hideable: true },
        { field: 'channel_order_increment_id', headerName: 'Channel Order Number', sortable: true, hideable: true },
        { field: 'created_at', headerName: 'Channel Order Date', sortable: true, hideable: true },
        { field: 'channel_order_status', headerName: 'Channel Status', sortable: true, hideable: true },
        { field: 'last_updated', headerName: 'Last Updated', sortable: true, hideable: true },
        { field: 'channel_code', headerName: 'Channel Code', sortable: true, hideable: true },
        { field: 'status', headerName: 'Queue Status', sortable: true, hideable: true },
        { field: 'oms_order_status', headerName: 'OMS Status', sortable: true, hideable: true },
        { field: 'error_log', headerName: 'Error Log', sortable: true, hideable: true },
        { field: 'actions', headerName: 'Actions', hideable: true },
    ];

    const filters = [
        { field: 'id', name: 'id_from', type: 'from', label: 'ID From', initialValue: '' },
        { field: 'id', name: 'id_to', type: 'to', label: 'ID To', initialValue: '' },
        { field: 'channel_order_increment_id', name: 'channel_order_increment_id', type: 'like', label: 'Channel Order Number', initialValue: '' },
        // {
        //     field: 'channel_order_status',
        //     name: 'channel_order_status',
        //     type: 'match',
        //     label: 'Channel Status',
        //     initialValue: '',
        //     component: ({ filterValue, setFilterValue }) => (
        //         <Autocomplete
        //             className={classes.autocompleteRoot}
        //             mode="lazy"
        //             value={filterValue)}
        //             onChange={(newValue) => setFilterValue(newValue && newValue.name)}
        //             loading={getOrderQueueListRes.loading}
        //             options={
        //                 getOrderQueueListRes
        //                 && getOrderQueueListRes.data
        //                 && getOrderQueueListRes.data.getOrderQueueList
        //                 && getOrderQueueListRes.data.getOrderQueueList.items
        //             }
        //             getOptions={getOrderQueueListx}
        //             primaryKey="channel_order_status"
        //             labelKey="channel_order_status"
        //         />
        //     ),
        // },
        // { field: 'channel_code', name: 'channel_code', type: 'like', label: 'Channel Code', initialValue: '' },
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
        // {
        //     field: 'status',
        //     name: 'status',
        //     type: 'in',
        //     label: 'Queue Status',
        //     initialValue: '',
        //     component: ({ filterValue, setFilterValue }) => (
        //         <Autocomplete
        //             style={{ width: 228 }}
        //             value={(filterValue || []).map((option) => optionsFramework.find((e) => e.name === option))}
        //             onChange={(newValue) => setFilterValue((newValue || []).map((option) => option && option.name))}
        //             options={optionsFramework}
        //         />
        //     ),
        // },
        { field: 'oms_order_status', name: 'oms_order_status', type: 'like', label: 'OMS Status', initialValue: '' },
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
            <Link href={`/sales/orderqueue/edit/${orderQueue.id}`}>
                <a className="link-button">view</a>
            </Link>
        ),
        status: () => (
            <div className={getClassByStatus(orderQueue.status)}>
                {orderQueue.status}
            </div>
        ),
        channel_order_status: () => (
            <div className={getClassByChannelOrderStatus(orderQueue.channel_order_status)}>
                {orderQueue.channel_order_status}
            </div>
        ),
    }));

    const actions = [
        {
            label: 'Set as New',
            message: 'Are you sure to confirm ?',
            onClick: async (checkedRows) => {
                const variables = { id: checkedRows.map((checkedRow) => checkedRow.id) };
                await variables.id.map((id) => setReallocation({
                    variables: {
                        id,
                        type: 'new',
                    },
                }));
            },
        },
        {
            label: 'Set as Reallocation',
            message: 'Are you sure to confirm ?',
            onClick: async (checkedRows) => {
                const variables = { id: checkedRows.map((checkedRow) => checkedRow.id) };
                await variables.id.map((id) => setReallocation({
                    variables: {
                        id,
                        type: 'allocation',
                    },
                }));
            },
        },
    ];

    // if (!data || loading) {
    //     return (
    //         <div>Loading . . .</div>
    //     );
    // }

    return (
        <>
            <Header />
            <Table
                filters={filters}
                actions={actions}
                rows={rows}
                getRows={getOrderQueueList}
                loading={loading}
                columns={columns}
                count={orderQueueTotal}
                showCheckbox
            />
        </>
    );
};

export default OrderQueueListContent;
