/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Link from 'next/link';
import TextField from '@common_textfield';
import Autocomplete from '@common_autocomplete';
import channelGqlService from '@modules/channel/services/graphql';
import { optionsStatus } from '@modules/shipment/helpers';
import useStyles from '@modules/shipment/pages/list/components/style';
import Header from '@modules/shipment/pages/list/components/Header';
import clsx from 'clsx';

const ShipmentListContent = (props) => {
    const classes = useStyles();
    const { data, loading, getShipmentList } = props;
    const shipmentList = (data && data.getStoreShipmentList && data.getStoreShipmentList.items) || [];
    const shipmentTotal = (data && data.getStoreShipmentList && data.getStoreShipmentList.total_count) || 0;

    const columns = [
        { field: 'increment_id', headerName: 'Shipment Number', sortable: true, initialSort: 'DESC', hideable: true },
        { field: 'channel_order_increment_id', headerName: 'Channel Order Number', sortable: true, hideable: true },
        { field: 'allocation_status', headerName: 'Allocation Status', sortable: true, hideable: true },
        { field: 'channel_order_date', headerName: 'Order Date', hideable: true },
        { field: 'status', headerName: 'Status', sortable: true, hideable: true },
        { field: 'track_number', headerName: 'Airwaybill Number', hideable: true },
        { field: 'channel_name', headerName: 'Channel', sortable: true, hideable: true },
        { field: 'shipping_name', headerName: 'Recipient Name', hideable: true },
        { field: 'email', headerName: 'Email/Mobile', hideable: true },
        { field: 'action', headerName: 'Action', hideable: true },
    ];

    const filters = [
        { field: 'entity_id', name: 'entity_id_from', type: 'from', label: 'ID from', initialValue: '' },
        { field: 'entity_id', name: 'entity_id_to', type: 'to', label: 'ID to', initialValue: '' },
        {
            field: 'updated_at',
            name: 'updated_at_from',
            type: 'from',
            label: 'Last Update from',
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <TextField
                    id="date"
                    type="date"
                    value={filterValue}
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(newValue) => { setFilterValue(newValue.target.value); }}
                    InputProps={{
                        className: classes.fieldInput,
                    }}
                />
            ),
        },
        {
            field: 'updated_at',
            name: 'updated_at_to',
            type: 'to',
            label: 'Last Update to',
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <TextField
                    id="date"
                    type="date"
                    value={filterValue}
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(newValue) => { setFilterValue(newValue.target.value); }}
                    InputProps={{
                        className: classes.fieldInput,
                    }}
                />
            ),
        },
        { field: 'increment_id', name: 'increment_id', type: 'like', label: 'Shipment Number', initialValue: '' },
        { field: 'channel_order_increment_id', name: 'channel_order_increment_id', type: 'like', label: 'Order Number', initialValue: '' },
        {
            field: 'channel_name',
            name: 'channel_name',
            type: 'eq',
            label: 'Channel Name',
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => {
                const [getChannelList, getChannelListRes] = channelGqlService.getChannelList();
                const channelOptions = (getChannelListRes
                    && getChannelListRes.data
                    && getChannelListRes.data.getChannelList
                    && getChannelListRes.data.getChannelList.items) || [];
                const primaryKey = 'channel_name';
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
            label: 'Shipment',
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
    ];

    const getIconByStatus = (status) => {
        if (status.value === 'process_for_pack' || status.value === 'process_for_shipping') {
            if (status.label === 'Cannot Fulfill') {
                return '/assets/img/order_status/cannotfulfill.svg';
            }
            return '/assets/img/order_status/processforpack.svg';
        }
        if (status.value === 'cannot_fulfill') {
            return '/assets/img/order_status/cannotfulfill.svg';
        }
        if (status.value === 'ready_for_pack') {
            return '/assets/img/order_status/readyforpack.svg';
        }
        if (status.value === 'ready_for_pickup'
            || status.value === 'ready_for_ship'
            || status.value === 'shipment_booked'
            || status.value === 'gosend_rejected'
            || status.value === 'grabexpress_rejected') {
            return '/assets/img/order_status/readyforpickup.svg';
        }
        if (status.value === 'customer_picked_up'
            || status.value === 'customer_waiting'
            || status.value === 'order_delivered'
            || status.value === 'canceled'
            || status.value === 'closed') {
            return '/assets/img/order_status/customerpicked.svg';
        }
        return '/assets/img/order_status/ordershipped.svg';
    };

    const rows = shipmentList.map((shipment) => ({
        ...shipment,
        id: shipment.entity_id,
        email: `${shipment.shipping_email} ${shipment.shipping_telephone}`,
        status: () => (
            <div className={classes.statusRow}>
                <img src={getIconByStatus(shipment.status)} alt="" className={classes.statusIcon} />
                {shipment.status.label}
            </div>
        ),
        action: () => (
            <Link href={`/sales/shipment/edit/${shipment.entity_id}`}>
                <a className="link-button">Edit</a>
            </Link>
        ),
        allocation_status: () => (
            <div
                className={clsx(classes.statusRow, 'unbold')}
                style={{
                    textTransform: 'capitalize',
                }}
            >
                {shipment.allocation_status?.split('_').join(' ') || 'Unconfirmed'}
            </div>
        ),
        channel_name: shipment.channel.channel_name,
        track_number: shipment.track_number || '-',
    }));

    return (
        <>
            <Header />
            <Table
                filters={filters}
                rows={rows}
                getRows={getShipmentList}
                showCheckbox
                loading={loading}
                columns={columns}
                count={shipmentTotal}
            />
        </>
    );
};

export default ShipmentListContent;
