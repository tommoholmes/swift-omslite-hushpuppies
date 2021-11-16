/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Link from 'next/link';
import TextField from '@common_textfield';
import Autocomplete from '@common_autocomplete';
import statusGqlService from '@modules/rmastatuses/services/graphql';
import useStyles from '@modules/managerma/pages/list/components/style';
import Header from '@modules/managerma/pages/list/components/Header';
import Tabs from '@common_tabs';

const ManageRmaListContent = (props) => {
    const classes = useStyles();
    const { data, loading, getRmaList } = props;

    const dataTab = [
        { label: 'Pending Approval', value: 'pending_approval' },
        { label: 'Approved', value: 'approved' },
        { label: 'Package Sent', value: 'package_sent' },
        { label: 'Package Received', value: 'package_received' },
        { label: 'Processing', value: 'processing' },
        { label: 'Complete', value: 'complete' },
        { label: 'All', value: 0 },
    ];
    const [tab, setTab] = React.useState('pending_approval');
    const [load, setLoad] = React.useState(false);

    const rmaList = (data && data.getRmaList && data.getRmaList.items) || [];
    const rmaTotal = (data && data.getRmaList && data.getRmaList.total_count) || 0;

    const columns = [
        { field: 'increment_id', headerName: 'Request #', hideable: true, sortable: true, initialSort: 'DESC' },
        { field: 'channel_order_increment_id', headerName: 'Channel Order #', hideable: true, sortable: true },
        { field: 'status_label', headerName: 'Status', hideable: true, sortable: true },
        { field: 'loc_name', headerName: 'Origin Location(s)', hideable: true },
        { field: 'customer', headerName: 'Customer', hideable: true },
        { field: 'created_at', headerName: 'Created At', hideable: true, sortable: true },
        { field: 'actions', headerName: 'Actions' },
    ];

    const filters = [
        {
            field: 'created_at',
            name: 'created_at_from',
            type: 'from',
            label: 'Created From',
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
            field: 'created_at',
            name: 'created_at_to',
            type: 'to',
            label: 'Created To',
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
        { field: 'increment_id', name: 'increment_id', type: 'like', label: 'Request #', initialValue: '' },
        { field: 'channel_order_increment_id', name: 'channel_order_increment_id', type: 'like', label: 'Channel Order #', initialValue: '' },
        {
            field: 'status_code',
            name: 'status_code',
            type: 'eq',
            label: 'Status',
            initialValue: tab !== 0 ? tab : '',
            component: ({ filterValue, setFilterValue }) => {
                const [getRmaStatusList, getRmaStatusListRes] = statusGqlService.getRmaStatusList();
                const channelOptions = (getRmaStatusListRes
                    && getRmaStatusListRes.data
                    && getRmaStatusListRes.data.getRmaStatusList
                    && getRmaStatusListRes.data.getRmaStatusList.items) || [];
                const primaryKey = 'status_code';
                const labelKey = 'status_label';
                return (
                    <Autocomplete
                        mode="lazy"
                        style={{ width: 228 }}
                        getOptions={getRmaStatusList}
                        value={channelOptions.find((e) => e[primaryKey] === filterValue)}
                        onChange={(newValue) => setFilterValue(newValue && newValue[primaryKey])}
                        options={channelOptions}
                        primaryKey={primaryKey}
                        labelKey={labelKey}
                    />
                );
            },
        },
    ];

    const rows = rmaList.map((rma) => ({
        ...rma,
        id: rma.id,
        actions: () => (
            <Link href={`/sales/managerma/edit/${rma.id}`}>
                <a className="link-button">Edit</a>
            </Link>
        ),
        customer: `${rma.customer_name}, ${rma.customer_email}`,
        loc_name: rma.loc_name?.join(', ') || '-',
    }));

    const onChangeTab = async (e, v) => {
        setLoad(true);
        await setTab(v);
        setLoad(false);
    };

    const handleReset = () => {
        setTab(0);
    };

    return (
        <>
            <Header />
            <Tabs data={dataTab} onChange={onChangeTab} value={tab} allItems={false} />
            {!load && (
                <Table
                    filters={filters}
                    rows={rows}
                    getRows={getRmaList}
                    loading={loading}
                    columns={columns}
                    count={rmaTotal}
                    handleReset={() => handleReset()}
                    hideActions
                />
            )}
        </>
    );
};

export default ManageRmaListContent;
