import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/overridestock/services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;
    const router = useRouter();
    const [createVirtualStockQuantity] = gqlService.createVirtualStockQuantity();

    const handleSubmit = ({
        virtualStock,
        sku,
        qty,
        reason,
    }) => {
        const variables = {
            vs_id: Number(virtualStock.vs_id),
            sku: sku.sku,
            qty: Number(qty),
            reason,
        };
        window.backdropLoader(true);
        createVirtualStockQuantity({
            variables,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Success create Override Stock!',
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
            virtualStock: {
                vs_name: '--Select Virtual Stock---',
            },
            sku: '',
            qty: '',
            reason: '',
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
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
