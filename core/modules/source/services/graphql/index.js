import { useQuery, useLazyQuery } from '@apollo/client';
import * as Schema from './schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getSourceList = (variables) => useLazyQuery(Schema.getSourceList, {
    variables, ...context, ...fetchPolicy,
});

export const getSourceById = (variables) => useQuery(Schema.getSourceById, {
    variables, ...context, ...fetchPolicy,
});

export default {
    getSourceList,
    getSourceById,
};
