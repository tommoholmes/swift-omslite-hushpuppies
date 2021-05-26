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
        firstname: rma.shipping_address.firstname,
        lastname: rma.shipping_address.lastname,
        street: rma.shipping_address.street,
        city: rma.shipping_address.city,
        region: rma.shipping_address.region,
        postcode: rma.shipping_address.postcode,
        country: rma.shipping_address.country_id,
        telephone: rma.shipping_address.telephone,
        channelOrder: rma.channel_order_increment_id,
        return: rma.return_type,
        refund: rma.refund_type,
        package: rma.package_received,
        creditmemo: rma.creditmemo,
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
