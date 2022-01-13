import Header from '@modules/stockadjustment/pages/list/components/Header';
import React from 'react';
import Table from '@common_table';
import Link from 'next/link';

const StockAdjustmentList = (props) => {
    const { data, loading, getStockAdjustmentList } = props;
    const stockAdjustmentList = (data && data.getStockAdjustmentList && data.getStockAdjustmentList.items) || [];
    const stockAdjustmentTotal = (data && data.getStockAdjustmentList && data.getStockAdjustmentList.total_count) || 0;

    const columns = [
        {
            field: 'increment_id',
            headerName: 'ID',
            hideable: 'true',
            sortable: true,
            initialSort: 'DESC',
        },
        {
            field: 'loc_name',
            headerName: 'Location',
            hideable: 'true',
            sortable: true,
        },
        {
            field: 'created_by',
            headerName: 'Created By',
            hideable: 'true',
            sortable: true,
        },
        {
            field: 'created_at',
            headerName: 'Created At',
            hideable: 'true',
            sortable: true,
        },
        {
            field: 'confirmed_by',
            headerName: 'Confirmed By',
            hideable: 'true',
            sortable: true,
        },
        {
            field: 'confirmed_at',
            headerName: 'Confirmed At',
            hideable: 'true',
            sortable: true,
        },
        {
            field: 'status',
            headerName: 'Status',
            hideable: 'true',
            sortable: true,
        },
        { field: 'actions', headerName: 'Action' },
    ];

    const filters = [
        {
            field: 'increment_id',
            name: 'increment_id',
            type: 'like',
            label: 'ID',
            initialValue: '',
        },
        {
            field: 'loc_name',
            name: 'loc_name',
            type: 'like',
            label: 'Location',
            initialValue: '',
        },
        {
            field: 'created_by',
            name: 'created_by',
            type: 'like',
            label: 'Created By',
            initialValue: '',
        },
        {
            field: 'confirmed_by',
            name: 'confirmed_by',
            type: 'like',
            label: 'Confirmed By',
            initialValue: '',
        },
    ];

    const getStatus = (status) => {
        if (status === 1) {
            return 'Completed';
        }

        return 'Pending';
    };

    const rows = stockAdjustmentList.map((stockAdjustment) => ({
        ...stockAdjustment,
        id: stockAdjustment.entity_id,
        actions: () => (
            <Link href={`/cataloginventory/stockadjustment/${stockAdjustment.entity_id}/edit`}>
                <a className="link-button">Edit</a>
            </Link>
        ),
        status: () => <>{getStatus(stockAdjustment.status)}</>,
    }));

    return (
        <>
            <Header />
            <Table
                hideActions
                filters={filters}
                rows={rows}
                getRows={getStockAdjustmentList}
                loading={loading}
                columns={columns}
                count={stockAdjustmentTotal}
            />
        </>
    );
};

export default StockAdjustmentList;
