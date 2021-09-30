import { useQuery, useLazyQuery } from '@apollo/client';
import * as Schema from '@modules/batchlist/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getPickByBatchList = (variables) => useLazyQuery(Schema.getPickByBatchList, {
    variables, ...context, ...fetchPolicy,
});

export const getPickByBatchById = (variables) => useQuery(Schema.getPickByBatchById, {
    variables, ...context, ...fetchPolicy,
});

export const getPickByBatchPicklist = (variables) => useQuery(Schema.getPickByBatchPicklist, {
    variables, ...context, ...fetchPolicy,
});

export default {
    getPickByBatchList,
    getPickByBatchById,
    getPickByBatchPicklist,
};
