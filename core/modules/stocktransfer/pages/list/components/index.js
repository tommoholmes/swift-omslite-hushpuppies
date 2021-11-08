/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Link from 'next/link';
import Header from '@modules/stocktransfer/pages/list/components/Header';

const StockTransferListContent = (props) => {
    const { data, loading, getStockTransferList } = props;
    const stockTransferList = (data && data.getStockTransferList && data.getStockTransferList.items) || [];
    const stockTransferTotal = (data && data.getStockTransferList && data.getStockTransferList.total_count) || 0;

    const columns = [
        { field: 'increment_id', headerName: 'ID', hideable: 'true', sortable: true, initialSort: 'DESC' },
        { field: 'source_loc_name', headerName: 'Source Location Name', hideable: 'true', sortable: true },
        { field: 'target_loc_name', headerName: 'Target Location Name', hideable: 'true', sortable: true },
        { field: 'status', headerName: 'Status', hideable: 'true', sortable: true },
        { field: 'created_by', headerName: 'Created By', hideable: 'true', sortable: true },
        { field: 'created_at', headerName: 'Created At', hideable: 'true', sortable: true },
        { field: 'confirmed_by', headerName: 'Confirmed By', hideable: 'true', sortable: true },
        { field: 'confirmed_at', headerName: 'Confirmed At', hideable: 'true', sortable: true },
        { field: 'actions', headerName: 'Action' },
    ];

    const filters = [
        { field: 'increment_id', name: 'increment_id', type: 'like', label: 'ID', initialValue: '' },
        { field: 'source_loc_name', name: 'source_loc_name', type: 'like', label: 'Source Location Name', initialValue: '' },
        { field: 'target_loc_name', name: 'target_loc_name', type: 'like', label: 'Target Location Name', initialValue: '' },
        { field: 'created_by', name: 'created_by', type: 'like', label: 'Created By', initialValue: '' },
        { field: 'confirmed_by', name: 'confirmed_by', type: 'like', label: 'Confirmed By', initialValue: '' },
    ];

    const getStatus = (status) => {
        if (status === 1) {
            return 'Enabled';
        }

        return 'Disabled';
    };

    const rows = stockTransferList.map((stockTransfer) => ({
        ...stockTransfer,
        id: stockTransfer.entity_id,
        actions: () => (
            <Link href={`/cataloginventory/stocktransfer/${stockTransfer.entity_id}/edit`}>
                <a className="link-button">View</a>
            </Link>
        ),
        status: () => <>{getStatus(stockTransfer.status)}</>,
    }));

    return (
        <>
            <Header />
            <Table
                filters={filters}
                rows={rows}
                getRows={getStockTransferList}
                loading={loading}
                columns={columns}
                count={stockTransferTotal}
                hideActions
            />
        </>
    );
};

export default StockTransferListContent;
