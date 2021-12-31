/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React, { useState } from 'react';
import Table from '@common_table';
import Header from '@modules/productcategory/pages/list/components/Header';
import { useRouter } from '@root/node_modules/next/router';
import { getCookies, removeCookies } from '@helper_cookies';
import MuiAlert from '@material-ui/lab/Alert';

const ProductCategoryListContent = (props) => {
    const [isPull, setIsPull] = useState(null);
    const cookie = getCookies('isPull');
    if (isPull === null) {
        setIsPull(cookie);
    } else if (cookie) {
        removeCookies('isPull');
    }
    const { data, loading, getProductCategoryList, multidisableProductCategory } = props;
    const productCategoryList = (data && data.getProductCategoryList && data.getProductCategoryList.items) || [];
    const productCategoryTotal = (data && data.getProductCategoryList && data.getProductCategoryList.total_count) || 0;

    const columns = [
        { field: 'entity_id', headerName: 'ID', sortable: true, hideable: true, initialSort: 'ASC' },
        { field: 'marketplace_code', headerName: 'Marketplace', sortable: true, hideable: true },
        { field: 'marketplace_category_id', headerName: 'Category ID', sortable: true, hideable: true },
        { field: 'marketplace_category_name', headerName: 'Category Name', sortable: true, hideable: true },
    ];

    const filters = [
        { field: 'entity_id', name: 'entity_id', type: 'from', label: 'ID', initialValue: '' },
        { field: 'marketplace_code', name: 'marketplace_code', type: 'like', label: 'Marketplace', initialValue: '' },
        { field: 'marketplace_category_id', name: 'marketplace_category_id', type: 'like', label: 'Category ID', initialValue: '' },
        { field: 'marketplace_category_name', name: 'marketplace_category_name', type: 'like', label: 'Category Name', initialValue: '' },
        { field: 'is_active', type: 'eq', initialValue: '1', hidden: true },
    ];

    const actions = [
        {
            label: 'Disable',
            message: 'Are you sure you want to disable?',
            onClick: async (_checkedRows) => {
                const variables = { id: _checkedRows.map((checkedRow) => checkedRow.id) };
                await multidisableProductCategory({ variables });
                window.toastMessage({
                    open: true,
                    text: 'Disable success!',
                    variant: 'success',
                });
            },
        },
    ];

    const rows = productCategoryList.map((productCategory) => ({
        ...productCategory,
        id: productCategory.entity_id,
    }));

    return (
        <>
            <Header />
            {isPull && (
                <MuiAlert icon={false} severity="success" style={{ marginBottom: '1rem' }}>
                    Process is in progress, please wait. Check the progress
                    {' '}
                    <a style={{ color: '#007bdb' }} href="/tools/clitools">
                        here
                    </a>
                    .
                </MuiAlert>
            )}
            <Table
                filters={filters}
                rows={rows}
                getRows={getProductCategoryList}
                loading={loading}
                columns={columns}
                count={productCategoryTotal}
                actions={actions}
                hideColumns
                showCheckbox
            />
        </>
    );
};

export default ProductCategoryListContent;
