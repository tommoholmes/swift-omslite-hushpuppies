import React from 'react';
import Layout from '@layout';
import { useRouter } from 'next/router';
import gqlService from '@modules/shipment/services/graphql';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const ContentWrapper = (props) => {
    const {
        data,
        Content,
        refetch,
    } = props;
    const shipment = data.getStoreShipmentById;
    const [saveShipmentNotes] = gqlService.saveShipmentNotes();

    const shipmentDetail = {
        id: shipment.entity_id,
        shipmentId: shipment.increment_id,
        location: shipment.location.loc_name,
        isPickup: shipment.is_pickup,
        orderDate: shipment.channel_order_date,
        lastUpdate: shipment.updated_at,
        channelOrderNumber: shipment.channel_order_increment_id,
        statusLabel: shipment.status.label,
        statusValue: shipment.status.value,
        email: shipment.email || shipment.shipping_email,
        billing: shipment.billing_address,
        shipping: shipment.shipping_address,
        pickup: shipment.pickup_info,
        orderItem: shipment.order_item,
        shipMethod: shipment.channel_shipping_label || '-',
        tracking: shipment.all_track,
        statusHistory: shipment.status_history,
    };

    const handleNotes = ({
        notes,
    }) => {
        const variables = {
            id: shipmentDetail.id,
            notes,
        };
        window.backdropLoader(true);
        saveShipmentNotes({
            variables,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'notes has been saved',
                variant: 'success',
            });
            setTimeout(() => refetch(), 250);
        }).catch((e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        });
    };

    const formikNotes = useFormik({
        initialValues: {
            id: shipment.entity_id,
            notes: '',
        },
        validationSchema: Yup.object().shape({
            notes: Yup.string().required('Required!'),
        }),
        onSubmit: (values) => {
            handleNotes(values);
        },
    });

    const contentProps = {
        shipmentDetail,
        formikNotes,
    };

    return (
        <Content {...contentProps} />
    );
};

const Core = (props) => {
    const router = useRouter();
    const { loading, data, refetch } = gqlService.getShipmentById({
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
            <ContentWrapper data={data} refetch={refetch} {...props} />
        </Layout>
    );
};

export default Core;
