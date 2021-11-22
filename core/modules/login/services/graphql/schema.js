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
    customer_loc_code
    channel_code
    group{
      id
      code
  }
  }
}
`;

export default {
    getCustomerToken,
    removeToken,
    getCustomer,
};
