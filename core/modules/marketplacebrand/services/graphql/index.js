import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import * as Schema from '@modules/marketplacebrand/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getStoreList = (variables) => useLazyQuery(Schema.getStoreList, {
    variables, ...context, ...fetchPolicy,
});

export const registerMarketplaceBrand = (variables) => useMutation(Schema.registerMarketplaceBrand, {
    variables, ...context,
});

export const getAvailableMpToConnect = (variables) => useQuery(Schema.getAvailableMpToConnect, {
    variables, ...context, ...fetchPolicy,
});

export default {
    getStoreList,
    registerMarketplaceBrand,
    getAvailableMpToConnect,
};
