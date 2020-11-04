import { useMutation } from '@apollo/client';
import * as Schema from './schema';

export const getToken = () => useMutation(Schema.getCustomerToken, {
    context: {
        request: 'internal',
    },
});

export default {
    getToken,
};
