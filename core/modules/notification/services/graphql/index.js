import { useQuery, useLazyQuery } from '@apollo/client';
import * as Schema from './schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getNotificationList = (variables) => useLazyQuery(Schema.getNotificationList, {
    variables, ...context, ...fetchPolicy,
});

export const getNotificationById = (variables) => useQuery(Schema.getNotificationById, {
    variables, ...context, ...fetchPolicy,
});

export default {
    getNotificationList,
    getNotificationById,
};
