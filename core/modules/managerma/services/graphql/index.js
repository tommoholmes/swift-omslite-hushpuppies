import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/managerma/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getRmaList = (variables) => useLazyQuery(Schema.getRmaList, {
    variables, ...context, ...fetchPolicy,
});

export const getRmaById = (variables) => useQuery(Schema.getRmaById, {
    variables, ...context, ...fetchPolicy,
});
export const refundRma = (variables) => useMutation(Schema.refundRma, {
    variables, ...context,
});

export default {
    getRmaList,
    getRmaById,
    refundRma,
};
