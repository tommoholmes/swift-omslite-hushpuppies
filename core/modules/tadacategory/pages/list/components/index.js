/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Header from '@modules/tadacategory/pages/list/components/Header';

const CategoryTadaListContent = (props) => {
    const { data, loading, getCategoryTadaList } = props;
    const categoryTadaList = (data && data.getCategoryTadaList && data.getCategoryTadaList.items) || [];
    const categoryTadaTotal = (data && data.getCategoryTadaList && data.getCategoryTadaList.total_count) || 0;

    const columns = [
        { field: 'entity_id', headerName: 'ID', sortable: true, hideable: true, initialSort: 'ASC' },
        { field: 'channel_category', headerName: 'Channel', sortable: true, hideable: true },
        { field: 'name', headerName: 'Name', sortable: true, hideable: true },
        { field: 'parent', headerName: 'Path', sortable: true, hideable: true },
        { field: 'tada_category_id', headerName: 'TADA Category ID', sortable: true, hideable: true },
        { field: 'tada_catalog_category_id', headerName: 'TADA Catalog Category ID', sortable: true, hideable: true },
    ];

    const filters = [
        { field: 'entity_id', name: 'entity_id', type: 'from', label: 'ID', initialValue: '' },
        { field: 'channel_category', name: 'channel_category', type: 'like', label: 'Channel', initialValue: '' },
        { field: 'name', name: 'name', type: 'like', label: 'Name', initialValue: '' },
        { field: 'parent', name: 'parent', type: 'like', label: 'Path', initialValue: '' },
        { field: 'tada_category_id', name: 'tada_category_id', type: 'like', label: 'TADA Category ID', initialValue: '' },
        { field: 'tada_catalog_category_id', name: 'tada_catalog_category_id', type: 'like', label: 'TADA Catalog Category ID', initialValue: '' },
    ];

    const rows = categoryTadaList.map((categoryTada) => ({
        ...categoryTada,
    }));

    return (
        <>
            <Header />
            <Table
                filters={filters}
                rows={rows}
                getRows={getCategoryTadaList}
                loading={loading}
                columns={columns}
                count={categoryTadaTotal}
                hideActions
            />
        </>
    );
};

export default CategoryTadaListContent;
