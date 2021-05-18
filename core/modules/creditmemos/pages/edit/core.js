import React from 'react';
import Layout from '@layout';
import { useRouter } from 'next/router';
import gqlService from '../../services/graphql';

const ContentWrapper = (props) => {
    const {
        data,
        Content,
    } = props;
    const creditmemo = data.getCreditMemoById;

    const creditmemoDetail = {
        id: creditmemo.order_id,
        orderDate: creditmemo.order_date,
        name: creditmemo.bill_to_name,
        status: creditmemo.status,
        channelOrder: creditmemo.channel_order,
        billing: creditmemo.billing_address,
        shipping: creditmemo.shipping_address,
        item: creditmemo.creditmemo_items,
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
