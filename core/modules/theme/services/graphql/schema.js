import { gql } from '@apollo/client';

export const customerAccessControlList = gql`
    query{
        customerAccessControlList{
            acl_code
        }
    }
`;

export default {
    customerAccessControlList,
};
