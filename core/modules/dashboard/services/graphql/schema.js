import { gql } from '@apollo/client';

export const getCustomer = gql`
    query{
        customer{
            email
            firstname
            lastname
            customer_loc_code
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
    changePassword,
    changeEmail,
    changeName,
};
