import { gql } from '@apollo/client';

export const requestResetPassword = gql`
    mutation requestResetPassword($email: String!) {
        requestResetPassword(email: $email)
    }
`;

export const setNewPassword = gql`
    mutation setNewPassword($input: NewPasswordInput!) {
        setNewPassword(input: $input)
    }
`;

export default {
    requestResetPassword,
    setNewPassword,
};
