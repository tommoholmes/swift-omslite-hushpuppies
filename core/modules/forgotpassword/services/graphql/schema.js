import { gql } from '@apollo/client';

export const requestResetPassword = gql`
    mutation requestResetPassword($email: String!, $callback_url: String!) {
        requestResetPassword(email: $email, callback_url: $callback_url)
    }
`;

export const setNewPassword = gql`
    mutation setNewPassword($input: NewPasswordInput!) {
        setNewPassword(input: $input)
    }
`;

export const validateResetPasswordLinkToken = gql`
    query validateResetPasswordLinkToken($token: String!) {
        validateResetPasswordLinkToken(token: $token)
    }
`;

export default {
    requestResetPassword,
    setNewPassword,
    validateResetPasswordLinkToken,
};
