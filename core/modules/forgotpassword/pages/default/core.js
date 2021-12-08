/* eslint-disable prefer-destructuring */
import gqlService from '@modules/forgotpassword/services/graphql';
import { useRouter } from 'next/router';
import Layout from '@layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const URL_SET_NEW_PASSWORD = '/forgotpassword/createnewpassword';

const Core = (props) => {
    const { Content } = props;
    const router = useRouter();
    const [requestResetPassword] = gqlService.requestResetPassword();

    const formik = useFormik({
        initialValues: {
            email: '',
            g_recaptcha_response: '',
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email().required('Required!'),
            g_recaptcha_response: Yup.string().typeError('Required!').required('Required!'),
        }),
        onSubmit: async (values) => {
            const variables = {
                email: values.email,
                callback_url: `${window.location.origin}${URL_SET_NEW_PASSWORD}`,
            };
            window.backdropLoader(true);

            try {
                const res = await fetch('/captcha-validation', {
                    method: 'POST',
                    headers: new Headers({ 'content-type': 'application/json' }),
                    body: JSON.stringify({ response: values.g_recaptcha_response }),
                });
                const resJson = await res.json();
                if (!resJson.success) {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        variant: 'error',
                        text: 'Invalid captcha!',
                    });
                    return;
                }
            } catch (e) {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    variant: 'error',
                    text: e.message,
                });
            }

            requestResetPassword({
                variables,
            })
                .then(() => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        variant: 'success',
                        text: `If there is an account associated with ${values.email} you will receive an email with a link to reset your password.`,
                    });
                    setTimeout(() => router.push('/login'), 2000);
                })
                .catch((e) => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        variant: 'error',
                        text: e.message,
                    });
                });
        },
    });

    const contentProps = {
        formik,
    };

    const pageConfig = {
        header: false,
        sidebar: false,
    };

    return (
        <Layout pageConfig={pageConfig}>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
