import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
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

export const multiReadNotification = (variables) => useMutation(Schema.multiReadNotification, {
    variables, ...context,
});

export default {
    getNotificationList,
    getNotificationById,
    multiReadNotification,
};
