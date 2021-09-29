/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Link from 'next/link';
import Autocomplete from '@common_autocomplete';
import Tabs from '@common_tabs';
import { optionsAllocation, optionsStatus, dataTab } from '@modules/homedelivery/helpers';
import Header from '@modules/homedelivery/pages/list/components/Header';
import useStyles from '@modules/homedelivery/pages/list/components/style';
import clsx from 'clsx';

const HomeDeliveryListContent = (props) => {
    const classes = useStyles();
    const { data, loading, getStoreShipmentList, confirmShipment, pickShipment, packShipment, bookCourier,
        handleExport, setVarExport } = props;
    const storeShipmentList = (data && data.getStoreShipmentList && data.getStoreShipmentList.items) || [];
    const storeShipmentTotal = (data && data.getStoreShipmentList && data.getStoreShipmentList.total_count) || 0;
    const [tab, setTab] = React.useState(0);
    const [load, setLoad] = React.useState(false);

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
        { field: 'increment_id', name: 'increment_id', type: 'like', label: 'Shipment Number', initialValue: '' },
        { field: 'channel_order_increment_id', name: 'channel_order_increment_id', type: 'like', label: 'Channel Order Number', initialValue: '' },
        {
            field: 'allocation_status',
            name: 'allocation_status',
            type: 'in',
            label: 'Allocation Status',
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <Autocomplete
                    style={{ width: 228 }}
                    value={optionsAllocation.find((e) => e.name === filterValue)}
                    onChange={(newValue) => setFilterValue(newValue && newValue.name)}
                    options={optionsAllocation}
                />
            ),
        },
        {
            field: 'status',
            name: 'status',
            type: 'like',
            label: 'Status',
            initialValue: tab !== 0 ? tab : '',
            component: ({ filterValue, setFilterValue }) => (
                <Autocomplete
                    style={{ width: 228 }}
                    value={optionsStatus.find((e) => e.id === filterValue)}
                    onChange={(newValue) => setFilterValue(newValue && newValue.id)}
                    options={optionsStatus}
                />
            ),
        },
        // { field: 'increment_id', name: 'increment_id', type: 'like', label: 'Order Date', initialValue: '' },
        { field: 'track_number', name: 'track_number', type: 'like', label: 'Airwaybill Number', initialValue: '' },
        { field: 'channel_name', name: 'channel_name', type: 'like', label: 'Channel', initialValue: '' },
        { field: 'framework', name: 'framework', type: 'neq', label: 'Framework', class: 'fixed', initialValue: 'Marketplace' },
        { field: 'is_pickup', name: 'is_pickup', type: 'eq', label: 'is Pickup', class: 'fixed', initialValue: '0', disabled: true },
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

    const rows = storeShipmentList.map((homedelivery) => ({
        ...homedelivery,
        id: homedelivery.entity_id,
        channel_name: homedelivery.channel.channel_name,
        email: `${homedelivery.shipping_email} ${homedelivery.shipping_telephone}`,
        action: () => (
            <Link href={`/shipment/homedelivery/edit/${homedelivery.entity_id}`}>
                <a className="link-button">Edit</a>
            </Link>
        ),
        status: () => (
            <div className={classes.statusRow}>
                <img src={getIconByStatus(homedelivery.status)} alt="" className={classes.statusIcon} />
                {homedelivery.status.label}
            </div>
        ),
        allocation_status: () => (
            <div
                className={clsx(classes.statusRow, 'unbold')}
                style={{
                    textTransform: 'capitalize',
                }}
            >
                {homedelivery.allocation_status?.split('_').join(' ') || 'Unconfirmed'}
            </div>
        ),
        track_number: homedelivery.track_number || '-',
    }));

    const actions = [
        {
            label: 'Print Pick List',
            message: 'ready for print?',
            onClick: (checkedRows) => {
                const idPrint = checkedRows.map((checkedRow) => checkedRow.id);
                window.open(`/printoms/pick/${ idPrint.toString().replace(/,/g, '/')}`);
            },
        },
        {
            label: 'Print Pack List',
            message: 'ready for print?',
            onClick: (checkedRows) => {
                const idPrint = checkedRows.map((checkedRow) => checkedRow.id);
                window.open(`/printoms/pack/${ idPrint.toString().replace(/,/g, '/')}`);
            },
        },
        {
            label: 'Mark Confirm Complete',
            message: 'Are you sure to confirm ?',
            onClick: async (checkedRows) => {
                const variables = { id: checkedRows.map((checkedRow) => checkedRow.id) };
                await confirmShipment({ variables });
            },
        },
        {
            label: 'Mark Pick Complete',
            message: 'Are you sure to confirm ?',
            onClick: async (checkedRows) => {
                const variables = { id: checkedRows.map((checkedRow) => checkedRow.id) };
                await pickShipment({ variables });
            },
        },
        {
            label: 'Mark Pack Complete',
            message: 'Are you sure to confirm ?',
            onClick: async (checkedRows) => {
                const variables = { id: checkedRows.map((checkedRow) => checkedRow.id) };
                await packShipment({ variables });
            },
        },
        {
            label: 'Mark Booking Complete (Shipper ID Only)',
            message: 'Are you sure to confirm ?',
            onClick: async (checkedRows) => {
                const variables = { id: checkedRows.map((checkedRow) => checkedRow.id) };
                await bookCourier({ variables });
            },
        },
    ];

    const onChangeTab = (e, v) => {
        setLoad(true);
        setTab(v);
        setTimeout(() => { setLoad(false); }, 500);
    };

    return (
        <>
            <Header />
            <Tabs data={dataTab} onChange={onChangeTab} value={tab} allItems={false} />
            {load ? <div className={classes.loading}>Loading . . .</div>
                : (
                    <Table
                        filters={filters}
                        actions={actions}
                        rows={rows}
                        getRows={getStoreShipmentList}
                        loading={loading}
                        columns={columns}
                        count={storeShipmentTotal}
                        showCheckbox
                        handleReset={() => setTab(0)}
                        handleExport={handleExport}
                        setVarExport={setVarExport}
                    />
                )}
        </>
    );
};

export default HomeDeliveryListContent;
