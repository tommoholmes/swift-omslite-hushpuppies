import { gql } from '@apollo/client';

export const createCompany = gql`
    mutation createCompany(
        $company_code: String!,
        $company_name: String!
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

export default {
    createCompany,
};
