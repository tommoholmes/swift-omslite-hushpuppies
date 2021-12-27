import React from 'react';
import Layout from '@layout';
import { useRouter } from 'next/router';
import gqlService from '@modules/marketplacebrand/services/graphql';
import aclService from '@modules/theme/services/graphql';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const ContentWrapper = (props) => {
    const { Content, data } = props;
    const router = useRouter();

    const { loading: loadingOptions, data: dataOptions } = gqlService.getMarketplaceDefaultShippingMethods({
        marketplace_code: data[0].marketplace_code,
    });
    const [saveMarketplaceCredentials] = gqlService.saveMarketplaceCredentials();

    const handleSubmit = (input) => {
        window.backdropLoader(true);
        saveMarketplaceCredentials({
            variables: {
                store_detail_id: Number(router.query.store_id),
                input,
            },
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

    const initValues = () => {
        const init = [];
        const valid = [];
        data.map((cred) => {
            if (cred.data_type === 'default_shipping_method') {
                valid.push([cred.type, Yup.number().required('This field is Required!')]);
            } else {
                valid.push([cred.type, Yup.string().required('This field is Required!')]);
            }
            return (
                init.push([cred.type, cred.value])
            );
        });
        return {
            init: Object.fromEntries(init),
            valid: Object.fromEntries(valid),
        };
    };

    const formik = useFormik({
        initialValues: {
            ...initValues().init,
        },
        validationSchema: Yup.object().shape({
            ...initValues().valid,
        }),
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const contentProps = {
        data,
        dataOptions,
        loadingOptions,
        formik,
    };
    return (
        <Content {...contentProps} {...props} />
    );
};

const Core = (props) => {
    const router = useRouter();
    const { loading, data } = gqlService.getMarketplaceCredentials({
        store_detail_id: router && router.query && Number(router.query.store_id),
    });
    const pageConfig = {
        title: 'Manage Marketplace ',
    };

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_header_mpadapter',
    });

    if (loading || aclCheckLoading) {
        return (
            <Layout>Loading...</Layout>
        );
    }

    if (!data || !(data && data.getMarketplaceCredentials && data.getMarketplaceCredentials.length)) {
        return (
            <Layout pageConfig={pageConfig}>Data not found!</Layout>
        );
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const contentProps = {
        data: data.getMarketplaceCredentials,
    };

    return (
        <Layout pageConfig={pageConfig}>
            <ContentWrapper {...contentProps} {...props} />
        </Layout>
    );
};

export default Core;
