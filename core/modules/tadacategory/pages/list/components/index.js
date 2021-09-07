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
        { field: 'entity_id', headerName: 'ID' },
        { field: 'channel_category', headerName: 'Channel' },
        { field: 'name', headerName: 'Name' },
        { field: 'parent', headerName: 'Path' },
        { field: 'tada_category_id', headerName: 'TADA Category ID' },
        { field: 'tada_catalog_category_id', headerName: 'TADA Catalog Category ID' },
    ];

    const rows = categoryTadaList.map((categoryTada) => ({
        ...categoryTada,
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
                getRows={getCategoryTadaList}
                loading={loading}
                columns={columns}
                count={categoryTadaTotal}
            />
        </>
    );
};

export default CategoryTadaListContent;
