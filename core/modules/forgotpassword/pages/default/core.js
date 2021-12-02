/* eslint-disable prefer-destructuring */
import gqlService from '@modules/forgotpassword/services/graphql';
import { useRouter } from 'next/router';
import Layout from '@layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Core = (props) => {
    const { Content } = props;
    const router = useRouter();
    const [requestResetPassword] = gqlService.requestResetPassword();

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email().required('Required!'),
        }),
        onSubmit: (values) => {
            const variables = { email: values.email };
            window.backdropLoader(true);
            requestResetPassword({
                variables,
            })
                .then(() => {
                    window.backdropLoader(false);
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
