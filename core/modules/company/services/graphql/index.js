import { useQuery } from '@apollo/client';
import * as Schema from './schema';

export const getCompanyList = (variables) => useQuery(Schema.getCompanyList, {
    variables,
    context: {
        request: 'internal',
    },
});

export default {
    getCompanyList,
};
