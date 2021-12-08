/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Header from '@modules/productstatus/pages/list/components/Header';
import formatDate from '@helper_date';

const ProductStatusListContent = (props) => {
    const { data, loading, getMarketplaceProductStatusList } = props;
    const companyList = (data && data.getMarketplaceProductStatusList && data.getMarketplaceProductStatusList.items) || [];
    const companyTotal = (data && data.getMarketplaceProductStatusList && data.getMarketplaceProductStatusList.total_count) || 0;

    const columns = [
        { field: 'id', headerName: 'ID', hideable: true, sortable: true },
        { field: 'sku', headerName: 'SKU', hideable: true, sortable: true },
        { field: 'marketplace_code', headerName: 'Marketplace Code', hideable: true, sortable: true },
        { field: 'marketplace_store_id', headerName: 'Marketplace Store ID', hideable: true, sortable: true },
        { field: 'marketplace_status', headerName: 'Marketplace Status', hideable: true, sortable: true },
        { field: 'status', headerName: 'Status', hideable: true, sortable: true },
        { field: 'message', headerName: 'Message', hideable: true, sortable: true },
        { field: 'updated_at', headerName: 'Update At', hideable: true, sortable: true },
    ];

    const filters = [
        { field: 'id', name: 'id_from', type: 'from', label: 'ID From', initialValue: '' },
        { field: 'id', name: 'id_to', type: 'to', label: 'ID To', initialValue: '' },
        { field: 'updated_at', name: 'updated_at_from', type: 'from', label: 'Updated From', initialValue: '', typeInput: 'date' },
        { field: 'updated_at', name: 'updated_at_to', type: 'to', label: 'Updated To', initialValue: '', typeInput: 'date' },
        { field: 'sku', name: 'sku', type: 'like', label: 'SKU', initialValue: '' },
        { field: 'marketplace_code', name: 'marketplace_code', type: 'like', label: 'Marketplace Code', initialValue: '' },
        { field: 'marketplace_store_id', name: 'marketplace_store_id', type: 'like', label: 'Marketplace Store ID', initialValue: '' },
        { field: 'marketplace_status', name: 'marketplace_status', type: 'like', label: 'Marketplace Status', initialValue: '' },
        { field: 'status', name: 'status', type: 'like', label: 'Status', initialValue: '' },
        { field: 'message', name: 'message', type: 'like', label: 'Message', initialValue: '' },
    ];

    const rows = companyList.map((company) => ({
        ...company,
        id: company.id,
        updated_at: formatDate(company.updated_at, 'MMM D, YYYY h:mm:ss A'),
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
                getRows={getMarketplaceProductStatusList}
                loading={loading}
                filters={filters}
                columns={columns}
                count={companyTotal}
                hideActions
            />
        </>
    );
};

export default ProductStatusListContent;
