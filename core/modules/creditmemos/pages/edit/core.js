import React from 'react';
import Layout from '@layout';
import { useRouter } from 'next/router';
import gqlService from '@modules/creditmemos/services/graphql';

const ContentWrapper = (props) => {
    const {
        data,
        Content,
    } = props;
    const creditmemo = data.getCreditMemoById;

    const creditmemoDetail = {
        id: creditmemo.order_increment_id,
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
        creditmemoDetail,
    };

    return (
        <Content {...contentProps} />
    );
};

const Core = (props) => {
    const router = useRouter();
    const { loading, data } = gqlService.getCreditMemoById({
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
