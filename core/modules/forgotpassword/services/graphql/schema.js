import { gql } from '@apollo/client';

export const requestResetPassword = gql`
    mutation requestResetPassword($email: String!, $callback_url: String!, $g_recaptcha_response: String!) {
        requestResetPassword(email: $email, callback_url: $callback_url, g_recaptcha_response: $g_recaptcha_response)
    }
`;

export const setNewPassword = gql`
    mutation setNewPassword($input: NewPasswordInput!) {
        setNewPassword(input: $input)
    }
`;

export const getStoreConfigCaptchaSiteKey = gql`
    query {
        getStoreConfig(path: "msp_securitysuite_recaptcha/general/public_key")
    }
`;

export default {
    requestResetPassword,
    setNewPassword,
    getStoreConfigCaptchaSiteKey,
};
