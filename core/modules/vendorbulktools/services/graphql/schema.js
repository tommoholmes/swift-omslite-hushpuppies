import { gql } from '@apollo/client';

export const getActivity = gql`
    query getActivity($code: String!) {
        getActivity(code: $code, by_session: true) {
            activity_id
            activity_code
            run_status
            data_total
            data_processed
            started_at
            snapshot_at
            finished_at
            run_by
            run_type
            attachment
            error_message
        }
    }
`;

export const downloadSampleCsv = gql`
    mutation downloadSampleCsv($type: String!) {
        downloadSampleCsv(type: $type)
    }
`;

export const vendorCategoryUpload = gql`
    mutation vendorCategoryUpload($binary: String!, $channelCode: String!) {
        vendorCategoryUpload(binary: $binary, channelCode: $channelCode) {
            attachment_url
            is_success
            message
            status
        }
    }
`;

export const vendorProductUpload = gql`
    mutation vendorProductUpload($binary: String!) {
        vendorProductUpload(binary: $binary) {
            attachment_url
            is_success
            message
            status
        }
    }
`;

export const isAccessAllowed = gql`
    query isAccessAllowed($acl_code: String!) {
        isAccessAllowed(acl_code: $acl_code)
    }
`;

export default {
    getActivity,
    downloadSampleCsv,
    vendorCategoryUpload,
    vendorProductUpload,
    isAccessAllowed,
};
