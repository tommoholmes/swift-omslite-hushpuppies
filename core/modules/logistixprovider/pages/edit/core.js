import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/logistixprovider/services/graphql';

const ContentWrapper = (props) => {
    const {
        data,
        Content,
    } = props;
    const router = useRouter();
    const logistixDetail = data.getLogistixProviderById;
    const [saveLogistixProvider] = gqlService.saveLogistixProvider();

    const handleSubmit = (input) => {
        window.backdropLoader(true);
        saveLogistixProvider({
            variables: { input },
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Success edit Logistix Provider!',
                variant: 'success',
            });
            setTimeout(() => router.push('/configurations/logistixprovider'), 250);
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
            entity_id: Number(logistixDetail.entity_id),
            channel_shipping_method: logistixDetail.channel_shipping_method,
            provider: logistixDetail.provider,
            service: logistixDetail.service,
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
        logistixDetail,
        formik,
    };

    return (
        <Content {...contentProps} />
    );
};

const Core = (props) => {
    const router = useRouter();
    const { loading, data } = gqlService.getLogistixProviderById({
        id: router && router.query && Number(router.query.id),
    });

    if (loading) {
        return (
            <Layout>
                <div style={{
                    display: 'flex',
                    color: '#435179',
                    fontWeight: 600,
                    justifyContent: 'center',
                    padding: '20px 0',
                }}
                >
                    Loading...
                </div>

            </Layout>
        );
    }

    if (!data) {
        return (
            <Layout>Data not found!</Layout>
        );
    }

    return (
        <Layout>
            <ContentWrapper data={data} {...props} />
        </Layout>
    );
};

export default Core;
