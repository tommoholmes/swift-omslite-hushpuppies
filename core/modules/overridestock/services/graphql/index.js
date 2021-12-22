import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/overridestock/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getVirtualStockQuantityList = (variables) => useLazyQuery(Schema.getVirtualStockQuantityList, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const getVirtualStockQuantityById = (variables) => useQuery(Schema.getVirtualStockQuantityById, {
    variables,
    ...context,
    ...fetchPolicy,
});

export const createVirtualStockQuantity = (variables) => useMutation(Schema.createVirtualStockQuantity, {
    variables,
    ...context,
});

export const updateVirtualStockQuantity = (variables) => useMutation(Schema.updateVirtualStockQuantity, {
    variables,
    ...context,
});

export const uploadVirtualStockQuantity = (variables) => useMutation(Schema.uploadVirtualStockQuantity, {
    variables,
    ...context,
});

export const downloadSampleCsv = (variables) => useMutation(Schema.downloadSampleCsv, {
    variables,
    ...context,
});

export const getActivity = (options) => useLazyQuery(Schema.getActivity, {
    ...context,
    ...options,
    fetchPolicy: 'no-cache',
});

export const syncOverrideStockToMarketplace = (variables) => useMutation(Schema.syncOverrideStockToMarketplace, {
    variables,
    ...context,
});

export const multideleteVirtualStockQuantity = (variables) => useMutation(Schema.multideleteVirtualStockQuantity, {
    variables,
    ...context,
});

export const deleteAllVirtualStock = (variables) => useMutation(Schema.deleteAllVirtualStock, {
    variables,
    ...context,
});

export default {
    getVirtualStockQuantityList,
    getVirtualStockQuantityById,
    createVirtualStockQuantity,
    updateVirtualStockQuantity,
    uploadVirtualStockQuantity,
    downloadSampleCsv,
    getActivity,
    syncOverrideStockToMarketplace,
    multideleteVirtualStockQuantity,
    deleteAllVirtualStock,
};
