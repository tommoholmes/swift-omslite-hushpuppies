/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Header from '@modules/productattributemapping/pages/list/components/Header';

const ProductMappingListContent = (props) => {
    const { data, loading, getMarketplaceProductAttributeMappingList, deleteMarketplaceProductAttributeMapping,
        handleExport } = props;
    const productAttributeList = (data && data.getMarketplaceProductAttributeMappingList
        && data.getMarketplaceProductAttributeMappingList.items) || [];
    const productAttributeTotal = (data && data.getMarketplaceProductAttributeMappingList
        && data.getMarketplaceProductAttributeMappingList.total_count) || 0;

    const columns = [
        { field: 'entity_id', headerName: 'ID', sortable: true, initialSort: 'ASC' },
        { field: 'marketplace_code', headerName: 'Marketplace Code', sortable: true },
        { field: 'marketplace_category_name', headerName: 'Marketplace Category', sortable: true },
        { field: 'marketplace_attribute_name', headerName: 'Marketplace Attribute Name', sortable: true },
        { field: 'attribute_code', headerName: 'Attribute Code', sortable: true },
    ];

    const rows = productAttributeList.map((productAttribute) => ({
        ...productAttribute,
        id: productAttribute.entity_id,
    }));

    const filters = [
        { field: 'entity_id', name: 'entity_id_from', type: 'from', label: 'ID from', initialValue: '' },
        { field: 'entity_id', name: 'entity_id_to', type: 'to', label: 'ID to', initialValue: '' },
        { field: 'marketplace_code', marketplace_code: 'marketplace_code', type: 'like', label: 'Marketplace Code', initialValue: '' },
        { field: 'marketplace_category_name', name: 'marketplace_category_name', type: 'like', label: 'Marketplace Category', initialValue: '' },
        {
            field: 'marketplace_attribute_name',
            name: 'marketplace_attribute_name',
            type: 'like',
            label: 'Marketplace Attribute Name',
            initialValue: '',
        },
        { field: 'attribute_code', name: 'attribute_code', type: 'like', label: 'Attribute Code', initialValue: '' },
    ];

    return (
        <>
            <Header />
            <Table
                rows={rows}
                getRows={getMarketplaceProductAttributeMappingList}
                deleteLabel="Delete Mapping"
                deleteRows={deleteMarketplaceProductAttributeMapping}
                loading={loading}
                columns={columns}
                count={productAttributeTotal}
                filters={filters}
                handleExport={handleExport}
                showCheckbox
                hideColumns
            />
        </>
    );
};

export default ProductMappingListContent;
