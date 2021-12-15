import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import gqlService from '@modules/orderqueue/services/graphql';
import aclService from '@modules/theme/services/graphql';
import { useRouter } from 'next/router';

const Core = (props) => {
    const {
        Content,
    } = props;

    const pageConfig = {
        title: 'Fetch Order',
    };

    const [marketplaceFetchOrder] = gqlService.marketplaceFetchOrder();

    const handleSubmit = (input, resetForm) => {
        const variables = { input };
        window.backdropLoader(true);
        marketplaceFetchOrder({
            variables,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Order successfully fetched. Please wait for at least 15 minutes for order to sync',
                variant: 'success',
            });
            resetForm();
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
            start_date: '',
            end_date: '',
        },
        validationSchema: Yup.object().shape({
            start_date: Yup.string().required('Required!'),
            end_date: Yup.string().required('Required!'),
        }),
        onSubmit: (values, { resetForm }) => {
            handleSubmit(values, resetForm);
        },
    });

    const router = useRouter();
    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_sales_order_queue',
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
        <Layout pageConfig={pageConfig}>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
