import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/promotion/services/graphql';
import aclService from '@modules/theme/services/graphql';

const ContentWrapper = (props) => {
    const {
        Content,
    } = props;
    const router = useRouter();
    const [addPromotion] = gqlService.addPromotion();

    const handleSubmit = (value) => {
        const variables = {
            ...value,
        };
        window.backdropLoader(true);
        addPromotion({
            variables,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Success Add New Promotion!',
                variant: 'success',
            });
            setTimeout(() => router.push('/marketing/promotion'), 250);
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
            sku: [''],
            qty: [''],
        },
        validationSchema: Yup.object().shape({}),
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const contentProps = {
        formik,
        ...props,
    };

    return (
        <Content {...contentProps} />
    );
};

const Core = (props) => {
    const { loading: loadingCompany, data: dataCompany } = gqlService.getCompanyOptions();
    const { loading: loadingLocation, data: dataLocation } = gqlService.getLocationOptions();
    const { loading: loadingChannel, data: dataChannel } = gqlService.getChannelOptions();

    const router = useRouter();
    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_promotion',
    });

    if (loadingCompany || loadingLocation || loadingChannel || aclCheckLoading) {
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

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const contentProps = {
        dataCompany: dataCompany.getCompanyOptions,
        dataLocation: dataLocation.getLocationOptions,
        dataChannel: dataChannel.getChannelOptions,
    };

    return (
        <Layout>
            <ContentWrapper {...contentProps} {...props} />
        </Layout>
    );
};

export default Core;
