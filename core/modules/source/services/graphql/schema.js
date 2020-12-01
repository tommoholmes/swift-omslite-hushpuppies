import { gql } from '@apollo/client';

export const getSourceList = gql`
    query getSourceList(
        $pageSize: Int!,
        $currentPage: Int!,
    ){
        getSourceList(
            pageSize: $pageSize,
            currentPage: $currentPage
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
