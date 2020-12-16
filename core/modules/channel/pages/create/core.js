import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '../../services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;
    const router = useRouter();
    const [createChannel] = gqlService.createChannel();

    const handleSubmit = ({
        code,
        name,
        notes,
        url,
        token,
        endPoint,
        deltaStock,
        framework,
        type,
        virtualStock,
        shipment,
        invoice,
        refund,
        creditmemo,
    }) => {
        const variables = {
            channel_code: code,
            channel_name: name,
            notes,
            channel_url: url,
            token,
            end_point: endPoint,
            delta_stock_url: deltaStock,
            framework: framework.name,
            rule_type: type.name,
            virtual_stock: virtualStock.map((e) => ({ vs_id: e.vs_id })),
            webhook_shipment_complete: shipment,
            webhook_invoice: invoice,
            webhook_rma_refund: refund,
            webhook_creditmemo: creditmemo,
        };
        window.backdropLoader(true);
        createChannel({
            variables,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Success create new channel!',
                variant: 'success',
            });
            setTimeout(() => router.push('/oms/channel'), 250);
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
            code: '',
            name: '',
            notes: '',
            url: '',
            token: '',
            endPoint: '',
            deltaStock: '',
            framework: { id: 0, name: 'M1' },
            type: { id: 0, name: 'Default' },
            virtualStock: [],
            shipment: '',
            invoice: '',
            refund: '',
            creditmemo: '',
        },
        validationSchema: Yup.object().shape({
            code: Yup.string().required('Required!'),
            name: Yup.string().required('Required!'),
            framework: Yup.object().required('Required!'),
            type: Yup.object().required('Required!'),
            virtualStock: Yup.array().nullable(),
            notes: Yup.string().nullable(),
            url: Yup.string().nullable(),
            token: Yup.string().nullable(),
            endPoint: Yup.string().nullable(),
            deltaStock: Yup.string().nullable(),
            shipment: Yup.string().nullable(),
            invoice: Yup.string().nullable(),
            refund: Yup.string().nullable(),
            creditmemo: Yup.string().nullable(),
        }),
        onSubmit: (values) => {
            handleSubmit(values);
            // console.log(values);
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
