import { gql } from '@apollo/client';

export const getRmaList = gql`
    query getRmaList(
        $pageSize: Int!,
        $currentPage: Int!,
    ){
        getRmaList(
            pageSize: $pageSize,
            currentPage: $currentPage
        ){
            items {
                id
                channel_order_increment_id
                status_code
                loc_name
                customer_email
                created_at
                channel_order_increment_id
                created_at
                customer_email
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

export const getRmaById = gql`
    query getRmaById(
        $id: Int!,
    ){
        getRmaById(
            id: $id
        ){
            id
            status_code
            customer_name
            created_at
            customer_email
            updated_at
            channel_order_increment_id
            return_type
            rma_item {
                id
                name
                sku
                price
                qty
                package_condition
                reason
                status_code
                return_stock
            }
            message {
                id
                created_at
                text
            }
        }
    }
`;

export default {
    getRmaList,
    getRmaById,
};
