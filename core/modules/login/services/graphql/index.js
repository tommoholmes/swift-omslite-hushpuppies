import { useMutation, useLazyQuery } from '@apollo/client';
import * as Schema from '@modules/login/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

export const getToken = () => useMutation(Schema.getCustomerToken, {
    ...context,
});

export const removeToken = () => useMutation(Schema.removeToken, {
    ...context,
});

export const getCustomer = () => useLazyQuery(Schema.getCustomer, {
    ...context, fetchPolicy: 'no-cache',
});

export default {
    getToken,
    removeToken,
    getCustomer,
};
