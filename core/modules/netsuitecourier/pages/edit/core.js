import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/netsuitecourier/services/graphql';
import aclService from '@modules/theme/services/graphql';

const ContentWrapper = (props) => {
    const { data, Content } = props;
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
            courier: data?.courier ?? '',
            delivery_method_code: data?.delivery_method ? { code: data?.code, delivery_method: `${data?.delivery_method} (${data?.code})` } : null,
            entity_id: data?.entity_id ?? '',
        },
        validationSchema: Yup.object().shape({
            courier: Yup.string().required('Required!'),
            delivery_method_code: Yup.object().typeError('Required!').required('Required!'),
        }),
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const contentProps = {
        formik,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const router = useRouter();
    const { loading, data } = gqlService.getNetsuiteCourierById({
        id: router && router.query && Number(router.query.id),
    });

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_manage_courier',
    });

    if (loading || aclCheckLoading) {
        return <Layout>Loading...</Layout>;
    }

    if (!data) {
        window.toastMessage({
            open: true,
            text: 'Data not found!',
            variant: 'error',
        });
        setTimeout(() => {
            router.push('/configurations/netsuitecourier');
        }, 1000);
        return (
            <Layout>
                <div
                    style={{
                        display: 'flex',
                        color: '#435179',
                        fontWeight: 600,
                        justifyContent: 'center',
                        padding: '20px 0',
                    }}
                >
                    Data not found!
                </div>
            </Layout>
        );
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    return (
        <Layout>
            <ContentWrapper data={data && data.getNetsuiteCourierById} {...props} />
        </Layout>
    );
};

export default Core;
