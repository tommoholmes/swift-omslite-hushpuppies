import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/orderqueue/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getOrderQueueList = (variables) => useLazyQuery(Schema.getOrderQueueList, {
    variables, ...context, ...fetchPolicy,
});

export const getOrderQueueById = (variables) => useQuery(Schema.getOrderQueueById, {
    variables, ...context, ...fetchPolicy,
});

export const setReallocation = (variables) => useMutation(Schema.setReallocation, {
    variables, ...context,
});

export const isAccessAllowed = (variables) => useQuery(Schema.isAccessAllowed, {
    variables, ...context, ...fetchPolicy,
});

export const exportOrderToCsv = (options) => useLazyQuery(Schema.exportOrderToCsv, {
    ...options, ...context, ...fetchPolicy,
});

export default {
    getOrderQueueList,
    getOrderQueueById,
    setReallocation,
    isAccessAllowed,
    exportOrderToCsv,
};
