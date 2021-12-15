import { gql } from '@apollo/client';

export const customerAccessControlList = gql`
    query{
        customerAccessControlList{
            acl_code
        }
    }
`;

export const getStoreConfig = gql`
    query getStoreConfig(
        $path: String!
    ){
        getStoreConfig(
            path: $path
        )
    }
`;

export const isAccessAllowed = gql`
    query isAccessAllowed(
        $acl_code: String!
    ){
        isAccessAllowed(
            acl_code: $acl_code
        )
    }
`;

export default {
    customerAccessControlList,
    getStoreConfig,
    isAccessAllowed,
};
