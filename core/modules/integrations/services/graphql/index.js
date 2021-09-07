/* eslint-disable no-unused-vars */
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/integrations/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

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
    getCompanyById,
    createCompany,
    updateCompany,
};
