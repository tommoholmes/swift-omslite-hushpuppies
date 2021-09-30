import { useMutation } from '@apollo/client';
import * as Schema from '@modules/updatestockbyfilehistory/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

export const createCompany = (variables) => useMutation(Schema.createCompany, {
    variables, ...context,
});

export default {
    createCompany,
};