import { gql } from '@apollo/client';

export const getSummaryShipmentToPick = gql`
    query getSummaryShipmentToPick{
        getSummaryShipmentToPick{
            total_items
            total_shipments
        }
    }
`;

export const createPickByBatch = gql`
    mutation createPickByBatch(
        $type: String!,
        $number_of_picker: Int,
        $number_of_sku: Int,
    ){
        createPickByBatch(type: $type, number_of_picker: $number_of_picker, number_of_sku: $number_of_sku){
            pick_by_batch {
                created_at
                created_by
                entity_id
                total_items
                total_shipments
            }
        }
    }
`;

export default {
    getSummaryShipmentToPick,
    createPickByBatch,
};
