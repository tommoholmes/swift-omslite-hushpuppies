import { gql } from '@apollo/client';

export const uploadPriceLocation = gql`
    mutation uploadPriceLocation(
        $binary: String!,
    ){
        uploadPriceLocation(
            input: {
                binary: $binary,
            }
        )
    }
`;

export const downloadSampleCsv = gql`
    mutation downloadSampleCsv(
        $type: String!,
    ){
        downloadSampleCsv(
            type: $type,
        )
    }
`;

export default {
    uploadPriceLocation,
    downloadSampleCsv,
};
