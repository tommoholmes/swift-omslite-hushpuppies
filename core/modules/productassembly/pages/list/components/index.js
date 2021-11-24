/* eslint-disable react/no-danger */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Header from '@modules/productassembly/pages/list/components/Header';

const OrderQueueListContent = (props) => {
    const { data, loading, getProductAssemblyList } = props;
    const productAssemblyList = (data && data.getProductAssemblyList && data.getProductAssemblyList.items) || [];
    const productAssemblyTotal = (data && data.getProductAssemblyList && data.getProductAssemblyList.total_count) || 0;

    const columns = [
        { field: 'sku', headerName: 'SKU Assembly', sortable: true },
        { field: 'assembly_item_sku', headerName: 'SKU Single', sortable: true },
        { field: 'last_updated', headerName: 'Last Updated', sortable: true },
    ];

    const filters = [
        { field: 'sku', name: 'sku', type: 'like', label: 'SKU Assembly', initialValue: '' },
        { field: 'assembly_item_sku', name: 'assembly_item_sku', type: 'like', label: 'SKU Single', initialValue: '' },
        { field: 'last_updated', name: 'last_updated', type: 'like', label: 'Last Updated', initialValue: '' },
    ];

    const rows = productAssemblyList.map((assembly) => ({
        ...assembly,
        id: assembly.sku,
        assembly_item_sku: <div dangerouslySetInnerHTML={{ __html: assembly.assembly_item_sku }} />,
        last_updated: <div dangerouslySetInnerHTML={{ __html: assembly.last_updated }} />,
    }));

    return (
        <>
            <Header />
            <Table
                filters={filters}
                rows={rows}
                getRows={getProductAssemblyList}
                loading={loading}
                columns={columns}
                count={productAssemblyTotal}
                hideActions
                hideColumns
            />
        </>
    );
};

export default OrderQueueListContent;
