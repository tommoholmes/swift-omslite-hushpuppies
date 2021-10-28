import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
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

export const confirmShipment = (variables) => useMutation(Schema.confirmShipment, {
    variables, ...context,
});

export const getShipmentStatus = (variables) => useQuery(Schema.getShipmentStatus, {
    variables, ...context, ...fetchPolicy,
});

export const saveShipmentNotes = (variables) => useMutation(Schema.saveShipmentNotes, {
    variables, ...context,
});

export default {
    getShipmentList,
    getShipmentById,
    confirmShipment,
    getShipmentStatus,
    saveShipmentNotes,
};
