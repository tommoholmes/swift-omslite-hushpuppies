import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/storepickup/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getStoreShipmentList = (variables) => useLazyQuery(Schema.getStoreShipmentList, {
    variables, ...context, ...fetchPolicy,
});

export const getShipmentById = (variables) => useQuery(Schema.getShipmentById, {
    variables, ...context, ...fetchPolicy,
});

export const confirmShipment = (variables) => useMutation(Schema.confirmShipmentPickup, {
    variables, ...context,
});

export const cantFulfillShipment = (variables) => useMutation(Schema.cantFulfillShipmentPickup, {
    variables, ...context,
});

export const pickShipment = (variables) => useMutation(Schema.pickShipmentPickup, {
    variables, ...context,
});

export const packShipment = (variables) => useMutation(Schema.packShipmentPickup, {
    variables, ...context,
});

export const bookCourier = (variables) => useMutation(Schema.bookCourierPickup, {
    variables, ...context,
});

export const shipDelivery = (variables) => useMutation(Schema.shipDeliveryPickup, {
    variables, ...context,
});

export const deliveredShipment = (variables) => useMutation(Schema.deliveredShipmentPickup, {
    variables, ...context,
});

export default {
    getStoreShipmentList,
    getShipmentById,
    confirmShipment,
    cantFulfillShipment,
    pickShipment,
    packShipment,
    bookCourier,
    shipDelivery,
    deliveredShipment,
};
