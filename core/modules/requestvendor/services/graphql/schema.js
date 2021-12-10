import { gql } from '@apollo/client';

export const getVendorRequestList = gql`
    query getVendorRequestList(
        $pageSize: Int,
        $currentPage: Int,
        $filter: VendorRequestFilterInput,
        $sort: VendorRequestSortInput
    ){
        getVendorRequestList(
            pageSize: $pageSize,
            currentPage: $currentPage,
            filter: $filter,
            sort: $sort
        ){
            items {
                entity_id
                first_name
                last_name
                company_code
                company_name
                status
                status_label
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

export const getVendorRequestById = gql`
    query getVendorRequestById(
        $id: Int!,
    ){
        getVendorRequestById(
            id: $id
        ){
            entity_id
            first_name
            last_name
            email
            company_street
            company_country_id
            company_country_name
            company_region
            company_city
            no_telephone
            company_name
            company_code
            status
            status_label
        }
    }
`;

export const updateCompany = gql`
    mutation updateCompany(
        $id: Int!,
        $company_code: String!,
        $company_name: String!,
    ){
        updateCompany(
            id: $id,
            input: {
                company_code: $company_code,
                company_name: $company_name
            }
        ){
            company_code
            company_id
            company_name
            is_new_product
        }
    }
`;

export const vendorRequestApprove = gql`
    mutation vendorRequestApprove(
        $id: Int!,
    ){
        vendorRequestApprove(
            id: $id
        )
    }
`;

export const vendorRequestNotApprove = gql`
    mutation vendorRequestNotApprove(
        $id: Int!,
    ){
        vendorRequestNotApprove(
            id: $id
        )
    }
`;

export default {
    getVendorRequestList,
    getVendorRequestById,
    updateCompany,
    vendorRequestApprove,
    vendorRequestNotApprove,
};
