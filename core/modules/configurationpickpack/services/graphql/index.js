import { useQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/configurationpickpack/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getPickPackConfigurations = (variables) => useQuery(Schema.getPickPackConfigurations, {
    variables, ...context, ...fetchPolicy,
});

export const savePickPackConfigurations = (variables) => useMutation(Schema.savePickPackConfigurations, {
    variables, ...context,
});

export default {
    getPickPackConfigurations,
    savePickPackConfigurations,
};
