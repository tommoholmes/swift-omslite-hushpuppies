import { gql } from '@apollo/client';

export const getStoreShipmentList = gql`
query getStoreShipment(
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
            allocation_status
            channel_order_date
            status{
                value
                label
            }
            track_number
            channel{
                channel_code
                channel_name
              }
            shipping_name
            shipping_email
            shipping_telephone
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

export const getShipmentById = gql`
query getStoreShipmentId(
    $id: Int!
){
    getStoreShipmentById(
        id: $id
    ){
        entity_id
        increment_id
        channel_order_date
        channel_order_increment_id
        status {
            label
            value
        }
        allocation_status
        channel{
            channel_code
            channel_name
          }
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
        subtotal
        status_history {
            created_at
            status
            comment
        }
        location{
            loc_code
            loc_name
          }
    }
}
`;

export const confirmShipmentPickup = gql`
    mutation confirmShipmentPickup(
        $id: [Int!],
    ){
        confirmShipment(
            id: $id
        )
    }
`;

export const cantFulfillShipmentPickup = gql`
    mutation cantFulfillShipmentPickup(
        $id: [Int!],
    ){
        cantFulfillShipment(
            id: $id
        )
    }
`;

export const pickShipmentPickup = gql`
    mutation pickShipmentPickup(
        $id: [Int!],
    ){
        pickShipment(
            id: $id
        )
    }
`;

export const packShipmentPickup = gql`
    mutation packShipmentPickup(
        $id: [Int!],
    ){
        packShipment(
            id: $id
        )
    }
`;

export const bookCourierPickup = gql`
    mutation bookCourierPickup(
        $id: Int!,
    ){
        bookCourier(
            id: $id
        )
    }
`;

export const shipDeliveryPickup = gql`
    mutation shipDeliveryPickup(
        $id: Int!,
        $carrier: String!,
        $name: String!,
        $reference: String!,
    ){
        shipDelivery(
            id: $id,
            carrier: $carrier,
            name: $name,
            reference: $reference,
        )
    }
`;

export const deliveredShipmentPickup = gql`
    mutation deliveredShipmentPickup(
        $id: [Int!],
    ){
        deliveredShipment(
            id: $id
        )
    }
`;

export default {
    getStoreShipmentList,
    getShipmentById,
    confirmShipmentPickup,
    cantFulfillShipmentPickup,
    pickShipmentPickup,
    packShipmentPickup,
    bookCourierPickup,
    shipDeliveryPickup,
    deliveredShipmentPickup,
};
