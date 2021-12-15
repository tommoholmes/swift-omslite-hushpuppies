import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/overridestock/services/graphql';
import aclService from '@modules/theme/services/graphql';

const ContentWrapper = (props) => {
    const {
        data,
        Content,
    } = props;
    const router = useRouter();
    const overrideStock = data.getVirtualStockQuantityById;
    const [updateVirtualStockQuantity] = gqlService.updateVirtualStockQuantity();

    const handleSubmit = ({
        virtualStock,
        sku,
        qty,
        reason,
    }) => {
        const variables = {
            id: overrideStock.entity_id,
            vs_id: Number(virtualStock.vs_id),
            sku: sku.sku,
            qty: Number(qty),
            reason,
        };
        window.backdropLoader(true);
        updateVirtualStockQuantity({
            variables,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Success edit Override Stock!',
                variant: 'success',
            });
            setTimeout(() => router.push('/cataloginventory/overridestock'), 250);
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
            virtualStock: overrideStock.vs_id,
            sku: {
                sku: overrideStock.sku,
            },
            qty: overrideStock.qty,
            reason: overrideStock.reason,
        },
        validationSchema: Yup.object().shape({
            virtualStock: Yup.object().required('Required!'),
            sku: Yup.object().required('Required!'),
            qty: Yup.number().nullable(),
            reason: Yup.string().nullable(),
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
    const { loading, data } = gqlService.getVirtualStockQuantityById({
        id: router && router.query && Number(router.query.id),
    });

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_override_stock',
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
