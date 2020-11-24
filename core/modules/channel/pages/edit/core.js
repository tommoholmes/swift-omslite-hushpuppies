import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '../../services/graphql';

const ContentWrapper = (props) => {
    const {
        data,
        Content,
    } = props;
    const channel = data.getChannelById;
    const [updateChannel] = gqlService.updateChannel();

    const handleSubmit = ({
        code, name, notes, url, token, endPoint, deltaStock, framework, type, shipment, invoice, refund, creditmemo,
    }) => {
        const variables = {
            id: channel.channel_id,
            channel_code: code,
            channel_name: name,
            notes,
            channel_url: url,
            token,
            end_point: endPoint,
            delta_stock_url: deltaStock,
            framework,
            rule_type: type,
            webhook_shipment_complete: shipment,
            webhook_invoice: invoice,
            webhook_rma_refund: refund,
            webhook_creditmemo: creditmemo,
        };
        updateChannel({
            variables,
        }).then((res) => {
            console.log(res);
            alert('Success edit Channel');
            // need show succes message
        }).catch((e) => {
            alert(e);
        });
    };

    const formik = useFormik({
        initialValues: {
            code: channel.channel_code || '',
            name: channel.channel_name || '',
            notes: channel.notes || '',
            url: channel.channel_url || '',
            token: channel.token || '',
            endPoint: channel.end_point || '',
            deltaStock: channel.delta_stock_url || '',
            framework: channel.framework || '',
            type: channel.rule_type || '',
            shipment: channel.webhook_shipment_complete || '',
            invoice: channel.webhook_invoice || '',
            refund: channel.webhook_rma_refund || '',
            creditmemo: channel.webhook_creditmemo || '',
        },
        validationSchema: Yup.object().shape({
            code: Yup.string().nullable().required('Required!'),
            name: Yup.string().nullable().required('Required!'),
            framework: Yup.string().nullable().required('Required!'),
            type: Yup.string().nullable().required('Required!'),
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
    const { loading, data } = gqlService.getChannelById({
        id: router && router.query && Number(router.query.id),
    });

    if (loading) {
        return (
            <Layout>Loading...</Layout>
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
