/* eslint-disable no-unused-vars */
import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/logistixprovider/services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;
    // const router = useRouter();
    // const [saveLogistixProvider] = gqlService.saveLogistixProvider();

    const handleSubmit = (input) => {
        // window.backdropLoader(true);
        // saveLogistixProvider({
        //     variables: { input },
        // }).then(() => {
        //     window.backdropLoader(false);
        //     window.toastMessage({
        //         open: true,
        //         text: 'Success create Logistix Provider!',
        //         variant: 'success',
        //     });
        //     setTimeout(() => router.push('/configurations/logistixprovider'), 250);
        // }).catch((e) => {
        //     window.backdropLoader(false);
        //     window.toastMessage({
        //         open: true,
        //         text: e.message,
        //         variant: 'error',
        //     });
        // });
    };

    const formik = useFormik({
        initialValues: {
            channel_shipping_method: '',
            provider: '',
            service: '',
        },
        validationSchema: Yup.object().shape({
            channel_shipping_method: Yup.string().required('Required!'),
            provider: Yup.string().required('Required!'),
            service: Yup.string().required('Required!'),
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
