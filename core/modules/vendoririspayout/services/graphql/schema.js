import { gql } from '@apollo/client';

export const getVendorIrisPayoutHistory = gql`
    query getVendorIrisPayoutHistory(
        $pageSize: Int,
        $currentPage: Int!,
        $filter: VendorIrisPayoutHistoryFilterInput,
        $sort: VendorIrisPayoutHistorySortInput
    ){
        getVendorIrisPayoutHistory(
            pageSize: $pageSize,
            currentPage: $currentPage,
            filter: $filter,
            sort: $sort
        ){
            items {
                id
                create_at
                action
                request
                response
                amount
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

export const createVendorIrisPayout = gql`
    mutation createVendorIrisPayout(
        $beneficiary_id: Int!,
        $amount: String!,
        $notes: String!
    ){
        createVendorIrisPayout(
            input: {
                beneficiary_id: $beneficiary_id,
                amount: $amount,
                notes: $notes
            }
        ){
            error
            message
        }
    }
`;

export default {
    getVendorIrisPayoutHistory,
    createVendorIrisPayout,
};
