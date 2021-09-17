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
                allocation_status
                channel_order_date
                status{
                    value
                    label
                }
                track_number
                channel_name
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
            status {
                label
                value
            }
            allocation_status
            channel_order_date
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
        }
    }
`;

export const confirmShipment = gql`
    mutation confirmShipment(
        $id: [Int!],
    ){
        confirmShipment(
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

export const packShipment = gql`
    mutation packShipment(
        $id: [Int!],
    ){
        packShipment(
            id: $id
        )
    }
`;

export const bookCourier = gql`
    mutation bookCourier(
        $id: Int!,
    ){
        bookCourier(
            id: $id
        )
    }
`;

export const shipDelivery = gql`
    mutation shipDelivery(
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

export const deliveredShipment = gql`
    mutation deliveredShipment(
        $id: [Int!],
    ){
        deliveredShipment(
            id: $id
        )
    }
`;

export default {
    getStoreShipmentList,
    getStoreShipmentById,
    confirmShipment,
    cantFulfillShipment,
    pickShipment,
    packShipment,
    bookCourier,
    shipDelivery,
    deliveredShipment,
};
