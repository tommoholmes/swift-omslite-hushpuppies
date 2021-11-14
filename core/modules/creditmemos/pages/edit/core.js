import React from 'react';
import Layout from '@layout';
import { useRouter } from 'next/router';
import gqlService from '@modules/creditmemos/services/graphql';

const ContentWrapper = (props) => {
    const {
        data,
        Content,
    } = props;
    const { creditmemo, order } = data.getCreditMemoById;

    const creditmemoDetail = {
        entityId: order.entity_id,
        status: order.status,
        statusLabel: order.statusLabel,
        channelName: order.channel_name,
        channelCode: order.channel_code,
        orderNumber: order.channel_order_increment_id,
        orderDate: order.channel_order_date,
        customerName: order.customer_name,
        customerEmail: order.customer_email,
        customerGroup: order.customer_group,
        billing: order.billing_address,
        shipping: order.shipping_address,
        paymentMethod: order.channel_payment_method,
        shippingMethod: order.channel_shipping_method,
        items: creditmemo.items,
        subtotal: creditmemo.subtotal,
        discount: creditmemo.discount,
        refundShipping: creditmemo.shipping_amount,
        adjustRefund: creditmemo.adjustment_refund,
        adjustFee: creditmemo.adjustment_fee,
        grandTotal: creditmemo.grand_total,
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
