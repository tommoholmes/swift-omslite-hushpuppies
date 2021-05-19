import { gql } from '@apollo/client';

export const getStockTransferList = gql`
    query getStockTransferList(
        $pageSize: Int!,
        $currentPage: Int!,
    ){
        getStockTransferList(
            pageSize: $pageSize,
            currentPage: $currentPage
        ){
            items {
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

export const getCompanyById = gql`
    query getCompanyById(
        $id: Int!,
    ){
        getCompanyById(
            id: $id
        ){
            company_code
            company_id
            company_name
            is_new_product
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
    getCompanyById,
    uploadStockTransfer,
    downloadSampleCsv,
};
