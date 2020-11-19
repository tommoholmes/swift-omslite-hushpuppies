import { gql } from '@apollo/client';

export const getCustomerToken = gql`
mutation getToken(
    $email: String!,
    $password: String!,
) {
  internalGenerateCustomerToken(email: $email, password: $password){
      token
    }
  }
`;

export const removeToken = gql`
mutation {
  internalDeleteCustomerToken{
    result
  }
}
`;

export const getCustomer = gql`
query{
  customer{
    email
    firstname
    lastname
    middlename
  }
}
`;

export default {
    getCustomerToken,
    removeToken,
    getCustomer,
};
