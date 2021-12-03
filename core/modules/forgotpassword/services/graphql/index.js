import { useMutation } from '@apollo/client';
import * as Schema from '@modules/forgotpassword/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

export const requestResetPassword = (variables) => useMutation(Schema.requestResetPassword, {
    variables,
    ...context,
});

export const setNewPassword = (variables) => useMutation(Schema.setNewPassword, {
    variables,
    ...context,
});

export default {
    requestResetPassword,
    setNewPassword,
};
