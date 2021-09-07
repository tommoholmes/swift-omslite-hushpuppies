import { useMutation } from '@apollo/client';
import * as Schema from '@modules/locationpriceupload/services/graphql/schema';

const context = {
    context: { request: 'internal' },
};

export const uploadPriceLocation = (variables) => useMutation(Schema.uploadPriceLocation, {
    variables, ...context,
});

export const downloadSampleCsv = (variables) => useMutation(Schema.downloadSampleCsv, {
    variables, ...context,
});

export default {
    uploadPriceLocation,
    downloadSampleCsv,
};
