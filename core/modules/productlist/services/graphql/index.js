import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from './schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getProductList = (variables) => useLazyQuery(Schema.getProductList, {
    variables, ...context, ...fetchPolicy,
});

export const getProductById = (variables) => useQuery(Schema.getProductById, {
    variables, ...context, ...fetchPolicy,
});

export const updateProduct = (variables) => useMutation(Schema.updateProduct, {
    variables, ...context,
});

export const uploadSource = (variables) => useMutation(Schema.uploadSource, {
    variables, ...context,
});

export const downloadSampleCsv = (variables) => useMutation(Schema.downloadSampleCsv, {
    variables, ...context,
});

export const getProductListBySku = (variables) => useLazyQuery(Schema.getProductListBySku, {
    variables, ...context, ...fetchPolicy,
});

export default {
    getProductList,
    getProductById,
    updateProduct,
    uploadSource,
    downloadSampleCsv,
    getProductListBySku,
};
