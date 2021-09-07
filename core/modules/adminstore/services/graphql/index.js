import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/adminstore/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getCompanyList = (variables) => useLazyQuery(Schema.getCompanyList, {
    variables, ...context, ...fetchPolicy,
});

export const getCompanyById = (variables) => useQuery(Schema.getCompanyById, {
    variables, ...context, ...fetchPolicy,
});

export const createCompany = (variables) => useMutation(Schema.createCompany, {
    variables, ...context,
});

export const updateCompany = (variables) => useMutation(Schema.updateCompany, {
    variables, ...context,
});

export default {
    getCompanyList,
    getCompanyById,
    createCompany,
    updateCompany,
};
