/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Header from '@modules/productcategory/pages/list/components/Header';

const ProductCategoryListContent = (props) => {
    const { data, loading, getProductCategoryList } = props;
    const productCategoryList = (data && data.getProductCategoryList && data.getProductCategoryList.items) || [];
    const productCategoryTotal = (data && data.getProductCategoryList && data.getProductCategoryList.total_count) || 0;

    const columns = [
        { field: 'entity_id', headerName: 'ID' },
        { field: 'marketplace_code', headerName: 'Marketplace' },
        { field: 'marketplace_category_id', headerName: 'Category ID' },
        { field: 'marketplace_category_name', headerName: 'Category Name' },
    ];

    const rows = productCategoryList.map((productCategory) => ({
        ...productCategory,
        id: productCategory.entity_id,
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
                getRows={getProductCategoryList}
                loading={loading}
                columns={columns}
                count={productCategoryTotal}
                showCheckbox
            />
        </>
    );
};

export default ProductCategoryListContent;
