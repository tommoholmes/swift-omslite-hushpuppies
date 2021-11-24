import { useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/productassembly/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getProductAssemblyList = (options) => useLazyQuery(Schema.getProductAssemblyList, {
    ...options, ...context, ...fetchPolicy,
});

export const downloadSampleCsv = (variables) => useMutation(Schema.downloadSampleCsv, {
    variables, ...context,
});

export const uploadProductAssembly = (variables) => useMutation(Schema.uploadProductAssembly, {
    variables, ...context,
});

export default {
    getProductAssemblyList,
    downloadSampleCsv,
    uploadProductAssembly,
};
