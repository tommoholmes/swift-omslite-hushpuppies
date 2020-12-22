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

export default {
    getSourceList,
    getSourceById,
};
