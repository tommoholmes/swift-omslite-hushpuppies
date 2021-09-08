import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/curbpickup/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getCurbPickupById = (variables) => useQuery(Schema.getCurbPickupById, {
    variables, ...context, ...fetchPolicy,
});

export const getCurbPickupList = (variables) => useLazyQuery(Schema.getCurbPickupList, {
    variables, ...context, ...fetchPolicy,
});

export const confirmPickShipment = (variables) => useMutation(Schema.confirmPickShipment, {
    variables, ...context,
});

export const cantFulfillShipment = (variables) => useMutation(Schema.cantFulfillShipment, {
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

export default {
    getCurbPickupById,
    getCurbPickupList,
    confirmPickShipment,
    cantFulfillShipment,
    packShipment,
    pickedupShipment,
    getPickList,
    getPackList,
};
