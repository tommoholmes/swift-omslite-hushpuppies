import { useMutation, useLazyQuery } from '@apollo/client';
import * as Schema from '@modules/locationpriceupload/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};
const fetchPolicy = {
    fetchPolicy: 'cache-and-network',
};

export const uploadPriceLocation = (variables) => useMutation(Schema.uploadPriceLocation, {
    variables,
    ...context,
});

export const downloadSampleCsv = (variables) => useMutation(Schema.downloadSampleCsv, {
    variables,
    ...context,
});

export const getPriceLocationList = (variables) => useLazyQuery(Schema.getPriceLocationList, {
    variables,
    ...context,
    ...fetchPolicy,
});

export default {
    uploadPriceLocation,
    downloadSampleCsv,
    getPriceLocationList,
};
