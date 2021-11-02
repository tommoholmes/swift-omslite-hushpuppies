/* eslint-disable no-unused-vars */
import { useQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/shipments/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getConfigShippingMethod = (variables) => useQuery(Schema.getConfigShippingMethod, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const updateStoreConfig = (variables) => useMutation(Schema.updateStoreConfig, {
    variables,
    ...context,
});

export default {
    getConfigShippingMethod,
    updateStoreConfig,
};
