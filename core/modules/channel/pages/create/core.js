import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/channel/services/graphql';
import { optionsYesNo } from '@modules/channel/helpers';

const Core = (props) => {
    const { Content } = props;
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
        auto_confirm_shipment,
        prio_one_store,
        split_prio_one_store,
        release_stock,
        webhook_vendor_salesrule,
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
            auto_confirm_shipment: auto_confirm_shipment.id ?? 0,
            prio_one_store: prio_one_store.id ?? 0,
            split_prio_one_store: split_prio_one_store.id ?? 0,
            release_stock: release_stock.map((val) => val.value).toString(),
            webhook_vendor_salesrule,
        };
        window.backdropLoader(true);
        createChannel({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: 'Success create new channel!',
                    variant: 'success',
                });
                setTimeout(() => router.push('/oms/channel'), 250);
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
            auto_confirm_shipment: optionsYesNo[0],
            prio_one_store: optionsYesNo[0],
            split_prio_one_store: optionsYesNo[0],
            release_stock: [],
            webhook_vendor_salesrule: '',
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
            auto_confirm_shipment: Yup.object().nullable(),
            prio_one_store: Yup.object().nullable(),
            split_prio_one_store: Yup.object().nullable(),
            release_stock: Yup.string().nullable(),
            webhook_vendor_salesrule: Yup.string().nullable(),
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
