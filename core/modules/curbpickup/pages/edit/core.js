/* eslint-disable no-use-before-define */
import React from 'react';
import Layout from '@layout';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/curbpickup/services/graphql';

const ContentWrapper = (props) => {
    const {
        data,
        Content,
    } = props;
    const curbpickup = data.getCurbPickupById;
    const [confirmPickShipment] = gqlService.confirmPickShipment();
    const [cantFulfillShipment] = gqlService.cantFulfillShipment();
    const [packShipment] = gqlService.packShipment();
    const [pickedupShipment] = gqlService.pickedupShipment();

    const handleConfirm = () => {
        const variables = {
            id: curbPickup.id,
        };
        window.backdropLoader(true);
        confirmPickShipment({
            variables,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Order was Confirm',
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

    const handleCantFulfill = () => {
        const variables = {
            id: curbPickup.id,
        };
        window.backdropLoader(true);
        cantFulfillShipment({
            variables,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Order was Confirm',
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

    const handlePacked = () => {
        const variables = {
            id: curbPickup.id,
        };
        window.backdropLoader(true);
        packShipment({
            variables,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Order was Packaged',
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

    const handleComplete = ({
        name,
        reference,
    }) => {
        const variables = {
            id: curbPickup.id,
            name,
            reference,
        };
        window.backdropLoader(true);
        pickedupShipment({
            variables,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Customer Was Picked up',
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

    const curbPickup = {
        id: curbpickup.entity_id,
        shipmentNumber: curbpickup.increment_id,
        orderNumber: curbpickup.channel_order_increment_id,
        allocation: curbpickup.allocation_status,
        status: curbpickup.status.label,
        statusValue: curbpickup.status.value,
        track: curbpickup.all_track,
        name: curbpickup.customer_name,
        shippingPhone: curbpickup.billing_address.telephone,
        firstname: curbpickup.billing_address.firstname,
        lastname: curbpickup.billing_address.lastname,
        street: curbpickup.billing_address.street,
        city: curbpickup.billing_address.city,
        region: curbpickup.billing_address.region,
        postcode: curbpickup.billing_address.postcode,
        countryId: curbpickup.billing_address.country_id,
        pickup: curbpickup.pickup_info,
        locName: curbpickup.loc_code.loc_name,
        order: curbpickup.items,
        total: curbpickup.subtotal,

    };

    const formikConfirm = useFormik({
        initialValues: {
            id: curbpickup.entity_id,
        },
        onSubmit: (values) => {
            handleConfirm(values);
        },
    });

    const formikCantFullfill = useFormik({
        initialValues: {
            id: curbpickup.entity_id,
        },
        onSubmit: (values) => {
            handleCantFulfill(values);
        },
    });

    const formikPacked = useFormik({
        initialValues: {
            id: curbpickup.entity_id,
        },
        onSubmit: (values) => {
            handlePacked(values);
        },
    });

    const formikComplete = useFormik({
        initialValues: {
            id: curbpickup.entity_id,
            name: '',
            reference: '',
        },
        onSubmit: (values) => {
            handleComplete(values);
        },
    });

    const contentProps = {
        curbPickup,
        formikConfirm,
        formikCantFullfill,
        formikPacked,
        formikComplete,
    };

    return (
        <Content {...contentProps} />
    );
};

const Core = (props) => {
    const router = useRouter();
    const { loading, data } = gqlService.getCurbPickupById({
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
