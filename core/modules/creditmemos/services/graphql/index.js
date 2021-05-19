import { useQuery, useLazyQuery } from '@apollo/client';
import * as Schema from './schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getCreditMemoList = (variables) => useLazyQuery(Schema.getCreditMemoList, {
    variables, ...context, ...fetchPolicy,
});

export const getCreditMemoById = (variables) => useQuery(Schema.getCreditMemoById, {
    variables, ...context, ...fetchPolicy,
});

export default {
    getCreditMemoList,
    getCreditMemoById,
};
