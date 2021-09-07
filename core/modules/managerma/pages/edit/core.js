import React from 'react';
import Layout from '@layout';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/managerma/services/graphql';

const ContentWrapper = (props) => {
    const {
        data,
        Content,
    } = props;
    const rma = data.getRmaById;
    const [refundRma] = gqlService.refundRma();

    const handleSubmit = () => {
        const variables = {
            id: rma.id,
        };
        window.backdropLoader(true);
        refundRma({
            variables,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Success Refund!',
                variant: 'success',
            });
        }).catch((e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        });
    };

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

    const formik = useFormik({
        initialValues: {
            id: rma.id,
        },
        onSubmit: (values) => {
            handleSubmit(values);
            console.log('hasilnya: ', values);
        },
    });

    const contentProps = {
        formik, rmaDetail,
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
