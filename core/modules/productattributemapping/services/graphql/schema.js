import { gql } from '@apollo/client';

export const getProductAttributeList = gql`
    query getProductAttributeList(
        $pageSize: Int!,
        $currentPage: Int!,
    ){
        getProductAttributeList(
            pageSize: $pageSize,
            currentPage: $currentPage
        ){
            items {
                entity_id
                marketplace_code
                marketplace_attribute_name
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

export const multideleteProductAttribute = gql`
    mutation multideleteProductAttribute (
        $id: [Int!]!
    ){
        multideleteProductAttribute(
            id: $id
        )
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
    getProductAttributeList,
    multideleteProductAttribute,
    uploadStatusProductCategory,
    downloadSampleCsv,
};
