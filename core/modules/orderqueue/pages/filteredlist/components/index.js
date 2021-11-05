/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Link from 'next/link';
import Autocomplete from '@common_autocomplete';
import channelGqlService from '@modules/channel/services/graphql';
import Header from '@modules/orderqueue/pages/filteredlist/components/Header';
import useStyles from '@modules/orderqueue/pages/filteredlist/components/style';
import { optionsStatus } from '@modules/orderqueue/helpers';

const OrderQueueListContent = (props) => {
    const classes = useStyles();
    const { data, loading, getOrderQueueList, setReallocation,
        varExport, setVarExport, tab_status, exportOrderToCsv } = props;
    const orderQueueList = (data && data.getOrderQueueList && data.getOrderQueueList.items) || [];
    const orderQueueTotal = (data && data.getOrderQueueList && data.getOrderQueueList.total_count) || 0;

    const columns = [
        { field: 'id', headerName: 'ID', sortable: true, initialSort: 'DESC', hidden: true },
        { field: 'channel_order_increment_id', headerName: 'Channel Order Number', sortable: true, hideable: true },
        { field: 'created_at', headerName: 'Channel Order Date', sortable: true, hideable: true },
        { field: 'channel_order_status', headerName: 'Channel Order Status', sortable: true, hideable: true },
        { field: 'last_updated', headerName: 'Last Updated', sortable: true, hideable: true },
        { field: 'acceptance_deadline', headerName: 'Acceptance Deadline', sortable: true, hideable: true },
        { field: 'channel_code', headerName: 'Channel Code', sortable: true, hideable: true },
        { field: 'status', headerName: 'Queue Status', sortable: true, hideable: true },
        { field: 'error_log', headerName: 'Error Log', sortable: true, hideable: true },
        { field: 'actions', headerName: 'Actions', hideable: true },
    ];

    const filters = [
        { field: 'channel_order_increment_id', name: 'channel_order_increment_id', type: 'like', label: 'Channel Order Number', initialValue: '' },
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
            type: 'match',
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
        { field: 'tab_status', name: 'tab_status', type: 'eq', label: 'Tab Status', class: 'fixed', initialValue: tab_status, hidden: true },
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
            <Link href={`/sales/${tab_status}/edit/${orderQueue.id}`}>
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

    const exports = [
        {
            label: 'Export No Allocation',
            message: 'ready for print?',
            onClick: async (checkedRows) => {
                const incrementIds = checkedRows.map((checkedRow) => Number(checkedRow.id));
                const variables = {
                    id: incrementIds,
                    filter: {
                        status: {
                            eq: 'failed',
                        },
                        error_log: {
                            eq: 'Allocation not found',
                        },
                    },
                };
                window.backdropLoader(true);
                await exportOrderToCsv({ variables });
            },
        },
        {
            label: 'Export All',
            message: 'ready for print?',
            onClick: async (checkedRows) => {
                const incrementIds = checkedRows.map((checkedRow) => Number(checkedRow.id));
                const variables = {
                    id: incrementIds,
                    filter: {
                        status: {
                            eq: 'failed',
                        },
                    },
                };
                window.backdropLoader(true);
                await exportOrderToCsv({ variables });
            },
        },
    ];

    return (
        <>
            <Header showBulkButton={tab_status === 'failed'} />
            <Table
                filters={filters}
                actions={actions}
                hideActions={tab_status !== 'failed'}
                rows={rows}
                getRows={getOrderQueueList}
                loading={loading}
                columns={columns}
                showCheckbox={tab_status === 'failed'}
                count={orderQueueTotal}
                varExport={varExport}
                setVarExport={setVarExport}
                exports={tab_status === 'failed' ? exports : []}
            />
        </>
    );
};

export default OrderQueueListContent;
