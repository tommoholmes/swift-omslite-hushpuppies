import { gql } from '@apollo/client';

export const getOrderQueueList = gql`
    query getOrderQueueList($pageSize: Int!, $currentPage: Int!, $filter: OrderFilterInput, $sort: OrderSortInput) {
        getOrderQueueList(pageSize: $pageSize, currentPage: $currentPage, filter: $filter, sort: $sort) {
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
    query getOrderQueueById($id: Int!) {
        getOrderQueueById(id: $id) {
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
                id
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
    mutation setReallocation($id: Int!, $type: String!) {
        setReallocation(id: $id, type: $type)
    }
`;

export const isAccessAllowed = gql`
    query isAccessAllowed($acl_code: String!) {
        isAccessAllowed(acl_code: $acl_code)
    }
`;

export const exportOrderToCsv = gql`
    query exportOrderToCsv($id: [Int], $filter: OrderFilterInput, $sort: OrderSortInput) {
        exportOrderToCsv(id: $id, filter: $filter, sort: $sort)
    }
`;

export const bulkOrderReallocation = gql`
    mutation bulkOrderReallocation($binary: String!) {
        bulkOrderReallocation(input: { binary: $binary })
    }
`;

export const downloadSampleCsv = gql`
    mutation downloadSampleCsv($type: String!) {
        downloadSampleCsv(type: $type)
    }
`;

export const orderImport = gql`
    mutation orderImport($binary: String!) {
        orderImport(input: { binary: $binary })
    }
`;

export const acceptMarketplaceOrderQueue = gql`
    mutation acceptMarketplaceOrderQueue($binary: String!) {
        acceptMarketplaceOrderQueue(input: { binary: $binary })
    }
`;

export const getActivity = gql`
    query getActivity($code: String!) {
        getActivity(code: $code, by_session: true) {
            activity_id
            activity_code
            run_status
            data_total
            data_processed
            started_at
            snapshot_at
            finished_at
            run_by
            run_type
            attachment
            error_message
        }
    }
`;

export const marketplaceFetchOrder = gql`
    mutation marketplaceFetchOrder($input: MarketplaceFetchOrderInput!) {
        marketplaceFetchOrder(input: $input)
    }
`;

export const editOrderItem = gql`
    mutation editOrderItem($order_id: Int!, $order_items: [EditOrderItemInput!]!) {
        editOrderItem(order_id: $order_id, order_items: $order_items)
    }
`;

export const cancelOrder = gql`
    mutation cancelOrder($id: Int!) {
        cancelOrder(id: $id) {
            status
        }
    }
`;
export const getLocationOptions = gql`
    query {
        getLocationOptions {
            label
            value
        }
    }
`;

export const getUniqueProductFromSource = gql`
    query getUniqueProductFromSource($pageSize: Int!, $currentPage: Int!, $filter: SourceFilterInput, $sort: SourceSortInput, $search: String) {
        getUniqueProductFromSource(pageSize: $pageSize, currentPage: $currentPage, filter: $filter, sort: $sort, search: $search) {
            items {
                source_id
                loc_id
                loc_name
                sku
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

export default {
    getOrderQueueList,
    getOrderQueueById,
    setReallocation,
    isAccessAllowed,
    exportOrderToCsv,
    bulkOrderReallocation,
    downloadSampleCsv,
    orderImport,
    acceptMarketplaceOrderQueue,
    getActivity,
    marketplaceFetchOrder,
    editOrderItem,
    cancelOrder,
    getLocationOptions,
    getUniqueProductFromSource,
};
