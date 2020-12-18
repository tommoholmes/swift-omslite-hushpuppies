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
    const orderqueue = data.getOrderQueueById;
    const [setReallocation] = gqlService.setReallocation();

    const handleSubmit = ({
        type,
    }) => {
        const variables = {
            id: orderqueue.id,
            type,
        };
        setReallocation({
            variables,
        }).then((res) => {
            console.log(res);
            alert('Success edit Channel');
            // need show succes message
        }).catch((e) => {
            alert(e);
        });
    };

    const orderQueue = {
        lastUpdated: orderqueue.last_updated,
        status: orderqueue.status,
        channelOrderId: orderqueue.channel_order_increment_id,
        channelCode: orderqueue.channel_code,
        email: orderqueue.email,
        customerGroup: orderqueue.customer_group,
        firstname: orderqueue.billing_address.firstname,
        lastname: orderqueue.billing_address.lastname,
        street: orderqueue.billing_address.street,
        city: orderqueue.billing_address.city,
        region: orderqueue.billing_address.region,
        postcode: orderqueue.billing_address.postcode,
        countryId: orderqueue.billing_address.country_id,
        telephone: orderqueue.billing_address.telephone,
        firstnameShip: orderqueue.shipping_address.firstname,
        lastnameShip: orderqueue.shipping_address.lastname,
        streetShip: orderqueue.shipping_address.street,
        cityShip: orderqueue.shipping_address.city,
        regionShip: orderqueue.shipping_address.region,
        postcodeShip: orderqueue.shipping_address.postcode,
        countryIdShip: orderqueue.shipping_address.country_id,
        telephoneShip: orderqueue.shipping_address.telephone,
        channelPaymentMethod: orderqueue.channel_payment_method,
        channelShippingMethod: orderqueue.channel_shipping_method,
        orderItem: orderqueue.order_item,
        errorLog: orderqueue.error_log,
        grandTotal: orderqueue.channel_grand_total,
    };

    const formikAllocation = useFormik({
        initialValues: {
            type: 'allocation',
        },
        validationSchema: Yup.object().shape({
            type: Yup.string().nullable().required('Required!'),
        }),
        onSubmit: (values) => {
            handleSubmit(values);
            console.log(values);
        },
    });

    const formikNew = useFormik({
        initialValues: {
            type: 'new',
        },
        validationSchema: Yup.object().shape({
            type: Yup.string().nullable().required('Required!'),
        }),
        onSubmit: (values) => {
            handleSubmit(values);
            console.log(values);
        },
    });

    const contentProps = {
        formikAllocation,
        formikNew,
        orderQueue,
    };

    return (
        <Content {...contentProps} />
    );
};

const Core = (props) => {
    const router = useRouter();
    const { loading, data } = gqlService.getOrderQueueById({
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
