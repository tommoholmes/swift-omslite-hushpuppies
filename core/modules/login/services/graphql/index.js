import { useMutation } from '@apollo/client';
import * as Schema from './schema';

export const getToken = () => useMutation(Schema.getCustomerToken, {
    context: {
        request: 'internal',
    },
});

export const removeToken = () => useMutation(Schema.removeToken, {
    context: {
        request: 'internal',
    },
});

export default {
    getToken,
    removeToken,
};
