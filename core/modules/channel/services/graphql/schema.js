import { gql } from '@apollo/client';

export const getChannelList = gql`
    query getChannelList($pageSize: Int!, $currentPage: Int!, $filter: ChannelFilterInput, $sort: ChannelSortInput) {
        getChannelList(pageSize: $pageSize, currentPage: $currentPage, filter: $filter, sort: $sort) {
            items {
                channel_id
                channel_code
                channel_name
                channel_url
                token
                framework
                rule_type
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

export const getChannelById = gql`
    query getChannelById($id: Int!) {
        getChannelById(id: $id) {
            auto_confirm_shipment
            auto_order_reallocation
            channel_code
            channel_id
            channel_name
            channel_url
            delta_stock_url
            end_point
            framework
            location_list
            notes
            prio_one_store
            release_stock
            rule_type
            split_prio_one_store
            token
            virtual_stock {
                vs_id
                vs_name
            }
            virtual_stock_list
            webhook_creditmemo
            webhook_invoice
            webhook_rma_refund
            webhook_rma_replacement
            webhook_rma_status_change
            webhook_shipment_complete
            webhook_vendor_salesrule
        }
    }
`;

export const createChannel = gql`
    mutation createChannel(
        $channel_code: String!
        $channel_name: String
        $notes: String
        $channel_url: String
        $token: String
        $end_point: String
        $delta_stock_url: String
        $framework: String
        $rule_type: String
        $virtual_stock: [VirtualStockAssignment]
        $webhook_shipment_complete: String
        $webhook_invoice: String
        $webhook_rma_refund: String
        $webhook_creditmemo: String
        $auto_confirm_shipment: Int
        $prio_one_store: Int
        $split_prio_one_store: Int
        $release_stock: String
        $webhook_vendor_salesrule: String
    ) {
        createChannel(
            input: {
                channel_code: $channel_code
                channel_name: $channel_name
                notes: $notes
                channel_url: $channel_url
                token: $token
                end_point: $end_point
                delta_stock_url: $delta_stock_url
                framework: $framework
                rule_type: $rule_type
                virtual_stock: $virtual_stock
                webhook_shipment_complete: $webhook_shipment_complete
                webhook_invoice: $webhook_invoice
                webhook_rma_refund: $webhook_rma_refund
                webhook_creditmemo: $webhook_creditmemo
                auto_confirm_shipment: $auto_confirm_shipment
                prio_one_store: $prio_one_store
                split_prio_one_store: $split_prio_one_store
                release_stock: $release_stock
                webhook_vendor_salesrule: $webhook_vendor_salesrule
            }
        ) {
            channel_id
            channel_code
            channel_name
            notes
            channel_url
            token
            end_point
            delta_stock_url
            framework
            rule_type
            virtual_stock {
                vs_id
                vs_name
            }
            webhook_shipment_complete
            webhook_invoice
            webhook_rma_refund
            webhook_creditmemo
            auto_confirm_shipment
            prio_one_store
            split_prio_one_store
            release_stock
            webhook_vendor_salesrule
        }
    }
`;

export const updateChannel = gql`
    mutation updateChannel(
        $id: Int!
        $channel_code: String!
        $channel_name: String
        $notes: String
        $channel_url: String
        $token: String
        $end_point: String
        $delta_stock_url: String
        $framework: String
        $rule_type: String
        $virtual_stock: [VirtualStockAssignment]
        $webhook_shipment_complete: String
        $webhook_invoice: String
        $webhook_rma_refund: String
        $webhook_creditmemo: String
        $auto_confirm_shipment: Int
        $prio_one_store: Int
        $split_prio_one_store: Int
        $release_stock: String
        $webhook_vendor_salesrule: String
    ) {
        updateChannel(
            id: $id
            input: {
                channel_code: $channel_code
                channel_name: $channel_name
                notes: $notes
                channel_url: $channel_url
                token: $token
                end_point: $end_point
                delta_stock_url: $delta_stock_url
                framework: $framework
                rule_type: $rule_type
                virtual_stock: $virtual_stock
                webhook_shipment_complete: $webhook_shipment_complete
                webhook_invoice: $webhook_invoice
                webhook_rma_refund: $webhook_rma_refund
                webhook_creditmemo: $webhook_creditmemo
                auto_confirm_shipment: $auto_confirm_shipment
                prio_one_store: $prio_one_store
                split_prio_one_store: $split_prio_one_store
                release_stock: $release_stock
                webhook_vendor_salesrule: $webhook_vendor_salesrule
            }
        ) {
            channel_id
            channel_code
            channel_name
            notes
            channel_url
            token
            end_point
            delta_stock_url
            framework
            rule_type
            virtual_stock {
                vs_id
                vs_name
            }
            webhook_shipment_complete
            webhook_invoice
            webhook_rma_refund
            webhook_creditmemo
            auto_confirm_shipment
            prio_one_store
            split_prio_one_store
            release_stock
            webhook_vendor_salesrule
        }
    }
`;

export const getVirtualStockList = gql`
    query getVirtualStockList($pageSize: Int!, $currentPage: Int!) {
        getVirtualStockList(pageSize: $pageSize, currentPage: $currentPage) {
            items {
                vs_id
                vs_name
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

export const getShipmentStatus = gql`
    query getShipmentStatus {
        getShipmentStatus {
            label
            value
        }
    }
`;

export const deleteChannel = gql`
    mutation deleteChannel($id: Int!) {
        deleteChannel(id: $id)
    }
`;

export const multideleteChannel = gql`
    mutation multideleteChannel($id: [Int!]!) {
        multideleteChannel(id: $id)
    }
`;

export default {
    getChannelList,
    getChannelById,
    createChannel,
    updateChannel,
    getVirtualStockList,
    getShipmentStatus,
    deleteChannel,
    multideleteChannel,
};
