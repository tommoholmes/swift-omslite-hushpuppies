import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/stocktransfer/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getStockTransferList = (variables) => useLazyQuery(Schema.getStockTransferList, {
    variables, ...context, ...fetchPolicy,
});

export const getStockTransferById = (variables) => useQuery(Schema.getStockTransferById, {
    variables, ...context, ...fetchPolicy,
});

export const uploadStockTransfer = (variables) => useMutation(Schema.uploadStockTransfer, {
    variables, ...context,
});

export const downloadSampleCsv = (variables) => useMutation(Schema.downloadSampleCsv, {
    variables, ...context,
});

export default {
    getStockTransferList,
    getStockTransferById,
    uploadStockTransfer,
    downloadSampleCsv,
};
