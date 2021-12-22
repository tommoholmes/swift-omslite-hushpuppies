import { useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/vendorbulktools/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const downloadSampleCsv = (variables) => useMutation(Schema.downloadSampleCsv, {
    variables,
    ...context,
});

export const getActivity = (options) => useLazyQuery(Schema.getActivity, {
    ...context,
    ...options,
    fetchPolicy: 'no-cache',
});

export const vendorCategoryUpload = (variables) => useMutation(Schema.vendorCategoryUpload, {
    variables,
    ...context,
});

export const vendorProductConfigurableUpload = (variables) => useMutation(Schema.vendorProductConfigurableUpload, {
    variables,
    ...context,
});
export const vendorProductBundleUpload = (variables) => useMutation(Schema.vendorProductBundleUpload, {
    variables,
    ...context,
});
export const vendorProductGroupedUpload = (variables) => useMutation(Schema.vendorProductGroupedUpload, {
    variables,
    ...context,
});
export const vendorProductPriceUpload = (variables) => useMutation(Schema.vendorProductPriceUpload, {
    variables,
    ...context,
});
export const vendorProductUpload = (variables) => useMutation(Schema.vendorProductUpload, {
    variables,
    ...context,
});
export const vendorProductPriceLocationUpload = (variables) => useMutation(Schema.vendorProductPriceLocationUpload, {
    variables,
    ...context,
});

export const isAccessAllowedLazy = (options) => useLazyQuery(Schema.isAccessAllowed, {
    ...options,
    ...context,
    ...fetchPolicy,
});

export default {
    downloadSampleCsv,
    getActivity,
    vendorCategoryUpload,
    vendorProductUpload,
    isAccessAllowedLazy,
    vendorProductConfigurableUpload,
    vendorProductBundleUpload,
    vendorProductGroupedUpload,
    vendorProductPriceUpload,
    vendorProductPriceLocationUpload,
};
