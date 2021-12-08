import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/orderqueue/services/graphql';

const ContentWrapper = (props) => {
    const {
        data, Content, parent, aclCheckData, refetchOrderQueue,
    } = props;
    const orderqueue = data.getOrderQueueById;
    const [setReallocation] = gqlService.setReallocation();
    const [editOrderItem] = gqlService.editOrderItem();

    const handleSubmit = ({ type }) => {
        const variables = {
            id: orderqueue.id,
            type,
        };
        window.backdropLoader(true);
        setReallocation({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: 'Success edit order status',
                    variant: 'success',
                });
                setTimeout(() => window.location.reload(true), 250);
            })
            .catch((e) => {
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

    const initialValueEditItem = {
        order_id: orderqueue.id,
        order_items: orderqueue.order_item.map((item) => ({ ...item, item_id_replacement: null })),
    };

    const handleSubmitEdit = (values) => {
        window.backdropLoader(true);
        const fixValues = {
            ...values,
            order_items: values.order_items.map((item) => ({
                id: item?.id ?? null,
                qty: item.qty,
                replacement_for_sku: item.replacement_for?.sku ?? item.replacement_for,
                item_id_replacement: item.item_id_replacement,
                sku: item.name?.sku ?? item.sku,
            })),
        };

        editOrderItem({
            variables: {
                ...fixValues,
            },
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: 'Success edit order item',
                    variant: 'success',
                });
                setTimeout(() => refetchOrderQueue(), 1000);
            })
            .catch((e) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
            });
    };

    const contentProps = {
        formikAllocation,
        formikNew,
        orderQueue,
        parent,
        aclCheckData,
        initialValueEditItem,
        handleSubmitEdit,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const router = useRouter();
    const { loading, data, refetch: refetchOrderQueue } = gqlService.getOrderQueueById({
        id: router && router.query && Number(router.query.id),
    });

    const { loading: aclCheckLoading, data: aclCheckData } = gqlService.isAccessAllowed({
        acl_code: 'sales_order_queue_edit_replacement',
    });

    const pageConfig = {
        title: `Detail Order #${router.query?.id}`,
    };

    if (loading || aclCheckLoading) {
        return <Layout pageConfig={pageConfig}>Loading...</Layout>;
    }

    if (!data) {
        return <Layout pageConfig={pageConfig}>Data not found!</Layout>;
    }

    return (
        <Layout pageConfig={pageConfig}>
            <ContentWrapper
                refetchOrderQueue={refetchOrderQueue}
                data={data}
                aclCheckData={aclCheckData}
                parent={router && router.query && router.query.tab_status}
                {...props}
            />
        </Layout>
    );
};

export default Core;
