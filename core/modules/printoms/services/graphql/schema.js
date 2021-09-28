import { gql } from '@apollo/client';

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

export const getAddress = gql`
    query getAddress(
        $id: [Int!]!,
    ){
        getAddress(
            id: $id
        ){
            print_date
            data {
                entity_id
                channel{
                    channel_name
                }
                ref_barcode
                marketplace_order_number
                order_created_at
                store_name
                store_telephone
                track_barcode
                track_number
                channel_shipping_label
                shipping_amount
                so_barcode
                order_increment_id
                shipping_address{
                    firstname
                    lastname
                    street
                    city
                    region
                    postcode
                    country_id
                    telephone
                }
                store_category
                items{
                    sku
                    name
                    qty
                }
                notes
            }
        }
    }
`;

export const getInvoice = gql`
    query getInvoice(
        $id: [Int!]!,
    ){
        getInvoice(
            id: $id
        ){
            print_date
            data {
                entity_id
                            channel{
                    channel_name
                }
                ref_barcode
                marketplace_order_number
                so_barcode
                order_increment_id
                shipping_address{
                    firstname
                    lastname
                    street
                    city
                    region
                    postcode
                    country_id
                    telephone
                }
                order_created_at
                store_name
                channel_payment_method
                channel_shipping_label
                items{
                    sku
                    name
                    price
                    qty
                    amount
                }
                subtotal
                discount_amount
                shipping_amount
                grand_total
            }
        }
    }
`;

export default {
    getPickList,
    getPackList,
    getAddress,
    getInvoice,
};
