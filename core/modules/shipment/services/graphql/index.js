import { useQuery, useLazyQuery } from '@apollo/client';
import * as Schema from '@modules/shipment/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getShipmentList = (variables) => useLazyQuery(Schema.getShipmentList, {
    variables, ...context, ...fetchPolicy,
});

export const getShipmentById = (variables) => useQuery(Schema.getShipmentById, {
    variables, ...context, ...fetchPolicy,
});

export default {
    getShipmentList,
    getShipmentById,
};
