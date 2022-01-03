/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Link from 'next/link';
import Header from '@modules/warehouse/pages/list/components/Header';

const WarehouseListContent = (props) => {
    const { data, loading, getWarehouseList, multideleteWarehouse } = props;
    const warehouseList = (data && data.getWarehouseList && data.getWarehouseList.items) || [];
    const warehouseTotal = (data && data.getWarehouseList && data.getWarehouseList.total_count) || 0;

    const columns = [
        { field: 'id', headerName: 'ID', sortable: true, hideable: true, initialSort: 'ASC' },
        { field: 'channel_code', headerName: 'Channel', sortable: true, hideable: true },
        { field: 'marketplace_warehouse_id', headerName: 'Marketplace Warehouse ID', sortable: true, hideable: true },
        { field: 'loc_id', headerName: 'Location', sortable: true, hideable: true },
        { field: 'actions', headerName: 'Actions' },
    ];

    const filters = [
        { field: 'id', name: 'id', type: 'from', label: 'ID', initialValue: '' },
        { field: 'channel_code', name: 'channel_code', type: 'like', label: 'Channel', initialValue: '' },
        { field: 'marketplace_warehouse_id', name: 'marketplace_warehouse_id', type: 'like', label: 'Marketplace Warehouse ID', initialValue: '' },
        { field: 'loc_id', name: 'loc_id', type: 'from', label: 'Location', initialValue: '' },
    ];

    const rows = warehouseList.map((warehouse) => ({
        ...warehouse,
        id: warehouse.id,
        channel_code: warehouse.channel_code.channel_name,
        loc_id: `${warehouse.loc_id.loc_code} - ${warehouse.loc_id.loc_name}`,
        actions: () => (
            <Link href={`/marketplace/warehouse/edit/${warehouse.id}`}>
                <a className="link-button">Edit</a>
            </Link>
        ),
    }));

    return (
        <>
            <Header />
            <Table
                filters={filters}
                rows={rows}
                getRows={getWarehouseList}
                deleteRows={multideleteWarehouse}
                loading={loading}
                columns={columns}
                count={warehouseTotal}
                showCheckbox
            />
        </>
    );
};

export default WarehouseListContent;
