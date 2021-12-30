import { gql } from '@apollo/client';

export const getNetsuiteCourierList = gql`
    query getNetsuiteCourierList($search: String, $filter: NetsuiteCourierFilter, $sort: NetsuiteCourierSort, $pageSize: Int, $currentPage: Int) {
        getNetsuiteCourierList(search: $search, filter: $filter, sort: $sort, pageSize: $pageSize, currentPage: $currentPage) {
            items {
                code
                courier
                delivery_method
                entity_id
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

export const getNetsuiteCourierById = gql`
    query getNetsuiteCourierById($id: Int!) {
        getNetsuiteCourierById(id: $id) {
            code
            courier
            delivery_method
            entity_id
        }
    }
`;

export const saveNetsuiteCourier = gql`
    mutation saveNetsuiteCourier($input: NetsuiteCourierInput!) {
        saveNetsuiteCourier(input: $input) {
            code
            courier
            delivery_method
            entity_id
        }
    }
`;

export const getNetsuiteDeliveryMethodOptions = gql`
    query {
        getNetsuiteDeliveryMethodOptions {
            code
            created_at
            delivery_method
            entity_id
            netsuite_id
            updated_at
        }
    }
`;

export default {
    getNetsuiteCourierList,
    getNetsuiteCourierById,
    saveNetsuiteCourier,
    getNetsuiteDeliveryMethodOptions,
};
