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

export const getShipmentById = gql`
    query getShipmentId(
        $id: Int!
    ){
        getShipmentById(
            id: $id
        ){
            increment_id
            status {
                label
                value
            }
            allocation_status
            channel_order_date
            order_id
            channel_order_increment_id
            loc_code{
                loc_name
            }
            customer_name
            shipping_telephone
            email
            billing_address {
                firstname
                lastname
                street
                city
                country_name
                region
                postcode
                country_id
                telephone
            }
            pickup_info {
                created_at
                name
                phone
                loc_details
                vehicle_number
                notes
            }
            order_item {
                sku
                name
                base_price
                qty_shipped
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

export default {
    getStoreShipmentList,
    getShipmentById,
};
