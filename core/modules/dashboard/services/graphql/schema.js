import { gql } from '@apollo/client';

export const getCustomer = gql`
    query{
        customer{
            email
            firstname
            lastname
            customer_loc_code
            channel_code
        }
    }
`;

export const getDashboardData = gql`
    query{
        getDashboardData{
            order_new
            order_no_allocation
            order_failed
            shipment_unconfirmed_total
            shipment_unconfirmed_store_pickup
            shipment_unconfirmed_home_delivery
            shipment_unconfirmed_marketplace
            shipment_cannot_fulfill
            return_new
        }
    }
`;

export const getChannelList = gql`
    query{
        getChannelList{
            items{
                channel_id
                channel_code
                channel_name
                framework
                virtual_stock_list
                location_list
           }
        }
    }
`;

export const changePassword = gql`
    mutation changeCustomerPassword(
        $currentPassword: String!,
        $newPassword: String!
    ){
        changeCustomerPassword(
            currentPassword: $currentPassword,
            newPassword: $newPassword
        ){
            email
            firstname
            lastname
        }
    }
`;

export const changeEmail = gql`
    mutation updateCustomer(
        $email: String,
        $password: String
    ){
        updateCustomer(
            input:{
                email: $email,
                password: $password
            }
        ){
            customer{
                id
                firstname
                email
            }
        }
    }
`;

export const changeName = gql`
    mutation updateCustomer(
        $firstname: String,
        $lastname: String
    ){
        updateCustomer(
            input:{
                firstname: $firstname,
                lastname: $lastname
            }
        ){
            customer{
                id
                firstname
                lastname
                email
            }
        }
    }
`;

export default {
    getCustomer,
    getDashboardData,
    getChannelList,
    changePassword,
    changeEmail,
    changeName,
};
