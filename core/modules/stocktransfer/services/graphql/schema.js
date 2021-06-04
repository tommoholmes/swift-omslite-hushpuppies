import { gql } from '@apollo/client';

export const getStockTransferList = gql`
    query getStockTransferList(
        $pageSize: Int!,
        $currentPage: Int!,
        $filter: StockTransferFilterInput,
        $sort: StockTransferSortInput,
    ){
        getStockTransferList(
            pageSize: $pageSize,
            currentPage: $currentPage,
            filter: $filter,
            sort: $sort,
        ){
            items {
                entity_id
                increment_id
                source_loc_code
                target_loc_code
                status
                created_by
                created_at
                confirmed_by
                confirmed_at
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

export const getStockTransferById = gql`
    query getStockTransferById(
        $id: Int!,
    ){
        getStockTransferById(
            id: $id
        ){
            increment_id
            items {
                sku
                product_name
                source_id
                target_id
                source_qty
                transfer_qty
            }
        }
    }
`;

export const uploadStockTransfer = gql`
    mutation uploadStockTransfer(
        $binary: String!,
    ){
        uploadStockTransfer(
            input: {
                binary: $binary,
            }
        )
    }
`;

export const downloadSampleCsv = gql`
    mutation downloadSampleCsv(
        $type: String!,
    ){
        downloadSampleCsv(
            type: $type,
        )
    }
`;

export default {
    getStockTransferList,
    getStockTransferById,
    uploadStockTransfer,
    downloadSampleCsv,
};
