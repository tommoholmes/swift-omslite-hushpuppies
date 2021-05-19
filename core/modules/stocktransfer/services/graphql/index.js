import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from './schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getStockTransferList = (variables) => useLazyQuery(Schema.getStockTransferList, {
    variables, ...context, ...fetchPolicy,
});

export const getCompanyById = (variables) => useQuery(Schema.getCompanyById, {
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
    getCompanyById,
    uploadStockTransfer,
    downloadSampleCsv,
};
