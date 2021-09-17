import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/homedelivery/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getStoreShipmentList = (variables) => useLazyQuery(Schema.getStoreShipmentList, {
    variables, ...context, ...fetchPolicy,
});

export const getStoreShipmentById = (variables) => useQuery(Schema.getStoreShipmentById, {
    variables, ...context, ...fetchPolicy,
});

export const confirmShipment = (variables) => useMutation(Schema.confirmShipment, {
    variables, ...context,
});

export const cantFulfillShipment = (variables) => useMutation(Schema.cantFulfillShipment, {
    variables, ...context,
});

export const pickShipment = (variables) => useMutation(Schema.pickShipment, {
    variables, ...context,
});

export const packShipment = (variables) => useMutation(Schema.packShipment, {
    variables, ...context,
});

export const bookCourier = (variables) => useMutation(Schema.bookCourier, {
    variables, ...context,
});

export const shipDelivery = (variables) => useMutation(Schema.shipDelivery, {
    variables, ...context,
});

export const deliveredShipment = (variables) => useMutation(Schema.deliveredShipment, {
    variables, ...context,
});

export default {
    getStoreShipmentList,
    getStoreShipmentById,
    confirmShipment,
    cantFulfillShipment,
    pickShipment,
    packShipment,
    bookCourier,
    shipDelivery,
    deliveredShipment,
};
