/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Link from 'next/link';
import Header from './Header';

const ManageRmaListContent = (props) => {
    const { data, loading, getRmaList } = props;
    const rmaList = (data && data.getRmaList && data.getRmaList.items) || [];
    const rmaTotal = (data && data.getRmaList && data.getRmaList.total_count) || 0;

    const columns = [
        // { field: 'request', headerName: 'Request #' },
        { field: 'channel_order_increment_id', headerName: 'Channel Order #', hideable: true },
        { field: 'status_code', headerName: 'Status', hideable: true },
        { field: 'loc_name', headerName: 'Origin Location(s)', hideable: true },
        { field: 'customer_email', headerName: 'Customer', hideable: true },
        { field: 'created_at', headerName: 'Created At', hideable: true },
        { field: 'actions', headerName: 'Actions' },
    ];

    const rows = rmaList.map((rma) => ({
        ...rma,
        id: rma.id,
        actions: () => (
            <Link href={`/sales/managerma/edit/${rma.id}`}>
                <a className="link-button">Edit</a>
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
                rows={rows}
                getRows={getRmaList}
                loading={loading}
                columns={columns}
                count={rmaTotal}
            />
        </>
    );
};

export default ManageRmaListContent;
