import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/netsuitecourier/services/graphql';
import aclService from '@modules/theme/services/graphql';

const Core = (props) => {
    const { Content } = props;
    const router = useRouter();

    const [saveNetsuiteCourier] = gqlService.saveNetsuiteCourier();

    const handleSubmit = (values) => {
        const variables = {
            input: {
                entity_id: values?.entity_id,
                courier: values?.courier,
                delivery_method_code:
                    typeof values.delivery_method_code === 'object' ? values.delivery_method_code?.code : values.delivery_method_code,
            },
        };
        window.backdropLoader(true);
        saveNetsuiteCourier({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: 'Success edit Location',
                    variant: 'success',
                });
                setTimeout(() => router.push('/configurations/netsuitecourier'), 250);
            })
            .catch((e) => {
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
            courier: '',
            delivery_method_code: null,
        },
        validationSchema: Yup.object().shape({
            courier: Yup.string().required('Required!'),
            delivery_method_code: Yup.object().typeError('Required!').required('Required!'),
        }),
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_manage_courier',
    });

    if (aclCheckLoading) {
        return <Layout>Loading...</Layout>;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

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
