import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import gqlService from '../../services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;
    const [createChannel] = gqlService.createChannel();

    const handleSubmit = ({
        code, name, notes, url, token, endPoint, deltaStock, framework, type, shipment, invoice, refund, creditmemo,
    }) => {
        const variables = {
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
        createChannel({
            variables,
        }).then((res) => {
            console.log(res);
            alert('Success create new channel');
            // need show succes message
        }).catch((e) => {
            alert(e);
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
            framework: '',
            type: '',
            shipment: '',
            invoice: '',
            refund: '',
            creditmemo: '',
        },
        validationSchema: Yup.object().shape({
            code: Yup.string().required('Required!'),
            name: Yup.string().required('Required!'),
            framework: Yup.string().required('Required!'),
            type: Yup.string().required('Required!'),
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
        <Layout>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
