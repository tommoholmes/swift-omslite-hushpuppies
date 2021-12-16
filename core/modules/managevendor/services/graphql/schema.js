import { gql } from '@apollo/client';

export const getCompanyList = gql`
    query getCompanyList(
        $pageSize: Int!,
        $currentPage: Int!,
        $filter: CompanyFilterInput,
        $sort: CompanySortInput,
    ){
        getCompanyList(
            pageSize: $pageSize,
            currentPage: $currentPage,
            filter: $filter,
            sort: $sort,
        ){
            items {
                company_id
                company_code
                company_name
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

export const getCompanyById = gql`
    query getCompanyById(
        $id: Int!,
    ){
        getCompanyById(
            id: $id
        ){
            company_code
            company_id
            company_name
            is_new_product
            company_margin
            is_product_approval
        }
    }
`;

export const updateCompany = gql`
    mutation updateCompany(
        $id: Int!,
        $company_code: String!,
        $company_name: String!,
        $company_margin: Int,
        $is_new_product: Int,
        $is_product_approval: Int
    ){
        updateCompany(
            id: $id,
            input: {
                company_code: $company_code,
                company_name: $company_name,
                company_margin: $company_margin,
                is_new_product: $is_new_product,
                is_product_approval: $is_product_approval
            }
        ){
            company_code
            company_id
            company_name
            company_margin
            is_new_product
            is_product_approval
        }
    }
`;

export const getVendorList = gql`
    query getVendorList(
        $pageSize: Int!,
        $currentPage: Int!,
        $filter: VendorFilterInput,
        $sort: VendorSortInput,
    ){
        getVendorList(
            pageSize: $pageSize,
            currentPage: $currentPage,
            filter: $filter,
            sort: $sort,
        ){
            items {
                company_id
                company_code
                company_name
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

export const getVendorById = gql`
    query getVendorById($id: Int!){
        getVendorById(id: $id){
            company_id
            company_code
            company_name
            company_street
            company_country_id
            company_region
            company_city
            no_telephone
            is_new_product
            company_margin
            is_product_approval
            logo
            promotion_banner
            shipper_shipping
            vendor_shipping
        }
    }
`;

export const getCourierOption = gql`
    query {
        getCourierOption {
            label
            value
        }
    }
`;

export const getShipperMethodOption = gql`
    query {
        getShipperMethodOption {
            label
            value
        }
    }
`;

export const vendorUpdate = gql`
    mutation vendorUpdate($input: VendorUpdateInput!){
        vendorUpdate(input: $input)
    }
`;

export default {
    getCompanyList,
    getCompanyById,
    updateCompany,

    getVendorList,
    getVendorById,
    getCourierOption,
    getShipperMethodOption,
    vendorUpdate,
};
