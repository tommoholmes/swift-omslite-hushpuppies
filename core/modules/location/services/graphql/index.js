import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from './schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getLocationList = (variables) => useLazyQuery(Schema.getLocationList, {
    variables, ...context, ...fetchPolicy,
});

export const getLocationById = (variables) => useQuery(Schema.getLocationById, {
    variables, ...context, ...fetchPolicy,
});

export const createLocation = (variables) => useMutation(Schema.createLocation, {
    variables, ...context,
});

export const updateLocation = (variables) => useMutation(Schema.updateLocation, {
    variables, ...context,
});

export const multideleteLocation = (variables) => useMutation(Schema.multideleteLocation, {
    variables, ...context,
});

export default {
    getLocationList,
    getLocationById,
    createLocation,
    updateLocation,
    multideleteLocation,
};
