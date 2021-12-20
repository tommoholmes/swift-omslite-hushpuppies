/* eslint-disable no-param-reassign */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Link from 'next/link';
import Autocomplete from '@common_autocomplete';
import Tabs from '@common_tabs';
import { dataTab, optionsAllocation } from '@modules/storepickup/helpers';
import Header from '@modules/storepickup/pages/list/components/Header';
import useStyles from '@modules/storepickup/pages/list/components/style';
import TextField from '@common_textfield';
import clsx from 'clsx';

const StorePickupListContent = (props) => {
    const classes = useStyles();
    const { data, loading, getStoreShipmentList, confirmShipment, pickShipment, packShipment, optionsStatus } = props;
    const [tab, setTab] = React.useState('process_for_shipping');
    const [indexType, setIndexType] = React.useState({
        allocation_status: 0,
    });
    const [load, setLoad] = React.useState(false);

    const storeShipmentList = (data && data.getStoreShipmentList && data.getStoreShipmentList.items) || [];
    const storeShipmentTotal = (data && data.getStoreShipmentList && data.getStoreShipmentList.total_count) || 0;

    const columns = [
        { field: 'increment_id', headerName: 'Shipment Number', sortable: true, initialSort: 'DESC', hideable: true },
        { field: 'channel_order_increment_id', headerName: 'Channel Order Number', sortable: true, hideable: true },
        { field: 'status', headerName: 'Status', sortable: true, hideable: true },
        { field: 'channel_order_date', headerName: 'Channel Order Date', hideable: true },
        { field: 'shipping_name', headerName: 'Recipient Name', hideable: true },
        { field: 'channel_name', headerName: 'Channel', sortable: true, hideable: true },
        { field: 'location', headerName: 'Location', sortable: true, hideable: true },
        { field: 'allocation_status', headerName: 'Allocation Status', sortable: true, hideable: true, hidden: true },
        { field: 'email', headerName: 'Email/Mobile', hideable: true, hidden: true },
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
            initialValue: tab !== 0 ? tab : '',
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
                            setTab(dataTab.find((e) => e.value === newValue && newValue.id) || 0);
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
        { field: 'channel_name', name: 'channel_name', type: 'like', label: 'Channel', initialValue: '' },
        { field: 'loc_name', name: 'loc_name', type: 'like', label: 'Location', initialValue: '' },
        {
            field: 'allocation_status',
            name: 'allocation_status',
            type: ['in', 'null'],
            label: 'Allocation Status',
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <Autocomplete
                    style={{ width: 228 }}
                    value={optionsAllocation.find((e) => e.id === filterValue)}
                    onChange={(newValue) => {
                        if (newValue && newValue.id === 'true') {
                            setIndexType({ ...indexType, allocation_status: 1 });
                        } else {
                            setIndexType({ ...indexType, allocation_status: 0 });
                        }
                        setFilterValue(newValue && newValue.id);
                    }}
                    options={optionsAllocation}
                />
            ),
        },
        { field: 'is_pickup', name: 'is_pickup', type: 'eq', label: 'is Pickup', class: 'fixed', initialValue: '1', hidden: true },
        { field: 'pickup_id', name: 'pickup_id', type: 'null', label: 'Pickup Id', class: 'fixed', initialValue: 'true', hidden: true },
    ];

    const getIconByStatus = (status) => {
        if (status.value === 'process_for_pack' || status.value === 'process_for_shipping'
        || status.value === 'pick_in_progress') {
            if (status.label === 'Cannot Fulfill') {
                return '/assets/img/order_status/cannotfulfill.svg';
            }
            return '/assets/img/order_status/processforpack.svg';
        }
        if (status.value === 'cannot_fulfill') {
            return '/assets/img/order_status/cannotfulfill.svg';
        }
        if (status.value === 'ready_for_pack' || status.value === 'pick_uncomplete') {
            return '/assets/img/order_status/readyforpack.svg';
        }
        if (status.value === 'ready_for_pickup') {
            return '/assets/img/order_status/readyforpickup.svg';
        }
        if (status.value === 'customer_picked_up' || status.value === 'customer_waiting') {
            return '/assets/img/order_status/customerpicked.svg';
        }
        return '/assets/img/order_status/customerpicked.svg';
    };

    const rows = storeShipmentList.map((storepickup) => ({
        ...storepickup,
        id: storepickup.entity_id,
        email: `${storepickup.shipping_email} ${storepickup.shipping_telephone}`,
        channel_name: `${storepickup.channel.channel_name}`,
        action: () => (
            <Link href={`/shipment/storepickup/edit/${storepickup.entity_id}`}>
                <a className="link-button">Edit</a>
            </Link>
        ),
        status: () => (
            <div className={classes.statusRow}>
                <img src={getIconByStatus(storepickup.status)} alt="" className={classes.statusIcon} />
                {storepickup.status.label}
            </div>
        ),
        allocation_status: () => (
            <div
                className={clsx(classes.statusRow, 'unbold')}
                style={{
                    textTransform: 'capitalize',
                }}
            >
                {storepickup.allocation_status?.split('_').join(' ') || 'Unconfirmed'}
            </div>
        ),
        location: storepickup.location.loc_name || '-',
        track_number: storepickup.track_number || '-',
    }));

    const actions = [
        {
            label: 'Print Pick List',
            message: 'ready for print?',
            onClick: (checkedRows) => {
                const idPrint = checkedRows.map((checkedRow) => checkedRow.id);
                window.open(`/printoms/pick/${idPrint.toString().replace(/,/g, '/')}`);
            },
            showMessage: false,
        },
        {
            label: 'Print Pack List',
            message: 'ready for print?',
            onClick: (checkedRows) => {
                const idPrint = checkedRows.map((checkedRow) => checkedRow.id);
                window.open(`/printoms/pack/${idPrint.toString().replace(/,/g, '/')}`);
            },
            showMessage: false,
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
    ];

    const onChangeTab = async (e, v) => {
        setLoad(true);
        await setTab(v);
        setLoad(false);
    };

    const handleReset = () => {
        setIndexType({
            allocation_status: 0,
        });
        setTab(0);
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
                    getRows={getStoreShipmentList}
                    loading={loading}
                    columns={columns}
                    count={storeShipmentTotal}
                    showCheckbox
                    handleReset={() => handleReset()}
                    indexType={indexType}
                />
            )}
        </>
    );
};

export default StorePickupListContent;
