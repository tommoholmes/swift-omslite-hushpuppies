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

export default {
    getPickList,
    getPackList,
};
