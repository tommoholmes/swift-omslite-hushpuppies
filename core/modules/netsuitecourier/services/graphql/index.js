import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import * as Schema from '@modules/netsuitecourier/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getNetsuiteCourierList = (variables) => useLazyQuery(Schema.getNetsuiteCourierList, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getNetsuiteCourierById = (variables) => useQuery(Schema.getNetsuiteCourierById, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const saveNetsuiteCourier = (variables) => useMutation(Schema.saveNetsuiteCourier, {
    variables,
    ...context,
});

export const getNetsuiteDeliveryMethodOptions = (variables) => useLazyQuery(Schema.getNetsuiteDeliveryMethodOptions, {
    variables,
    ...context,
    ...fetchPolicy,
});

export default {
    getNetsuiteCourierList,
    getNetsuiteCourierById,
    saveNetsuiteCourier,
    getNetsuiteDeliveryMethodOptions,
};
