/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Header from '@modules/productapproval/pages/list/components/Header';
import gqlService from '@modules/productapproval/services/graphql';
import Autocomplete from '@common_autocomplete';

const ProductApprovalListContent = (props) => {
    const { data, loading, getVendorProductApprovalList, productsApprove } = props;
    const productList = (data && data.getVendorProductApprovalList && data.getVendorProductApprovalList.items) || [];
    const productTotal = (data && data.getVendorProductApprovalList && data.getVendorProductApprovalList.total_count) || 0;

    const columns = [
        { field: 'entity_id', headerName: 'ID' },
        { field: 'approval_status', headerName: 'Approval status' },
        { field: 'sku', headerName: 'SKU' },
        { field: 'name', headerName: 'Product Name' },
        { field: 'vendor_name', headerName: 'Vendor' },
        { field: 'price', headerName: 'Price' },
        { field: 'special_price', headerName: 'Special Price' },
        { field: 'status', headerName: 'Status' },
    ];

    const rows = productList.map((product) => ({
        ...product,
        id: product.entity_id,
    }));

    const filters = [
        { field: 'entity_id', name: 'entity_id_from', type: 'from', label: 'ID from', initialValue: '' },
        { field: 'entity_id', name: 'entity_id_to', type: 'to', label: 'ID to', initialValue: '' },
        { field: 'sku', name: 'sku', type: 'like', label: 'SKU', initialValue: '' },
        { field: 'name', name: 'name', type: 'like', label: 'Product Name', initialValue: '' },
        {
            field: 'vendor_code',
            name: 'vendor_code',
            type: 'eq',
            label: 'Vendor',
            initialValue: '',
            component: ({ filterValue, setFilterValue }) => {
                const [getCompanyList, getCompanyListRes] = gqlService.getCompanyList({
                    variables: { pageSize: 0, currentPage: 1 },
                });
                const statusOptions = (getCompanyListRes
                    && getCompanyListRes.data
                    && getCompanyListRes.data.getCompanyList
                    && getCompanyListRes.data.getCompanyList.items) || [];
                const primaryKey = 'company_code';
                const labelKey = 'company_name';
                return (
                    <Autocomplete
                        mode="lazy"
                        style={{ width: 228 }}
                        getOptions={getCompanyList}
                        value={statusOptions.find((e) => e[primaryKey] === filterValue)}
                        onChange={(newValue) => setFilterValue(newValue && newValue[primaryKey])}
                        options={statusOptions}
                        primaryKey={primaryKey}
                        loading={getCompanyListRes.loading}
                        labelKey={labelKey}
                    />
                );
            },
        }];

    const actions = [
        {
            label: 'Approve',
            message: 'Are you sure to confirm ?',
            onClick: async (checkedRows) => {
                const variables = { ids: checkedRows.map((checkedRow) => checkedRow.id) };
                await productsApprove({ variables });
            },
            showMessage: true,
        },
    ];

    return (
        <>
            <Header />
            <Table
                rows={rows}
                getRows={getVendorProductApprovalList}
                loading={loading}
                columns={columns}
                count={productTotal}
                filters={filters}
                actions={actions}
                showCheckbox
            />
        </>
    );
};

export default ProductApprovalListContent;
