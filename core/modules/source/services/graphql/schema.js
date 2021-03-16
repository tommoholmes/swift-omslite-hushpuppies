import { gql } from '@apollo/client';

export const getSourceList = gql`
    query getSourceList(
        $pageSize: Int!,
        $currentPage: Int!,
        $filter: SourceFilterInput,
        $sort: SourceSortInput,
    ){
        getSourceList(
            pageSize: $pageSize,
            currentPage: $currentPage,
            filter: $filter,
            sort: $sort,
        ){
            items {
                source_id
                loc_name
                sku
                qty_total
                qty_reserved
                qty_incoming
                qty_saleable
                qty_buffer
                priority
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

export const getSourceById = gql`
    query getSourceById(
        $id: Int!,
    ){
        getSourceById(
            id: $id
        ){
            source_id
            loc_name
            sku
            qty_total
            qty_reserved
            qty_incoming
            qty_saleable
            qty_buffer
            priority
        }
    }
`;

export const uploadSource = gql`
    mutation uploadSource(
        $binary: String!,
    ){
        uploadSource(
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

export const downloadSource = gql`
    mutation downloadSource(
        $location_id: Int!,
    ){
        downloadSource(
            location_id: $location_id,
        )
    }
`;

export default {
    getSourceList,
    getSourceById,
    uploadSource,
    downloadSampleCsv,
    downloadSource,
};
