import { gql } from '@apollo/client';

export const getSourceList = gql`
    query getSourceList($pageSize: Int!, $currentPage: Int!, $filter: SourceFilterInput, $sort: SourceSortInput, $search: String) {
        getSourceList(pageSize: $pageSize, currentPage: $currentPage, filter: $filter, sort: $sort, search: $search) {
            items {
                source_id
                loc_name
                sku
                qty_total
                qty_reserved
                qty_incoming
                qty_saleable
                qty_buffer
                priority
            }
            total_count
            page_info {
                page_size
                current_page
                total_pages
            }
        }
    }
`;

export const getSourceById = gql`
    query getSourceById($id: Int!) {
        getSourceById(id: $id) {
            source_id
            loc_name
            sku
            qty_total
            qty_reserved
            qty_incoming
            qty_saleable
            qty_buffer
            priority
        }
    }
`;

export const uploadSource = gql`
    mutation uploadSource($binary: String!) {
        uploadSource(input: { binary: $binary })
    }
`;

export const downloadSampleCsv = gql`
    mutation downloadSampleCsv($type: String!) {
        downloadSampleCsv(type: $type)
    }
`;

export const downloadSource = gql`
    mutation downloadSource($location_id: Int!) {
        downloadSource(location_id: $location_id)
    }
`;

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

export default {
    getSourceList,
    getSourceById,
    uploadSource,
    downloadSampleCsv,
    downloadSource,
    getActivity,
};
