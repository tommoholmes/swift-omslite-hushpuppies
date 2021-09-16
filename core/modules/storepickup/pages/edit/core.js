/* eslint-disable no-use-before-define */
import React from 'react';
import Layout from '@layout';
// import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/storepickup/services/graphql';

const ContentWrapper = (props) => {
    const {
        data,
        Content,
    } = props;
    const storepickup = data.getShipmentById;

    const storePickup = {
        id: storepickup.increment_id,
        orderNumber: storepickup.channel_order_increment_id,
    };

    const contentProps = {
        storePickup,
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
