import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/marketplacebrand/services/graphql';

const Core = (props) => {
    const { Content } = props;
    const router = useRouter();
    const [registerMarketplaceBrand] = gqlService.registerMarketplaceBrand();

    const handleSubmit = (variables) => {
        window.backdropLoader(true);
        registerMarketplaceBrand({
            variables,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Success create user!',
                variant: 'success',
            });
            setTimeout(() => router.push('/configurations/marketplacebrand'), 250);
        }).catch((e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        });
    };

    const formik = useFormik({
        initialValues: {
            brand_id: '',
            brand_name: '',
        },
        validationSchema: Yup.object().shape({
            brand_id: Yup.string().required('Required!'),
            brand_name: Yup.string().required('Required!'),
        }),
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const contentProps = {
        formik,
    };

    return (
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;