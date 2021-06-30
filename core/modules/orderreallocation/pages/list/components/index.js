/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Link from 'next/link';
import Header from './Header';

const OrderReallocationListContent = (props) => {
    const { data, loading, getOrderReallocationList } = props;
    const orderReallocationList = (data && data.getOrderReallocationList && data.getOrderReallocationList.items) || [];
    const orderReallocationTotal = (data && data.getOrderReallocationList && data.getOrderReallocationList.total_count) || 0;

    const columns = [
        { field: 'increment_id', headerName: 'Shipment Number', sortable: true, initialSort: 'DESC' },
        { field: 'order_increment_id', headerName: 'Order Number', hideable: true, sortable: true },
        { field: 'channel_order_increment_id', headerName: 'Channel Order Number', hideable: true, sortable: true },
        { field: 'created_at', headerName: 'Order Date', hideable: true, sortable: true },
        { field: 'customer_name', headerName: 'Recipient Name', hideable: true, sortable: true },
        { field: 'customer_name', headerName: 'Billing Name', hideable: true, sortable: true },
        { field: 'email', headerName: 'Email Address', hideable: true, sortable: true },
        { field: 'email', headerName: 'Phone', hideable: true, sortable: true },
        { field: 'status', headerName: 'Status', hideable: true, sortable: true },
        { field: 'loc_name', headerName: 'Location Name', hideable: true, sortable: true },
        { field: 'actions', headerName: 'Actions', hideable: true },
    ];

    const rows = orderReallocationList.map((orderReallocation) => ({
        ...orderReallocation,
        id: orderReallocation.entity_id,
        actions: () => (
            <Link href={`/sales/orderreallocation/edit/${orderReallocation.entity_id}`}>
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
                rows={rows}
                getRows={getOrderReallocationList}
                loading={loading}
                columns={columns}
                count={orderReallocationTotal}
            />
        </>
    );
};

export default OrderReallocationListContent;
