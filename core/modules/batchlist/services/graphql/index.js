import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
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

export const startPickByBatchPicklist = (variables) => useMutation(Schema.startPickByBatchPicklist, {
    variables, ...context,
});

export const donePickByBatchPicklist = (variables) => useMutation(Schema.donePickByBatchPicklist, {
    variables, ...context,
});

export const getPickByBatchPicklist = (variables) => useQuery(Schema.getPickByBatchPicklist, {
    variables, ...context, ...fetchPolicy,
});

export const getPickByBatchItemById = (variables) => useQuery(Schema.getPickByBatchItemById, {
    variables, ...context, ...fetchPolicy,
});

export const updatePickByBatchItem = (variables) => useMutation(Schema.updatePickByBatchItem, {
    variables, ...context,
});

export const startSortingPickByBatch = (variables) => useMutation(Schema.startSortingPickByBatch, {
    variables, ...context,
});

export const itemSortingPickByBatch = (variables) => useMutation(Schema.itemSortingPickByBatch, {
    variables, ...context,
});

export default {
    getPickByBatchList,
    getPickByBatchById,
    startPickByBatchPicklist,
    donePickByBatchPicklist,
    getPickByBatchPicklist,
    getPickByBatchItemById,
    updatePickByBatchItem,
    startSortingPickByBatch,
    itemSortingPickByBatch,
};
