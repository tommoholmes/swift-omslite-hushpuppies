import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/shippingcompany/services/graphql';
import aclService from '@modules/theme/services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;
    const router = useRouter();
    const [createShippingCompany] = gqlService.createShippingCompany();

    const handleSubmit = ({
        companyId,
        brand,
        shippingMethod,
        isActive,
    }) => {
        const variables = {
            company_id: Number(companyId),
            brand,
            shipping_method: shippingMethod,
            is_active: isActive.id,
        };
        window.backdropLoader(true);
        createShippingCompany({
            variables,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Success create new shipping company!',
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
            companyId: '',
            brand: '',
            shippingMethod: '',
            isActive: { id: 0, name: 'No' },
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

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_tada_shipping_company',
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
