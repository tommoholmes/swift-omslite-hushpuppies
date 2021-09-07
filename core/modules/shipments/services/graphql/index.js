/* eslint-disable no-unused-vars */
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/shipments/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const createChannel = (variables) => useMutation(Schema.createChannel, {
    variables, ...context,
});

export default {
    createChannel,
};
