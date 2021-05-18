/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Link from 'next/link';
import TextField from '@common_textfield';
import Autocomplete from '@common_autocomplete';
import channelGqlService from '@modules/channel/services/graphql';
import { optionsStatus } from '@modules/shipment/helpers';
import useStyles from './style';
import Header from './Header';

const ShipmentListContent = (props) => {
    const classes = useStyles();
    const { data, loading, getShipmentList } = props;
    const shipmentList = (data && data.getShipmentList && data.getShipmentList.items) || [];
    const shipmentTotal = (data && data.getShipmentList && data.getShipmentList.total_count) || 0;

    const columns = [
        { field: 'entity_id', headerName: 'Id', sortable: true, initialSort: 'ASC' },
        { field: 'increment_id', headerName: 'Shipment Number', sortable: true },
        { field: 'channel_order_increment_id', headerName: 'Order Number', hideable: true, sortable: true },
        { field: 'updated_at', headerName: 'Last Update', hideable: true, sortable: true },
        { field: 'channel_name', headerName: 'Channel Name', hideable: true, sortable: true },
        { field: 'status', headerName: 'Shipment Status', hideable: true, sortable: true },
        { field: 'actions', headerName: 'Actions' },
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
                    value={optionsStatus.find((e) => e.name === filterValue)}
                    onChange={(newValue) => setFilterValue(newValue && newValue.name)}
                    options={optionsStatus}
                />
            ),
        },
    ];

    const rows = shipmentList.map((shipment) => ({
        ...shipment,
        id: shipment.entity_id,
        actions: () => (
            <Link href={`/sales/shipment/edit/${shipment.entity_id}`}>
                <a className="link-button">view</a>
            </Link>
        ),
    }));

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
                rows={rows}
                getRows={getShipmentList}
                loading={loading}
                columns={columns}
                count={shipmentTotal}
            />
        </>
    );
};

export default ShipmentListContent;
