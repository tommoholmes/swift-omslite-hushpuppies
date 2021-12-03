/* eslint-disable prefer-destructuring */
import gqlService from '@modules/forgotpassword/services/graphql';
import { useRouter } from 'next/router';
import Layout from '@layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect } from 'react';

const Core = (props) => {
    const { Content } = props;
    const router = useRouter();
    const { token, email } = router.query;
    const [setNewPassword] = gqlService.setNewPassword();

    useEffect(() => {
        if (!token || !email) {
            router.push('/login');
        }
    }, [token, email]);

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
            password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
        }),
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
                        text: 'success set new password',
                    });
                    setTimeout(() => router.push('/login'), 2000);
                })
                .catch((e) => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        variant: 'error',
                        text: e.message.split(':')[0],
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
