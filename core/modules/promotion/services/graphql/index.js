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

export const getLocationList = (options) => useLazyQuery(Schema.getLocationList, {
    ...options, ...context, ...fetchPolicy,
});

export const addPromotion = (variables) => useMutation(Schema.addPromotion, {
    variables, ...context,
});

export const massDeletePromotion = (variables) => useMutation(Schema.massDeletePromotion, {
    variables, ...context,
});

export const exportPromotion = (options) => useMutation(Schema.exportPromotion, {
    ...options, ...context,
});

export const savePromotion = (variables) => useMutation(Schema.savePromotion, {
    variables, ...context,
});

export const getPromotionById = (options) => useQuery(Schema.getPromotionById, {
    ...options, ...context, ...fetchPolicy,
});

export const isPromotionSkuExist = (options) => useLazyQuery(Schema.isPromotionSkuExist, {
    ...options, ...context, ...fetchPolicy,
});

export const getPromotionChannelsByLocId = (options) => useLazyQuery(Schema.getPromotionChannelsByLocId, {
    ...options, ...context, ...fetchPolicy,
});

export default {
    getPromotionList,
    updateStatusPromotion,
    downloadSampleCsv,
    importPromotion,
    getCompanyOptions,
    getLocationList,
    addPromotion,
    massDeletePromotion,
    exportPromotion,
    savePromotion,
    getPromotionById,
    isPromotionSkuExist,
    getPromotionChannelsByLocId,
};
