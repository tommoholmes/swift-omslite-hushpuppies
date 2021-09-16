import { useQuery } from '@apollo/client';
import * as Schema from '@modules/curbpickup/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getPickList = (variables) => useQuery(Schema.getPickList, {
    variables, ...context, ...fetchPolicy,
});

export const getPackList = (variables) => useQuery(Schema.getPackList, {
    variables, ...context, ...fetchPolicy,
});

export default {
    getPickList,
    getPackList,
};
