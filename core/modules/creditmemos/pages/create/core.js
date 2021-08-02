/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

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
    const router = useRouter();
    const creditmemo = data.getCreditMemoById;
    const [createCreditmemo] = gqlService.createCreditmemo();

    const handleSubmit = ({
        refundShip,
        adjustRefund,
        adjustFee,
    }) => {
        const variables = {
            shipping_amount: Number(refundShip),
            adjustment_positive: Number(adjustRefund),
            adjustment_negative: Number(adjustFee),
        };
        window.backdropLoader(true);
        createCreditmemo({
            variables,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Success Create New Memo!',
                variant: 'success',
            });
            // setTimeout(() => router.push('/oms/company'), 250);
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
            refundShip: 0,
            adjustRefund: 0,
            adjustFee: 0,
        },
        validationSchema: Yup.object().shape({
            refundShip: Yup.number(),
            adjustRefund: Yup.number(),
            adjustFee: Yup.number(),
        }),
        onSubmit: (values) => {
            // handleSubmit(values);
            console.log(values);
        },
    });

    const creditmemoDetail = {
        // id: creditmemo.order_increment_id,
        id: 14,
        orderDate: creditmemo.order_created_at,
        name: creditmemo.customer_name,
        status: creditmemo.order_status,
        email: creditmemo.email,
        channelOrder: creditmemo.channel_order_increment_id,
        group: creditmemo.customer_group,
        channelName: creditmemo.channel_name,
        billing: creditmemo.billing_address,
        shipping: creditmemo.shipping_address,
        paymentMethod: creditmemo.payment_method,
        shippingMethod: creditmemo.shipping_method,
        shippingAmount: creditmemo.shipping_amount,
        item: creditmemo.creditmemo_items,
        subtotal: creditmemo.base_subtotal,
        discount: creditmemo.discount_amount,
        adjustRefund: creditmemo.base_adjustment_positive || 0,
        adjustFee: creditmemo.base_adjustment_negative || 0,
        grandTotal: creditmemo.base_grand_total,
    };

    const contentProps = {
        formik,
        creditmemoDetail,
    };

    return (
        <Content {...contentProps} />
    );
};

const Core = (props) => {
    const router = useRouter();
    const { loading, data } = gqlService.getCreditMemoById({
        // id: router && router.query && Number(router.query.id),
        id: 14,
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
