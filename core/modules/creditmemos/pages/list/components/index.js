/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Link from 'next/link';
import TextField from '@common_textfield';
import Autocomplete from '@common_autocomplete';
import { optionsStatus } from '@modules/creditmemos/helpers';
import useStyles from '@modules/creditmemos/pages/list/components/style';
import Header from '@modules/creditmemos/pages/list/components/Header';

const CreditmemoListContent = (props) => {
    const classes = useStyles();
    const { data, loading, getCreditMemoList } = props;
    const creditmemoList = (data && data.getCreditMemoList && data.getCreditMemoList.items) || [];
    const creditmemoTotal = (data && data.getCreditMemoList && data.getCreditMemoList.total_count) || 0;

    const columns = [
        { field: 'increment_id', headerName: 'Credit Memo', hideable: true, sortable: true, initialSort: 'ASC' },
        { field: 'created_at', headerName: 'Created', hideable: true, sortable: true },
        { field: 'order_increment_id', headerName: 'Order', hideable: true, sortable: true },
        { field: 'channel_order_increment_id', headerName: 'Channel Order', hideable: true, sortable: true },
        { field: 'order_created_at', headerName: 'Order Date', hideable: true, sortable: true },
        { field: 'billing_name', headerName: 'Bill-to Name', hideable: true, sortable: true },
        { field: 'state', headerName: 'Status', hideable: true, sortable: true },
        { field: 'base_grand_total', headerName: 'Refunded', hideable: true, sortable: true },
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
        { field: 'order_increment_id', name: 'order_increment_id', type: 'match', label: 'Order', initialValue: '' },
        {
            field: 'order_created_at',
            name: 'order_created_at_from',
            type: 'from',
            label: 'Order date From',
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
            field: 'order_created_at',
            name: 'order_created_at_to',
            type: 'to',
            label: 'Order date To',
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
        { field: 'base_grand_total', name: 'base_grand_total_from', type: 'from', label: 'Refunded From', initialValue: '' },
        { field: 'base_grand_total', name: 'base_grand_total_to', type: 'to', label: 'Refunded To', initialValue: '' },
        { field: 'increment_id', name: 'increment_id', type: 'like', label: 'Credit Memo', initialValue: '' },
        { field: 'channel_order_increment_id', name: 'channel_order_increment_id', type: 'like', label: 'Channel Order', initialValue: '' },
        { field: 'billing_name', name: 'billing_name', type: 'like', label: 'Bill-to-Name', initialValue: '' },
        {
            field: 'state',
            name: 'state',
            type: 'eq',
            label: 'Status',
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => (
                <Autocomplete
                    style={{ width: 228 }}
                    value={optionsStatus.find((e) => e.id === filterValue)}
                    onChange={(newValue) => setFilterValue(newValue && newValue.id)}
                    options={optionsStatus}
                />
            ),
        },
    ];

    const rows = creditmemoList.map((creditmemo) => ({
        ...creditmemo,
        id: creditmemo.increment_id,
        state: creditmemo.state.label,
        actions: () => (
            <Link href={`/sales/creditmemos/edit/${creditmemo.increment_id}`}>
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
                getRows={getCreditMemoList}
                loading={loading}
                columns={columns}
                count={creditmemoTotal}
            />
        </>
    );
};

export default CreditmemoListContent;