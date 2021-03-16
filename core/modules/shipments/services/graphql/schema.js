import { gql } from '@apollo/client';

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

export default {
    createChannel,
};
