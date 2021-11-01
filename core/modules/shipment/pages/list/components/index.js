/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Link from 'next/link';
import TextField from '@common_textfield';
import Autocomplete from '@common_autocomplete';
import channelGqlService from '@modules/channel/services/graphql';
import Tabs from '@common_tabs';
import { dataTab, getIconByStatus } from '@modules/shipment/helpers';
import useStyles from '@modules/shipment/pages/list/components/style';
import Header from '@modules/shipment/pages/list/components/Header';
import clsx from 'clsx';

const ShipmentListContent = (props) => {
    const classes = useStyles();
    const { data, loading, getShipmentList, confirmShipment, optionsStatus } = props;
    const shipmentList = (data && data.getStoreShipmentList && data.getStoreShipmentList.items) || [];
    const shipmentTotal = (data && data.getStoreShipmentList && data.getStoreShipmentList.total_count) || 0;
    const [tab, setTab] = React.useState(0);
    const [load, setLoad] = React.useState(false);

    const columns = [
        { field: 'increment_id', headerName: 'Shipment Number', sortable: true, initialSort: 'DESC', hideable: true },
        { field: 'channel_order_increment_id', headerName: 'Channel Order Number', sortable: true, hideable: true },
        { field: 'status', headerName: 'Status', sortable: true, hideable: true },
        { field: 'channel_order_date', headerName: 'Channel Order Date', sortable: true, hideable: true },
        { field: 'shipping_name', headerName: 'Recipient Name', hideable: true },
        { field: 'channel_name', headerName: 'Channel', sortable: true, hideable: true },
        { field: 'location', headerName: 'Location', hideable: true },
        { field: 'track_number', headerName: 'Airway Bill', hideable: true },
        { field: 'allocation_status', headerName: 'Allocation Status', sortable: true, hideable: true, hidden: true },
        { field: 'marketplace_order_number', headerName: 'Marketplace Order Number', hideable: true, hidden: true },
        { field: 'action', headerName: 'Action', hideable: true },
    ];

    const filters = [
        { field: 'increment_id', name: 'increment_id', type: 'like', label: 'Shipment Number', initialValue: '' },
        { field: 'channel_order_increment_id', name: 'channel_order_increment_id', type: 'like', label: 'Channel Order Number', initialValue: '' },
        {
            field: 'status',
            name: 'status',
            type: 'like',
            label: 'Status',
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => {
                const options = optionsStatus.slice().map((item) => ({
                    name: item.label,
                    id: item.value,
                }));
                return (
                    <Autocomplete
                        style={{ width: 228 }}
                        value={options.find((e) => e.id === filterValue)}
                        onChange={(newValue) => {
                            setFilterValue(newValue && newValue.id);
                        }}
                        options={options}
                    />
                );
            },
        },
        {
            field: 'channel_order_date',
            name: 'channel_order_date_from',
            type: 'from',
            label: 'Channel Order Date From',
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <TextField
                    variant="outlined"
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
            field: 'channel_order_date',
            name: 'channel_order_date_to',
            type: 'to',
            label: 'Channel Order Date To',
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <TextField
                    variant="outlined"
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
        { field: 'shipping_name', name: 'shipping_name', type: 'like', label: 'Recipient Name', initialValue: '' },
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
        { field: 'loc_name', name: 'loc_name', type: 'like', label: 'Location', initialValue: '' },
        { field: 'track_number', name: 'track_number', type: 'like', label: 'Airway Bill', initialValue: '' },
        {
            field: 'allocation_status',
            name: 'allocation_status',
            type: tab === 'true' ? 'null' : 'eq',
            label: 'Allocation Status',
            initialValue: tab !== 0 ? tab : '',
            component: ({ filterValue, setFilterValue }) => {
                const optionsAllocation = dataTab.slice(1).map((item) => ({
                    name: item.label,
                    id: item.value,
                }));
                optionsAllocation.splice(1, 0, { name: 'Confirmed', id: 'confirmed' });
                return (
                    <Autocomplete
                        style={{ width: 228 }}
                        value={optionsAllocation.find((e) => e.id === filterValue)}
                        onChange={(newValue) => {
                            setFilterValue(newValue && newValue.id);
                        }}
                        options={optionsAllocation}
                    />
                );
            },
        },
        { field: 'marketplace_order_number', name: 'marketplace_order_number', type: 'like', label: 'Marketplace Order Number', initialValue: '' },
    ];

    const rows = shipmentList.map((shipment) => ({
        ...shipment,
        id: shipment.entity_id,
        email: `${shipment.shipping_email} ${shipment.shipping_telephone}`,
        location: shipment.location.loc_name || '-',
        status: () => (
            <div className={classes.statusRow}>
                <img src={getIconByStatus(shipment.status.value, shipment.status.label)} alt="" className={classes.statusIcon} />
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

    const actions = [
        {
            label: 'Mark Confirm Complete',
            message: 'Are you sure to confirm ?',
            onClick: async (checkedRows) => {
                const variables = { id: checkedRows.map((checkedRow) => checkedRow.id) };
                await confirmShipment({ variables });
            },
        },
    ];

    const onChangeTab = async (e, v) => {
        setLoad(true);
        await setTab(v);
        setLoad(false);
    };

    return (
        <>
            <Header />
            <Tabs data={dataTab} onChange={onChangeTab} value={tab} allItems={false} />
            {!load && (
                <Table
                    filters={filters}
                    actions={actions}
                    rows={rows}
                    getRows={getShipmentList}
                    showCheckbox
                    loading={loading}
                    columns={columns}
                    count={shipmentTotal}
                    handleReset={() => setTab(0)}
                />
            )}
        </>
    );
};

export default ShipmentListContent;
