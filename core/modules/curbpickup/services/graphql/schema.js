import { gql } from '@apollo/client';

export const getCurbPickupById = gql`
    query getCurbPickupById(
        $id: Int!
    ){
        getCurbPickupById(
            id: $id
        ){
            entity_id
            increment_id
            channel_order_increment_id
            allocation_status
            status{
                label
                value
            }
            all_track {
                created_at
                description
                entity_id
                title
                track_number
            }
            customer_name
            shipping_telephone
            billing_address {
                firstname
                lastname
                street
                city
                region
                postcode
                telephone
                country_id
            }
            pickup_info{
                created_at
                name
                phone
                loc_details
                vehicle_number
                vehicle_desc
                notes
            }
            loc_code{
                loc_name
            }
            items {
                sku
                name
                price
                qty
                row_total
            }
            subtotal
        }
    }
`;

export const getCurbPickupList = gql`
    query getCurbPickupList(
        $pageSize: Int!,
        $currentPage: Int!,
        $filter: ShipmentFilterInput,
        
    ){
        getCurbPickupList(
            pageSize: $pageSize,
            currentPage: $currentPage,
            filter: $filter,
            sort:{
                priority_status: ASC
            }
        ){
            items {
                entity_id
                increment_id
                status {
                  label
                  value
                }
                priority_status
                loc_name
                shipping_telephone
                shipping_name
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

export const confirmPickShipment = gql`
    mutation confirmPickShipment(
        $id: [Int!],
    ){
        confirmPickShipment(
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

export const packShipment = gql`
    mutation packShipment(
        $id: [Int!],
    ){
        packShipment(
            id: $id
        )
    }
`;

export const pickedupShipment = gql`
    mutation pickedupShipment(
        $id: [Int!],
    ){
        pickedupShipment(
            id: $id
        )
    }
`;

export const getPickList = gql`
    query getPickList(
        $id: [Int!]!,
    ){
        getPickList(
            id: $id
        ){
            print_date
            data {
                sku
                name
                qty
            }
        }
    }
`;

export const getPackList = gql`
    query getPackList(
        $id: [Int!]!,
    ){
        getPackList(
            id: $id
        ){
            title
            data{
                created_at
                increment_id
                channel_order_increment_id
                shipping_address{
                    firstname
                    lastname
                    street
                    city
                    region
                    postcode
                    country_name
                    telephone
                }
                pickup_info {
                    created_at
                    name
                    phone
                    loc_details
                    vehicle_number
                    vehicle_desc
                    notes
                }
                channel_shipping_label
                items{
                    sku
                    name
                    qty
                }
            }
            created_by
            checked_by
            approved_by
            received_by
        }
    }
`;

export default {
    getCurbPickupById,
    getCurbPickupList,
    confirmPickShipment,
    cantFulfillShipment,
    packShipment,
    pickedupShipment,
    getPickList,
    getPackList,
};
