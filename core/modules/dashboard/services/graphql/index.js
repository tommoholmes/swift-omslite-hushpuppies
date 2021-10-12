import { useQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/dashboard/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

export const getCustomer = (variables) => useQuery(Schema.getCustomer, {
    variables, ...context, fetchPolicy: 'no-cache',
});

export const changePassword = (variables) => useMutation(Schema.changePassword, {
    variables, ...context,
});

export const changeEmail = (variables) => useMutation(Schema.changeEmail, {
    variables, ...context,
});

export const changeName = (variables) => useMutation(Schema.changeName, {
    variables, ...context,
});

export default {
    getCustomer,
    changePassword,
    changeEmail,
    changeName,
};
