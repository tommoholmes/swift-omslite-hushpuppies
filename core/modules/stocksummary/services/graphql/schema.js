import { gql } from '@apollo/client';

export const getStockSummaryList = gql`
    query getStockSummaryList($pageSize: Int!, $currentPage: Int!, $filter: StockSummaryFilterInput, $sort: StockSummarySortInput) {
        getStockSummaryList(pageSize: $pageSize, currentPage: $currentPage, filter: $filter, sort: $sort) {
            items {
                channel_stock
                product_name
                sku
            }
            total_count
            page_info {
                page_size
                current_page
                total_pages
            }
        }
    }
`;

export const exportStockSummaryList = gql`
    mutation {
        exportStockSummaryList
    }
`;

export default {
    getStockSummaryList,
    exportStockSummaryList,
};
