import { gql } from '@apollo/client';

export const getOrderQueueList = gql`
    query getOrderQueueList(
        $pageSize: Int!,
        $currentPage: Int!,
        $filter: OrderFilterInput,
        $sort: OrderSortInput,
    ){
        getOrderQueueList(
            pageSize: $pageSize,
            currentPage: $currentPage,
            filter: $filter,
            sort: $sort,
        ){
            items {
                id
                channel_order_increment_id
                created_at
                channel_order_status
                last_updated
                acceptance_deadline
                channel_code
                status
                oms_order_status
                error_log
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

export const getOrderQueueById = gql`
    query getOrderQueueById(
        $id: Int!,
    ){
        getOrderQueueById(
            id: $id
        ){
            id
            is_allow_to_reallocate_order
            is_allow_to_recreate_order
            last_updated
            status
            acceptance_deadline
            channel_order_increment_id
            channel_code
            email
            customer_group
            custom_order_attributes
            billing_address {
                firstname
                lastname
                street
                city
                region
                postcode
                country_id
                country_name
                telephone
            }
            shipping_address {
                firstname
                lastname
                street
                city
                region
                postcode
                country_id
                country_name
                telephone
            }
            channel_payment_method
            channel_shipping_cost
            channel_shipping_method
            channel_name
            channel_order_status
            created_at
            error_log
            order_item {
                sku
                base_price
                sell_price
                qty
                discount_amount
                loc_code
                pickup_name
                replacement_for
                name
            }
            notes
            oms_order_status
            channel_grand_total
        }
    }
`;

export const setReallocation = gql`
    mutation setReallocation(
        $id: Int!,
        $type: String!,
    ){
        setReallocation(
            id: $id,
            type: $type,
        )
    }
`;

export const isAccessAllowed = gql`
    query isAccessAllowed(
        $acl_code: String!,
    ){
        isAccessAllowed(
            acl_code: $acl_code
        )
    }
`;

export const exportOrderToCsv = gql`
    query exportOrderToCsv(
        $id: [Int],
        $filter: OrderFilterInput,
        $sort: OrderSortInput,
    ){
        exportOrderToCsv(
            id: $id,
            filter: $filter,
            sort: $sort,
        )
    }
`;

export const bulkOrderReallocation = gql`
    mutation bulkOrderReallocation(
        $binary: String!,
    ){
        bulkOrderReallocation(
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

export const orderImport = gql`
    mutation orderImport(
        $binary: String!,
    ){
        orderImport(
            input: {
                binary: $binary,
            }
        )
    }
`;

export default {
    getOrderQueueList,
    getOrderQueueById,
    setReallocation,
    isAccessAllowed,
    exportOrderToCsv,
    bulkOrderReallocation,
    downloadSampleCsv,
    orderImport,
};
