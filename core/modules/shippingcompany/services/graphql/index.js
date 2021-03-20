import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from './schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getShippingCompanyList = (variables) => useLazyQuery(Schema.getShippingCompanyList, {
    variables, ...context, ...fetchPolicy,
});

export const getShippingCompanyById = (variables) => useQuery(Schema.getShippingCompanyById, {
    variables, ...context, ...fetchPolicy,
});

export const createShippingCompany = (variables) => useMutation(Schema.createShippingCompany, {
    variables, ...context,
});

export const updateShippingCompany = (variables) => useMutation(Schema.updateShippingCompany, {
    variables, ...context,
});

export const deleteShippingCompany = (variables) => useMutation(Schema.deleteShippingCompany, {
    variables, ...context,
});

export const multideleteShippingCompany = (variables) => useMutation(Schema.multideleteShippingCompany, {
    variables, ...context,
});

export default {
    getShippingCompanyList,
    getShippingCompanyById,
    createShippingCompany,
    updateShippingCompany,
    deleteShippingCompany,
    multideleteShippingCompany,
};
