/* eslint-disable prefer-destructuring */
import gqlService from '@modules/forgotpassword/services/graphql';
import { useRouter } from 'next/router';
import Layout from '@layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect } from 'react';

const Core = (props) => {
    const { Content, storeLogo } = props;
    const router = useRouter();
    const { token, email } = router.query;
    const [setNewPassword] = gqlService.setNewPassword();
    const { error } = gqlService.validateResetPasswordLinkToken({
        token,
    });

    useEffect(() => {
        if (!token || !email) {
            router.push('/login');
        }
        if (email) {
            Yup.string()
                .email()
                .isValid(email)
                .then((isValid) => {
                    if (!isValid) {
                        router.push('/login');
                    }
                });
        }

        if (error) {
            window.toastMessage({
                open: true,
                variant: 'error',
                text: error.message,
            });
            setTimeout(() => router.push('/login'), 2500);
        }
    }, [token, email, error]);

    const formik = useFormik({
        initialValues: {
            token: token ?? '',
            email: email ?? '',
            password: '',
            password_confirmation: '',
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email().required('Required!'),
            token: Yup.string().required('Required!'),
            password: Yup.string().required('Required!'),
            password_confirmation: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Passwords must match'),
        }),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (values) => {
            const variables = { input: { ...values } };

            window.backdropLoader(true);
            setNewPassword({
                variables,
            })
                .then(() => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        variant: 'success',
                        text: 'You updated your password.',
                    });
                    setTimeout(() => router.push('/login'), 1500);
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
        storeLogo,
    };

    const pageConfig = {
        header: false,
        sidebar: false,
        title: 'Set New Password',
    };

    return (
        <Layout pageConfig={pageConfig}>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
