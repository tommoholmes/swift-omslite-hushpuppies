import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from './schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getVirtualStockQuantityList = (variables) => useLazyQuery(Schema.getVirtualStockQuantityList, {
    variables, ...context, ...fetchPolicy,
});

export const getVirtualStockQuantityById = (variables) => useQuery(Schema.getVirtualStockQuantityById, {
    variables, ...context, ...fetchPolicy,
});

export const createVirtualStockQuantity = (variables) => useMutation(Schema.createVirtualStockQuantity, {
    variables, ...context,
});

export const updateVirtualStockQuantity = (variables) => useMutation(Schema.updateVirtualStockQuantity, {
    variables, ...context,
});

export const uploadSource = (variables) => useMutation(Schema.uploadSource, {
    variables, ...context,
});

export const downloadSampleCsv = (variables) => useMutation(Schema.downloadSampleCsv, {
    variables, ...context,
});

export default {
    getVirtualStockQuantityList,
    getVirtualStockQuantityById,
    createVirtualStockQuantity,
    updateVirtualStockQuantity,
    uploadSource,
    downloadSampleCsv,
};
