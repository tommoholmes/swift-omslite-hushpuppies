import { gql } from '@apollo/client';

export const getShipmentList = gql`
    query getShipmentList(
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
    query getStoreShipmentById(
        $id: Int!,
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
            email
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
            shipping_address {
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

export const confirmShipment = gql`
    mutation confirmShipmentAll(
        $id: [Int!],
    ){
        confirmShipment(
            id: $id
        )
    }
`;

export default {
    getShipmentList,
    getShipmentById,
    confirmShipment,
};
