import { gql } from '@apollo/client';

export const getCustomerToken = gql`
mutation getToken(
    $username: String!,
    $password: String!,
) {
  internalGenerateCustomerToken(username: $username, password: $password){
      token
    }
  }
`;

export default {
    getCustomerToken,
};
