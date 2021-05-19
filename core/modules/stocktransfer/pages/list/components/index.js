/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Link from 'next/link';
import Header from './Header';

const StockTransferListContent = (props) => {
    const { data, loading, getStockTransferList } = props;
    const stockTransferList = (data && data.getStockTransferList && data.getStockTransferList.items) || [];
    const stockTransferTotal = (data && data.getStockTransferList && data.getStockTransferList.total_count) || 0;

    const columns = [
        { field: 'increment_id', headerName: 'ID', hideable: 'true' },
        { field: 'source_loc_code', headerName: 'Source Location Code', hideable: 'true' },
        { field: 'target_loc_code', headerName: 'Target Location Code', hideable: 'true' },
        { field: 'status', headerName: 'Status', hideable: 'true' },
        { field: 'created_by', headerName: 'Created By', hideable: 'true' },
        { field: 'created_at', headerName: 'Created At', hideable: 'true' },
        { field: 'confirmed_by', headerName: 'Confirmed By', hideable: 'true' },
        { field: 'confirmed_at', headerName: 'Confirmed At', hideable: 'true' },
        { field: 'actions', headerName: 'Action' },
    ];

    const rows = stockTransferList.map((stockTransfer) => ({
        ...stockTransfer,
        id: stockTransfer.increment_id,
        actions: () => (
            <Link href={`/cataloginventory/stocktransfer/edit/${stockTransfer.increment_id}`}>
                <a className="link-button">View</a>
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
                getRows={getStockTransferList}
                loading={loading}
                columns={columns}
                count={stockTransferTotal}
            />
        </>
    );
};

export default StockTransferListContent;
