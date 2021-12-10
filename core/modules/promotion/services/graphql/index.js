import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import * as Schema from '@modules/promotion/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getPromotionList = (variables) => useLazyQuery(Schema.getPromotionList, {
    variables, ...context, ...fetchPolicy,
});

export const updateStatusPromotion = (variables) => useMutation(Schema.updateStatusPromotion, {
    variables, ...context,
});

export const downloadSampleCsv = (variables) => useMutation(Schema.downloadSampleCsv, {
    variables, ...context,
});

export const importPromotion = (variables) => useMutation(Schema.importPromotion, {
    variables, ...context,
});

export const getCompanyOptions = (variables) => useQuery(Schema.getCompanyOptions, {
    variables, ...context, ...fetchPolicy,
});

export const getLocationOptions = (variables) => useQuery(Schema.getLocationOptions, {
    variables, ...context, ...fetchPolicy,
});

export const getChannelOptions = (variables) => useQuery(Schema.getChannelOptions, {
    variables, ...context, ...fetchPolicy,
});

export const addPromotion = (variables) => useMutation(Schema.addPromotion, {
    variables, ...context,
});

export default {
    getPromotionList,
    updateStatusPromotion,
    downloadSampleCsv,
    importPromotion,
    getCompanyOptions,
    getLocationOptions,
    getChannelOptions,
    addPromotion,
};
