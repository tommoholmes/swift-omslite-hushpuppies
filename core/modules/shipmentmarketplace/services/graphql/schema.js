import { gql } from '@apollo/client';

export const getStoreShipmentList = gql`
    query getStoreShipmentList(
        $pageSize: Int!,
        $currentPage: Int!,
        $filter: ShipmentFilterInput,
        $sort: ShipmentSortInput,
    ){
        getStoreShipmentList(
            pageSize: $pageSize,
            currentPage: $currentPage,
            filter: $filter,
            sort: $sort,
        ){
            items {
                entity_id
                increment_id
                channel_order_increment_id
                marketplace_order_number
                allocation_status
                channel_order_date
                status{
                    value
                    label
                }
                track_number
                channel{
                    channel_name
                }
                loc_code
                shipping_name
                shipping_email
                shipping_telephone
                connexi_order_status
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

export const getStoreShipmentById = gql`
    query getStoreShipmentById(
        $id: Int!
    ){
        getStoreShipmentById(
            id: $id
        ){
            entity_id
            increment_id
            channel_order_increment_id
            channel{
                channel_name
            }
            marketplace_order_number
            status {
                label
                value
            }
            allocation_status
            channel_order_date
            location{
                loc_name
            }
            awb_source
            customer_name
            shipping_telephone
            shipping_email
            updated_at
            all_track{
                created_at
                title
                track_number
            }
            billing_address {
                firstname
                lastname
                street
                city
                region
                postcode
                country_id
                telephone
            }
            pickup_info {
                name
                loc_details
                vehicle_number
                vehicle_desc
                notes
            }
            order_item {
                sku
                name
                price
                qty
                row_total
            }
            channel_shipping_label
            subtotal
            status_history {
                created_at
                status
                comment
            }
        }
    }
`;

export const confirmMarketplaceShipment = gql`
    mutation confirmMarketplaceShipment(
        $id: [Int!],
    ){
        confirmMarketplaceShipment(
            id: $id
        )
    }
`;

export const cantFulfillShipment = gql`
    mutation cantFulfillShipment(
        $id: [Int!],
    ){
        cantFulfillShipment(
            id: $id
        )
    }
`;

export const pickShipment = gql`
    mutation pickShipment(
        $id: [Int!],
    ){
        pickShipment(
            id: $id
        )
    }
`;

export const canceledMarketplaceShipment = gql`
    mutation canceledMarketplaceShipment(
        $id: Int!,
        $cancel_reason_id: String,
    ){
        canceledMarketplaceShipment(
            id: $id
            cancel_reason_id: $cancel_reason_id,
        )
    }
`;

export const packShipment = gql`
    mutation packShipment(
        $id: [Int!],
    ){
        packShipment(
            id: $id
        )
    }
`;

export const shippedMarketplaceShipment = gql`
    mutation shippedMarketplaceShipment(
        $id: Int!,
        $track_number: String!,
    ){
        shippedMarketplaceShipment(
            id: $id,
            track_number: $track_number,
        )
    }
`;

export const deliveredShipment = gql`
    mutation deliveredShipment(
        $id: [Int!],
    ){
        deliveredShipment(
            id: $id
        )
    }
`;

export const exportStoreShipmentToCsv = gql`
    query exportStoreShipmentToCsv(
        $type: String!,
        $with_items: Boolean,
        $filter: ShipmentFilterInput,
        $sort: ShipmentSortInput,
    ){
        exportStoreShipmentToCsv(
            type: $type,
            with_items: $with_items,
            filter: $filter,
            sort: $sort,
        )
    }
`;

export const saveShipmentNotes = gql`
    mutation saveShipmentNotes(
        $id: Int!,
        $notes: String!,
    ){
        saveShipmentNotes(
            id: $id,
            notes: $notes,
        )
    }
`;

export const getCourierOption = gql`
    query{
        getCourierOption{
            label
            value
        }
    }
`;

export const getShipmentCancelReason = gql`
    query{
        getShipmentCancelReason{
            label
            value
        }
    }
`;

export const bulkShipment = gql`
    mutation bulkShipment(
        $binary: String!,
    ){
        bulkShipment(
            input: {
                binary: $binary,
            }
        ){
            data
            error
        }
    }
`;

export const getExportStatusHistory = gql`
query getExportStatusHistory($id: [Int!]!) {
    getExportStatusHistory(id: $id) {
      cancel_at
      cancel_by
      channel_order_increment_id
      confirm_at
      confirm_by
      delivered_at
      delivered_by
      order_created_at
      shipped_at
      shipped_by
    }
  }
`;

export default {
    getStoreShipmentList,
    getStoreShipmentById,
    confirmMarketplaceShipment,
    cantFulfillShipment,
    pickShipment,
    canceledMarketplaceShipment,
    packShipment,
    shippedMarketplaceShipment,
    deliveredShipment,
    exportStoreShipmentToCsv,
    saveShipmentNotes,
    getCourierOption,
    getShipmentCancelReason,
    bulkShipment,
    getExportStatusHistory,
};
