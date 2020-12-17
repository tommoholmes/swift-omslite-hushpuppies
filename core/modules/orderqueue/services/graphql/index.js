import { useQuery, useLazyQuery } from '@apollo/client';
import * as Schema from './schema';

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

export default {
    getOrderQueueList,
    getOrderQueueById,
};
