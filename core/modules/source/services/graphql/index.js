import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from './schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getSourceList = (variables) => useLazyQuery(Schema.getSourceList, {
    variables, ...context, ...fetchPolicy,
});

export const getSourceById = (variables) => useQuery(Schema.getSourceById, {
    variables, ...context, ...fetchPolicy,
});

export const uploadSource = (variables) => useMutation(Schema.uploadSource, {
    variables, ...context,
});

export const downloadSampleCsv = (variables) => useMutation(Schema.downloadSampleCsv, {
    variables, ...context,
});

export const downloadSource = (variables) => useMutation(Schema.downloadSource, {
    variables, ...context,
});

export default {
    getSourceList,
    getSourceById,
    uploadSource,
    downloadSampleCsv,
    downloadSource,
};
