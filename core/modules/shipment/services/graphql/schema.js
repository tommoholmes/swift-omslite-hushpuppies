import { gql } from '@apollo/client';

export const getShipmentList = gql`
    query getShipmentList(
        $pageSize: Int!,
        $currentPage: Int!,
        $filter: ShipmentFilterInput,
        $sort: ShipmentSortInput,
    ){
        getShipmentList(
            pageSize: $pageSize,
            currentPage: $currentPage,
            filter: $filter,
            sort: $sort,
        ){
            items {
                entity_id
                increment_id
                channel_order_increment_id
                updated_at
                channel_name
                status
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
    query getShipmentById(
        $id: Int!,
    ){
        getShipmentById(
            id: $id
        ){
            increment_id
            loc_code{
                loc_name
            }
            created_at
            updated_at
            channel_order_increment_id
            status
            email
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
            order_item {
                sku
                name
                base_price
                qty_shipped   
            }
            channel_shipping_label
            all_track {
                created_at
                description
                title
                track_number
            }
            status_history {
                created_at
                status
                comment
            }
        }
    }
`;

export default {
    getShipmentList,
    getShipmentById,
};
