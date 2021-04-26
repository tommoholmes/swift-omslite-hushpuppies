/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React from 'react';
import Table from '@common_table';
import Header from './Header';

const MarketplaceListContent = (props) => {
    const { data, loading, getMarketplaceList } = props;
    const marketplaceList = (data && data.getMarketplaceList && data.getMarketplaceList.items) || [];
    const marketplaceTotal = (data && data.getMarketplaceList && data.getMarketplaceList.total_count) || 0;

    const columns = [
        { field: 'marketplace_code', headerName: 'Marketplace Code', sortable: true, hideable: true },
        { field: 'marketplace_name', headerName: 'Marketplace Name', sortable: true, hideable: true },
    ];

    const filters = [
        { field: 'marketplace_code', name: 'marketplace_code', type: 'like', label: 'Marketplace Code', initialValue: '' },
        { field: 'marketplace_name', name: 'marketplace_name', type: 'like', label: 'Marketplace Name', initialValue: '' },
    ];

    const rows = marketplaceList.map((marketplace) => ({
        ...marketplace,
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
                filters={filters}
                rows={rows}
                getRows={getMarketplaceList}
                loading={loading}
                columns={columns}
                count={marketplaceTotal}
            />
        </>
    );
};

export default MarketplaceListContent;
