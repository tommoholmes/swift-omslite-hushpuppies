import React from 'react';
import Layout from '@layout';
import { useRouter } from 'next/router';
import gqlService from '@modules/shipment/services/graphql';

const ContentWrapper = (props) => {
    const {
        data,
        Content,
    } = props;
    const shipment = data.getShipmentById;

    const shipmentDetail = {
        id: shipment.increment_id,
        locName: shipment.loc_code.loc_name,
        orderDate: shipment.created_at,
        lastUpdate: shipment.updated_at,
        channelOrderNumber: shipment.channel_order_increment_id,
        status: shipment.status.label,
        email: shipment.email,
        billing: shipment.billing_address,
        shipping: shipment.shipping_address,
        orderItem: shipment.order_item,
        shipMethod: shipment.channel_shipping_label || '-',
        tracking: shipment.all_track,
        statusHistory: shipment.status_history,
    };

    const contentProps = {
        shipmentDetail,
    };

    return (
        <Content {...contentProps} />
    );
};

const Core = (props) => {
    const router = useRouter();
    const { loading, data } = gqlService.getShipmentById({
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
