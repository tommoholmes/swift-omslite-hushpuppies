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

export default {
    customerAccessControlList,
    getStoreConfig,
};
