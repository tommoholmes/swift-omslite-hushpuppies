import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { optionsIsActive } from '@modules/shippingcompany/helpers';
import gqlService from '@modules/shippingcompany/services/graphql';
import aclService from '@modules/theme/services/graphql';

const ContentWrapper = (props) => {
    const {
        data,
        Content,
    } = props;
    const router = useRouter();
    const shippingCompany = data.getShippingCompanyById;
    const [updateShippingCompany] = gqlService.updateShippingCompany();

    const handleSubmit = ({
        companyId,
        brand,
        shippingMethod,
        isActive,
    }) => {
        const variables = {
            id: shippingCompany.id,
            company_id: Number(companyId),
            brand,
            shipping_method: shippingMethod,
            is_active: isActive.id,
        };
        window.backdropLoader(true);
        updateShippingCompany({
            variables,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Success edit shipping company!',
                variant: 'success',
            });
            setTimeout(() => router.push('/tada/shippingcompany'), 250);
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
            username: shippingCompany.username || '',
            companyId: shippingCompany.company_id,
            brand: shippingCompany.brand,
            shippingMethod: shippingCompany.shipping_method,
            isActive: optionsIsActive.find((e) => e.id === shippingCompany.is_active),
        },
        validationSchema: Yup.object().shape({
            companyId: Yup.number().required('Required!'),
            brand: Yup.string().required('Required!'),
            shippingMethod: Yup.string().required('Required!'),
            isActive: Yup.object().required('Required!'),
        }),
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const contentProps = {
        formik,
    };

    return (
        <Content {...contentProps} />
    );
};

const Core = (props) => {
    const router = useRouter();
    const { loading, data } = gqlService.getShippingCompanyById({
        id: router && router.query && Number(router.query.id),
    });

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_tada_shipping_company',
    });

    if (loading || aclCheckLoading) {
        return (
            <Layout>Loading...</Layout>
        );
    }

    if (!data) {
        return (
            <Layout>Data not found!</Layout>
        );
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    return (
        <Layout>
            <ContentWrapper data={data} {...props} />
        </Layout>
    );
};

export default Core;
