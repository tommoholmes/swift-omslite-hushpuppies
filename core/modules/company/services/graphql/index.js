import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from './schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getCompanyList = (variables) => useLazyQuery(Schema.getCompanyList, {
    variables, ...context, ...fetchPolicy,
});

export const getCompanyByCode = (variables) => useQuery(Schema.getCompanyByCode, {
    variables, ...context, ...fetchPolicy,
});

export const createCompany = (variables) => useMutation(Schema.createCompany, {
    variables, ...context,
});

export const updateCompany = (variables) => useMutation(Schema.updateCompany, {
    variables, ...context,
});

export const deleteCompany = (variables) => useMutation(Schema.deleteCompany, {
    variables, ...context,
});

export default {
    getCompanyList,
    getCompanyByCode,
    createCompany,
    updateCompany,
    deleteCompany,
};
