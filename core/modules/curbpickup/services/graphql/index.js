import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/curbpickup/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getStoreShipmentById = (variables) => useQuery(Schema.getStoreShipmentById, {
    variables, ...context, ...fetchPolicy,
});

export const getStoreShipmentList = (variables) => useLazyQuery(Schema.getStoreShipmentList, {
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

export const pickedupShipment = (variables) => useMutation(Schema.pickedupShipment, {
    variables, ...context,
});

export const getPickList = (variables) => useQuery(Schema.getPickList, {
    variables, ...context, ...fetchPolicy,
});

export const getPackList = (variables) => useQuery(Schema.getPackList, {
    variables, ...context, ...fetchPolicy,
});

export const getShipmentStatusByType = (variables) => useQuery(Schema.getShipmentStatusByType, {
    variables, ...context, ...fetchPolicy,
});

export default {
    getStoreShipmentById,
    getStoreShipmentList,
    confirmShipment,
    cantFulfillShipment,
    pickShipment,
    packShipment,
    pickedupShipment,
    getPickList,
    getPackList,
    getShipmentStatusByType,
};
