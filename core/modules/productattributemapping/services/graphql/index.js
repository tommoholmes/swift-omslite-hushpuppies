import { useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/productattributemapping/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getProductAttributeList = (variables) => useLazyQuery(Schema.getProductAttributeList, {
    variables, ...context, ...fetchPolicy,
});

export const multideleteProductAttribute = (variables) => useMutation(Schema.multideleteProductAttribute, {
    variables, ...context,
});

export const uploadStatusProductCategory = (variables) => useMutation(Schema.uploadStatusProductCategory, {
    variables, ...context,
});

export const downloadSampleCsv = (variables) => useMutation(Schema.downloadSampleCsv, {
    variables, ...context,
});

export default {
    getProductAttributeList,
    multideleteProductAttribute,
    uploadStatusProductCategory,
    downloadSampleCsv,
};
