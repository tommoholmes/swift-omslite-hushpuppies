import { gql } from '@apollo/client';

export const getCompanyList = gql`
    query getCompanyList(
        $pageSize: Int!,
        $currentPage: Int!,
    ){
        getCompanyList(
            pageSize: $pageSize,
            currentPage: $currentPage
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

export const getCompanyByCode = gql`
    query getCompanyByCode(
        $code: String!,
    ){
        getCompanyByCode(
            code: $code
        ){
            company_code
            company_id
            company_name
            is_new_product
        }
    }
`;

export const createCompany = gql`
    mutation createCompany(
        $company_code: String!,
        $company_name: String!,
    ){
        createCompany(
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

export const deleteCompany = gql`
    mutation deleteCompany (
        $id: Int!
    ){
        deleteCompany(
            id: $id
        )
    }
`;

export default {
    getCompanyList,
    getCompanyByCode,
    createCompany,
    updateCompany,
    deleteCompany,
};
