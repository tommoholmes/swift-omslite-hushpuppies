import Header from '@modules/stocksummary/pages/list/components/Header';
import React from 'react';
import Table from '@common_table';

const StockSummaryList = (props) => {
    const { data, loading, getStockSummaryList } = props;
    const stockSummaryList = (data && data.getStockSummaryList && data.getStockSummaryList.items) || [];
    const stockSummaryTotal = (data && data.getStockSummaryList && data.getStockSummaryList.total_count) || 0;

    const columns = [
        {
            field: 'sku',
            headerName: 'SKU',
            hideable: 'true',
            sortable: true,
            initialSort: 'ASC',
        },
        {
            field: 'product_name',
            headerName: 'Name',
            hideable: 'true',
            sortable: true,
        },
        {
            field: 'channel_stock',
            headerName: 'Channel Stock',
            hideable: 'true',
            sortable: true,
        },
    ];

    const filters = [
        {
            field: 'sku',
            name: 'sku',
            type: 'like',
            label: 'SKU',
            initialValue: '',
        },
        {
            field: 'product_name',
            name: 'product_name',
            type: 'like',
            label: 'Name',
            initialValue: '',
        },
        {
            field: 'channel_stock',
            name: 'channel_stock',
            type: 'like',
            label: 'Channel Stock',
            initialValue: '',
        },
    ];

    const rows = stockSummaryList.map((stockSummary) => ({
        ...stockSummary,
        id: stockSummary.entity_id,
        channel_stock: () => (
            // eslint-disable-next-line react/no-danger
            <span dangerouslySetInnerHTML={{ __html: stockSummary.channel_stock }} />
        ),
    }));

    return (
        <>
            <Header />
            <Table
                hideActions
                filters={filters}
                rows={rows}
                getRows={getStockSummaryList}
                loading={loading}
                columns={columns}
                count={stockSummaryTotal}
            />
        </>
    );
};

export default StockSummaryList;
