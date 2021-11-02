import { gql } from '@apollo/client';

export const getConfigShippingMethod = gql`
    query {
        getConfigShippingMethod {
            path
            value
        }
    }
`;

export const updateStoreConfig = gql`
    mutation updateStoreConfig($input: StoreConfigInput!) {
        updateStoreConfig(input: $input) {
            __typename
        }
    }
`;
export default {
    getConfigShippingMethod,
    updateStoreConfig,
};
