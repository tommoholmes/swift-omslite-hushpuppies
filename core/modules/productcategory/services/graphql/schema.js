import { gql } from '@apollo/client';

export const getProductCategoryList = gql`
    query getProductCategoryList(
        $pageSize: Int!,
        $currentPage: Int!,
    ){
        getProductCategoryList(
            pageSize: $pageSize,
            currentPage: $currentPage
        ){
            items {
                entity_id
                marketplace_code
                marketplace_category_id
                marketplace_category_name
            }
            page_info {
                current_page
                page_size
                total_pages
            }
            total_count
        }
    }
`;

export const uploadStatusProductCategory = gql`
    mutation uploadStatusProductCategory(
        $binary: String!,
    ){
        uploadStatusProductCategory(
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
    getProductCategoryList,
    uploadStatusProductCategory,
    downloadSampleCsv,
};
