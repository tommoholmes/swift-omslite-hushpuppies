import { useQuery } from '@apollo/client';
import * as Schema from '@modules/theme/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const customerAccessControlList = (variables) => useQuery(Schema.customerAccessControlList, {
    variables, ...context, ...fetchPolicy,
});

export default {
    customerAccessControlList,
};
