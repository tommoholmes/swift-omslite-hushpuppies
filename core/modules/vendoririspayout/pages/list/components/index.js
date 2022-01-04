/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Link from 'next/link';
import Header from '@modules/vendoririspayout/pages/list/components/Header';
import useStyles from '@modules/vendoririspayout/pages/list/components/style';

const VendorIrisPayoutListContent = (props) => {
    const classes = useStyles();
    const { data, loading, getVendorIrisPayoutHistory } = props;
    const vendorIrisPayoutList = (data && data.getVendorIrisPayoutHistory && data.getVendorIrisPayoutHistory.items) || [];
    const vendorIrisPayoutTotal = (data && data.getVendorIrisPayoutHistory && data.getVendorIrisPayoutHistory.total_count) || 0;

    const columns = [
        { field: 'id', headerName: 'ID', sortable: true, hideable: true },
        { field: 'create_at', headerName: 'Created At', sortable: true, hideable: true, initialSort: 'DESC' },
        { field: 'action', headerName: 'Action', sortable: true, hideable: true },
        { field: 'request', headerName: 'Request', sortable: true, hideable: true },
        { field: 'response', headerName: 'Response', sortable: true, hideable: true },
        { field: 'amount', headerName: 'Amount', sortable: true, hideable: true },
    ];

    const filters = [
        { field: 'id', name: 'id_from', type: 'from', label: 'ID From', initialValue: '' },
        { field: 'id', name: 'id_to', type: 'to', label: 'ID To', initialValue: '' },
        { field: 'create_at', name: 'create_at_from', type: 'from', label: 'Created At From', initialValue: '', typeInput: 'date' },
        { field: 'create_at', name: 'create_at_to', type: 'to', label: 'Created At To', initialValue: '', typeInput: 'date' },
        { field: 'amount', name: 'amount_from', type: 'from', label: 'amount From', initialValue: '' },
        { field: 'amount', name: 'amount_to', type: 'to', label: 'amount To', initialValue: '' },
        { field: 'action', name: 'action', type: 'like', label: 'Action', initialValue: '' },
        { field: 'request', name: 'request', type: 'like', label: 'Request', initialValue: '' },
        { field: 'response', name: 'response', type: 'like', label: 'Response', initialValue: '' },
    ];

    const rows = vendorIrisPayoutList.map((vendoririspayout) => ({
        ...vendoririspayout,
        id: vendoririspayout.id,
    }));

    return (
        <>
            <Header />
            <Table
                filters={filters}
                rows={rows}
                getRows={getVendorIrisPayoutHistory}
                loading={loading}
                columns={columns}
                count={vendorIrisPayoutTotal}
                hideActions
            />
        </>
    );
};

export default VendorIrisPayoutListContent;
