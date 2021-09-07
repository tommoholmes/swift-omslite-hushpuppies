import { useLazyQuery, useMutation } from '@apollo/client';
import * as Schema from '@modules/productcategory/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const getProductCategoryList = (variables) => useLazyQuery(Schema.getProductCategoryList, {
    variables, ...context, ...fetchPolicy,
});

export const uploadStatusProductCategory = (variables) => useMutation(Schema.uploadStatusProductCategory, {
    variables, ...context,
});

export const downloadSampleCsv = (variables) => useMutation(Schema.downloadSampleCsv, {
    variables, ...context,
});

export default {
    getProductCategoryList,
    uploadStatusProductCategory,
    downloadSampleCsv,
};
