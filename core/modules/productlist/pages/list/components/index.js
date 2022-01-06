/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Link from 'next/link';
import Header from '@modules/productlist/pages/list/components/Header';
import gqlService from '@modules/productlist/services/graphql';

const ProductListContent = (props) => {
    const { data, loading, getProductList, handleFetchManual } = props;
    const productList = (data && data.getProductList && data.getProductList.items) || [];
    const productTotal = (data && data.getProductList && data.getProductList.total_count) || 0;

    const columns = [
        { field: 'entity_id', headerName: 'ID', hideable: true, sortable: true, initialSort: 'ASC' },
        { field: 'name', headerName: 'Product Name', hideable: true, sortable: true },
        { field: 'sku', headerName: 'SKU', hideable: true, sortable: true },
        { field: 'product_price', headerName: 'Price', hideable: true },
        { field: 'product_special_price', headerName: 'Special Price', hideable: true },
        { field: 'productStatus', headerName: 'Status', hideable: true },
        { field: 'actions', headerName: 'Action' },
    ];

    const filters = [
        { field: 'entity_id', name: 'entity_id_from', type: 'from', label: 'ID From', initialValue: '' },
        { field: 'entity_id', name: 'entity_id_to', type: 'to', label: 'ID To', initialValue: '' },
        { field: 'name', name: 'name', type: 'like', label: 'Product Name', initialValue: '' },
        { field: 'sku', name: 'sku', type: 'like', label: 'SKU', initialValue: '' },
    ];

    const rows = productList.map((product) => ({
        ...product,
        id: product.entity_id,
        productStatus: product.product_status.label,
        actions: () => (
            <Link href={`/product/productlist/edit/${product.entity_id}`}>
                <a className="link-button">view</a>
            </Link>
        ),
    }));

    const [deleteProducts] = gqlService.deleteProducts();

    return (
        <>
            <Header handleFetchManual={handleFetchManual} />
            <Table
                deleteRows={deleteProducts}
                filters={filters}
                rows={rows}
                getRows={getProductList}
                loading={loading}
                columns={columns}
                count={productTotal}
                showCheckbox
            />
        </>
    );
};

export default ProductListContent;
