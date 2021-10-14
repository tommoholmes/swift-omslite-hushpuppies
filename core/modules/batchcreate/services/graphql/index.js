import { useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/batchcreate/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getSummaryShipmentToPick = (variables) => useLazyQuery(Schema.getSummaryShipmentToPick, { variables, ...context, ...fetchPolicy });
export const createPickByBatch = (variables) => useMutation(Schema.createPickByBatch, { variables, ...context });

export default {
    getSummaryShipmentToPick,
    createPickByBatch,
};
