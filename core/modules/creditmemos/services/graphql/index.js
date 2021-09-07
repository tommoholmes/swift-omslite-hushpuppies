import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/creditmemos/services/graphql/schema';

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

export const createCreditmemo = (variables) => useMutation(Schema.createCreditmemo, {
    variables, ...context,
});

export default {
    getCreditMemoList,
    getCreditMemoById,
    createCreditmemo,
};
