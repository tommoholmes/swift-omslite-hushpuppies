/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Header from '@modules/productattributemapping/pages/list/components/Header';

const ProductMappingListContent = (props) => {
    const { data, loading, getProductAttributeList, multideleteProductAttribute } = props;
    const productAttributeList = (data && data.getProductAttributeList && data.getProductAttributeList.items) || [];
    const productAttributeTotal = (data && data.getProductAttributeList && data.getProductAttributeList.total_count) || 0;

    const columns = [
        { field: 'entity_id', headerName: 'ID' },
        { field: 'marketplace_code', headerName: 'Marketplace Code' },
        { field: 'unknown', headerName: 'Marketplace Category' },
        { field: 'marketplace_attribute_name', headerName: 'Marketplace Attribute Name' },
        { field: 'unknown', headerName: 'Attribute Code' },
    ];

    const rows = productAttributeList.map((productAttribute) => ({
        ...productAttribute,
        id: productAttribute.entity_id,
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
                getRows={getProductAttributeList}
                deleteRows={multideleteProductAttribute}
                loading={loading}
                columns={columns}
                count={productAttributeTotal}
                showCheckbox
            />
        </>
    );
};

export default ProductMappingListContent;
