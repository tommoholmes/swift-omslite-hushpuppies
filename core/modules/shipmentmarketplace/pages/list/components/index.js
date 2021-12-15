/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Link from 'next/link';
import Autocomplete from '@common_autocomplete';
import Tabs from '@common_tabs';
import { optionsAllocation, dataTabAll, dataTabNoPickPack } from '@modules/shipmentmarketplace/helpers';
import Header from '@modules/shipmentmarketplace/pages/list/components/Header';
import useStyles from '@modules/shipmentmarketplace/pages/list/components/style';
import clsx from 'clsx';
import TextField from '@common_textfield';

const ShipmentMarketplaceListContent = (props) => {
    const classes = useStyles();
    const { data, loading, getStoreShipmentList, confirmMarketplaceShipment,
        pickShipment, packShipment, setVarExport, varExport, exportStoreShipmentToCsv,
        getExportStatusHistory, optionsStatus, dataConfig } = props;
    const storeShipmentList = (data && data.getStoreShipmentList && data.getStoreShipmentList.items) || [];
    const storeShipmentTotal = (data && data.getStoreShipmentList && data.getStoreShipmentList.total_count) || 0;
    const [tab, setTab] = React.useState('process_for_shipping');
    const [load, setLoad] = React.useState(false);
    const [awbNull, setAwbNull] = React.useState('');
    const [indexType, setIndexType] = React.useState({
        track_number: 0,
        allocation_status: 0,
    });

    const columns = [
        { field: 'increment_id', headerName: 'Shipment Number', sortable: true, initialSort: 'DESC', hideable: true },
        { field: 'channel_order_increment_id', headerName: 'Channel Order Number', sortable: true, hideable: true },
        { field: 'marketplace_order_number', headerName: 'Marketplace Order Number', hideable: true },
        { field: 'status', headerName: 'Status', sortable: true, hideable: true },
        { field: 'channel_order_date', headerName: 'Channel Order Date', hideable: true },
        { field: 'shipping_name', headerName: 'Recipient Name', hideable: true },
        { field: 'channel_name', headerName: 'Channel', sortable: true, hideable: true },
        { field: 'location', headerName: 'Location', sortable: true, hideable: true },
        { field: 'track_number', headerName: 'Airwaybill Number', hideable: true },
        { field: 'allocation_status', headerName: 'Allocation Status', sortable: true, hideable: true, hidden: true },
        { field: 'connexi_order_status', headerName: 'Connexi Order Status', hideable: true, hidden: true },
        { field: 'action', headerName: 'Action', hideable: true },
    ];

    const awbInput = ['Null', 'Not Null'];
    const filters = [
        { field: 'increment_id', name: 'increment_id', type: 'like', label: 'Shipment Number', initialValue: '' },
        { field: 'channel_order_increment_id', name: 'channel_order_increment_id', type: 'like', label: 'Channel Order Number', initialValue: '' },
        { field: 'marketplace_order_number', name: 'marketplace_order_number', type: 'like', label: 'Marketplace Order Number', initialValue: '' },
        {
            field: 'status',
            name: 'status',
            type: 'like',
            label: 'Status',
            // eslint-disable-next-line no-nested-ternary
            initialValue: tab !== 0 ? tab.includes('order_shipped') ? 'order_shipped' : tab : '',
            component: ({ filterValue, setFilterValue }) => {
                const options = optionsStatus.slice().map((item) => ({
                    name: item.label,
                    id: item.value,
                }));
                return (
                    <Autocomplete
                        style={{ width: 228 }}
                        value={options.find((e) => e.id === filterValue)}
                        onChange={(newValue) => setFilterValue(newValue && newValue.id)}
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
        { field: 'shipping_name', name: 'shipping_name', type: 'like', label: 'Recipient Name', initialValue: '' },
        { field: 'channel_name', name: 'channel_name', type: 'like', label: 'Channel', initialValue: '' },
        { field: 'loc_name', name: 'loc_name', type: 'like', label: 'Location', initialValue: '' },
        { field: 'framework', name: 'framework', type: 'eq', label: 'Framework', class: 'fixed', initialValue: 'Marketplace', hidden: true },
        {
            field: 'track_number',
            name: 'track_number',
            type: ['like', 'null', 'notnull'],
            label: 'Airwaybill Number',
            initialValue: awbNull,
            component: ({ filterValue, setFilterValue }) => (
                <TextField
                    inputProps={{
                        className: classes.input,
                    }}
                    variant="outlined"
                    size="small"
                    value={awbNull ? awbInput[indexType.track_number - 1] : filterValue}
                    onChange={(e) => {
                        setFilterValue(e.target.value);
                    }}
                    disabled={!!awbNull}
                />
            ),
        },
        { field: 'is_pickup', name: 'is_pickup', type: 'eq', label: 'is Pickup', class: 'fixed', initialValue: '0', hidden: true },
    ];

    const getIconByStatus = (status) => {
        if (status.value === 'process_for_pack' || status.value === 'process_for_shipping'
        || status.value === 'pick_in_progress') {
            if (status.label === 'Cannot Fulfill') {
                return '/assets/img/order_status/cannotfulfill.svg';
            }
            return '/assets/img/order_status/processforpack.svg';
        }
        if (status.value === 'cannot_fulfill' || status.value === 'canceled') {
            return '/assets/img/order_status/cannotfulfill.svg';
        }
        if (status.value === 'ready_for_pack' || status.value === 'pick_uncomplete') {
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

    const rows = storeShipmentList.map((shipmentmarketplace) => ({
        ...shipmentmarketplace,
        id: shipmentmarketplace.entity_id,
        channel_name: shipmentmarketplace.channel.channel_name,
        action: () => (
            <Link href={`/shipment/shipmentmarketplace/edit/${shipmentmarketplace.entity_id}`}>
                <a className="link-button">Edit</a>
            </Link>
        ),
        status: () => (
            <div className={classes.statusRow}>
                <img src={getIconByStatus(shipmentmarketplace.status)} alt="" className={classes.statusIcon} />
                {shipmentmarketplace.status.label}
            </div>
        ),
        location: shipmentmarketplace.location.loc_name,
        allocation_status: () => (
            <div
                className={clsx(classes.statusRow, 'unbold')}
                style={{
                    textTransform: 'capitalize',
                }}
            >
                {shipmentmarketplace.allocation_status?.split('_').join(' ') || 'Unconfirmed'}
            </div>
        ),
        track_number: shipmentmarketplace.track_number || '-',
    }));

    let actions = [
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
            label: 'Print Shipping Label',
            message: 'ready for print?',
            onClick: (checkedRows) => {
                const idPrint = checkedRows.map((checkedRow) => checkedRow.id);
                window.open(`/printoms/shippinglabel/${idPrint.toString().replace(/,/g, '/')}`);
            },
            showMessage: false,
        },
        {
            label: 'Mark Confirm Complete',
            message: 'Are you sure to confirm ?',
            onClick: async (checkedRows) => {
                const variables = { id: checkedRows.map((checkedRow) => checkedRow.id) };
                await confirmMarketplaceShipment({ variables });
            },
        },
    ];

    const exports = [
        {
            label: 'Export Without Items',
            message: 'ready for print?',
            onClick: async (checkedRows) => {
                const incrementIds = checkedRows.map((checkedRow) => String(checkedRow.increment_id));
                window.backdropLoader(true);
                await exportStoreShipmentToCsv({
                    variables: {
                        type: 'marketplace',
                        ...varExport,
                        filter: {
                            increment_id: {
                                in: incrementIds,
                            },
                            ...varExport.filter,
                        },
                    },
                });
            },
        },
        {
            label: 'Export With Items',
            message: 'ready for print?',
            onClick: async (checkedRows) => {
                const incrementIds = checkedRows.map((checkedRow) => String(checkedRow.increment_id));
                window.backdropLoader(true);
                await exportStoreShipmentToCsv({
                    variables: {
                        type: 'marketplace',
                        with_items: true,
                        ...varExport,
                        filter: {
                            increment_id: {
                                in: incrementIds,
                            },
                            ...varExport.filter,
                        },
                    },
                });
            },
        },
        {
            label: 'Export Status History',
            message: 'ready for print?',
            onClick: async (checkedRows) => {
                const variables = { id: checkedRows.map((checkedRow) => checkedRow.id) };
                await getExportStatusHistory({ variables });
            },
        },
    ];

    const onChangeTab = async (e, v) => {
        setLoad(true);
        if (e.target.innerHTML === 'Order Shipped - No AWB') {
            await setIndexType({ ...indexType, track_number: 1 });
            await setAwbNull('true');
        } else if (e.target.innerHTML === 'Order Shipped - AWB') {
            await setIndexType({ ...indexType, track_number: 2 });
            await setAwbNull('true');
        } else {
            setIndexType({ ...indexType, track_number: 0 });
            await setAwbNull('');
        }
        await setTab(v);
        setLoad(false);
    };

    const handleReset = () => {
        setIndexType({
            allocation_status: 0,
            track_number: 0,
        });
        setTab(0);
    };

    React.useEffect(() => {
        if (dataConfig) {
            actions = [
                ...actions,
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
        }
    }, [dataConfig]);

    return (
        <>
            <Header />
            <Tabs data={dataConfig ? dataTabAll : dataTabNoPickPack} onChange={onChangeTab} value={tab} allItems={false} />
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
                    setVarExport={setVarExport}
                    indexType={indexType}
                    exports={exports}
                />
            )}
        </>
    );
};

export default ShipmentMarketplaceListContent;
