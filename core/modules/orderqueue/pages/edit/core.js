import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/orderqueue/services/graphql';

const ContentWrapper = (props) => {
    const {
        data,
        Content,
        parent,
        aclCheckData,
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
        window.backdropLoader(true);
        setReallocation({
            variables,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Success edit order status',
                variant: 'success',
            });
            setTimeout(() => window.location.reload(true), 250);
        }).catch((e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        });
    };

    const orderQueue = {
        id: orderqueue.id,
        lastUpdated: orderqueue.last_updated,
        createdAt: orderqueue.created_at,
        status: orderqueue.status,
        channelOrderId: orderqueue.channel_order_increment_id,
        channelCode: orderqueue.channel_code,
        acceptanceDeadline: orderqueue.acceptance_deadline,
        email: orderqueue.email,
        customerGroup: orderqueue.customer_group,
        custom_order_attributes: JSON.parse(orderqueue.custom_order_attributes),
        billing: orderqueue.billing_address,
        shipping: orderqueue.shipping_address,
        channelPaymentMethod: orderqueue.channel_payment_method,
        channelShippingMethod: orderqueue.channel_shipping_method,
        channelName: orderqueue.channel_name,
        orderItem: orderqueue.order_item,
        errorLog: orderqueue.error_log,
        shippingCost: orderqueue.channel_shipping_cost,
        grandTotal: orderqueue.channel_grand_total,
        isAllowReallocate: orderqueue.is_allow_to_reallocate_order,
        isAllowRecreate: orderqueue.is_allow_to_recreate_order,
        notes: orderqueue.notes,
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
        },
    });

    const contentProps = {
        formikAllocation,
        formikNew,
        orderQueue,
        parent,
        aclCheckData,
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

    const { loading: aclCheckLoading, data: aclCheckData } = gqlService.isAccessAllowed({
        acl_code: 'sales_order_queue_edit_replacement',
    });

    if (loading || aclCheckLoading) {
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
            <ContentWrapper
                data={data}
                aclCheckData={aclCheckData}
                parent={router && router.query && router.query.tab_status}
                {...props}
            />
        </Layout>
    );
};

export default Core;
