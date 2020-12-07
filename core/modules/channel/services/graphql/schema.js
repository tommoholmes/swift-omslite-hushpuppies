import { gql } from '@apollo/client';

export const getChannelList = gql`
    query getChannelList(
        $pageSize: Int!,
        $currentPage: Int!,
        $filter: ChannelFilterInput,
    ){
        getChannelList(
            pageSize: $pageSize,
            currentPage: $currentPage,
            filter: $filter,
        ){
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
    query getChannelById(
        $id: Int!,
    ){
        getChannelById(
            id: $id
        ){
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
            webhook_shipment_complete
            webhook_invoice
            webhook_rma_refund
            webhook_creditmemo
            virtual_stock {
                vs_id
                vs_name
            }
        }
    }
`;

export const createChannel = gql`
    mutation createChannel(
        $channel_code: String!,
        $channel_name: String,
        $notes: String,
        $channel_url: String,
        $token: String,
        $end_point: String,
        $delta_stock_url: String,
        $framework: String,
        $rule_type: String,
        $virtual_stock: [VirtualStockAssignment],
        $webhook_shipment_complete: String,
        $webhook_invoice: String,
        $webhook_rma_refund: String,
        $webhook_creditmemo: String,
    ){
        createChannel(
            input: {
                channel_code: $channel_code,
                channel_name: $channel_name,
                notes: $notes,
                channel_url: $channel_url,
                token: $token,
                end_point: $end_point,
                delta_stock_url: $delta_stock_url,
                framework: $framework,
                rule_type: $rule_type,
                virtual_stock: $virtual_stock,
                webhook_shipment_complete: $webhook_shipment_complete,
                webhook_invoice: $webhook_invoice,
                webhook_rma_refund: $webhook_rma_refund,
                webhook_creditmemo: $webhook_creditmemo,
            }
        ){
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
        }
    }
`;

export const updateChannel = gql`
    mutation updateChannel(
        $id: Int!,
        $channel_code: String!,
        $channel_name: String,
        $notes: String,
        $channel_url: String,
        $token: String,
        $end_point: String,
        $delta_stock_url: String,
        $framework: String,
        $rule_type: String,
        $virtual_stock: [VirtualStockAssignment],
        $webhook_shipment_complete: String,
        $webhook_invoice: String,
        $webhook_rma_refund: String,
        $webhook_creditmemo: String,
    ){
        updateChannel(
            id: $id,
            input: {
                channel_code: $channel_code,
                channel_name: $channel_name,
                notes: $notes,
                channel_url: $channel_url,
                token: $token,
                end_point: $end_point,
                delta_stock_url: $delta_stock_url,
                framework: $framework,
                rule_type: $rule_type,
                virtual_stock: $virtual_stock,
                webhook_shipment_complete: $webhook_shipment_complete,
                webhook_invoice: $webhook_invoice,
                webhook_rma_refund: $webhook_rma_refund,
                webhook_creditmemo: $webhook_creditmemo,
            }
        ){
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
        }
    }
`;

export const getVirtualStockList = gql`
query getVirtualStockList(
    $pageSize: Int!,
    $currentPage: Int!,
){
    getVirtualStockList(
        pageSize: $pageSize,
        currentPage: $currentPage
    ){
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

export const deleteChannel = gql`
    mutation deleteChannel (
        $id: Int!
    ){
        deleteChannel(
            id: $id
        )
    }
`;

export const multideleteChannel = gql`
    mutation multideleteChannel (
        $id: [Int!]!
    ){
        multideleteChannel(
            id: $id
        )
    }
`;

export default {
    getChannelList,
    getChannelById,
    createChannel,
    updateChannel,
    getVirtualStockList,
    deleteChannel,
    multideleteChannel,
};
