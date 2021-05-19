import React from 'react';
import Layout from '@layout';
import { useRouter } from 'next/router';
import gqlService from '../../services/graphql';

const ContentWrapper = (props) => {
    const {
        data,
        Content,
    } = props;
    const rma = data.getRmaById;

    const rmaDetail = {
        id: rma.id,
        status: rma.status_code,
        name: rma.customer_name,
        createdAt: rma.created_at,
        email: rma.customer_email,
        updatedAt: rma.updated_at,
        channelOrder: rma.channel_order_increment_id,
        return: rma.return_type,
        item: rma.rma_item,
        message: rma.message,
    };

    const contentProps = {
        rmaDetail,
    };

    return (
        <Content {...contentProps} />
    );
};

const Core = (props) => {
    const router = useRouter();
    const { loading, data } = gqlService.getRmaById({
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
