/* eslint-disable no-use-before-define */
import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/homedelivery/services/graphql';

const ContentWrapper = (props) => {
    const {
        data,
        Content,
    } = props;
    const homedelivery = data.getStoreShipmentById;
    const [confirmShipment] = gqlService.confirmShipment();
    const [cantFulfillShipment] = gqlService.cantFulfillShipment();
    const [pickShipment] = gqlService.pickShipment();
    const [packShipment] = gqlService.packShipment();
    const [bookCourier] = gqlService.bookCourier();
    const [shipDelivery] = gqlService.shipDelivery();
    const [deliveredShipment] = gqlService.deliveredShipment();

    const handleConfirm = () => {
        const variables = {
            id: homeDelivery.id,
        };
        window.backdropLoader(true);
        confirmShipment({
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
            id: homeDelivery.id,
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

    const handlePicked = () => {
        const variables = {
            id: homeDelivery.id,
        };
        window.backdropLoader(true);
        pickShipment({
            variables,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Order was Picked',
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
            id: homeDelivery.id,
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

    const handleCourier = () => {
        const variables = {
            id: homeDelivery.id,
        };
        window.backdropLoader(true);
        bookCourier({
            variables,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Order was Booked',
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

    const handleShipped = ({
        carrier,
        name,
        reference,
    }) => {
        const variables = {
            id: homeDelivery.id,
            carrier,
            name,
            reference,
        };
        window.backdropLoader(true);
        shipDelivery({
            variables,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Order was Shipped',
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

    const handleDelivered = () => {
        const variables = {
            id: homeDelivery.id,
        };
        window.backdropLoader(true);
        deliveredShipment({
            variables,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Order was Delivered',
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

    const homeDelivery = {
        id: homedelivery.entity_id,
        shipmentNumber: homedelivery.increment_id,
        orderNumber: homedelivery.channel_order_increment_id,
        statusLabel: homedelivery.status.label,
        statusValue: homedelivery.status.value,
        allocation: homedelivery.allocation_status,
        date: homedelivery.channel_order_date,
        updated: homedelivery.updated_at,
        awb: homedelivery.all_track[0],
        email: homedelivery.shipping_email,
        firstname: homedelivery.billing_address.firstname,
        lastname: homedelivery.billing_address.lastname,
        street: homedelivery.billing_address.street,
        city: homedelivery.billing_address.city,
        region: homedelivery.billing_address.region,
        postcode: homedelivery.billing_address.postcode,
        countryId: homedelivery.billing_address.country_id,
        phone: homedelivery.billing_address.telephone,
        pickup: homedelivery.pickup_info,
        order: homedelivery.order_item,
        total: homedelivery.subtotal,
        history: homedelivery.status_history,
    };

    const formikConfirm = useFormik({
        initialValues: {
            id: homedelivery.entity_id,
        },
        onSubmit: (values) => {
            handleConfirm(values);
        },
    });

    const formikCantFullfill = useFormik({
        initialValues: {
            id: homedelivery.entity_id,
        },
        onSubmit: (values) => {
            handleCantFulfill(values);
        },
    });

    const formikPicked = useFormik({
        initialValues: {
            id: homedelivery.entity_id,
        },
        onSubmit: (values) => {
            handlePicked(values);
        },
    });

    const formikPacked = useFormik({
        initialValues: {
            id: homedelivery.entity_id,
        },
        onSubmit: (values) => {
            handlePacked(values);
        },
    });

    const formikCourier = useFormik({
        initialValues: {
            id: homedelivery.entity_id,
        },
        onSubmit: (values) => {
            handleCourier(values);
        },
    });

    const formikShipped = useFormik({
        initialValues: {
            id: homedelivery.entity_id,
            carrier: '',
            name: '',
            reference: '',
        },
        validationSchema: Yup.object().shape({
            carrier: Yup.string().required('Required!'),
            name: Yup.string().required('Required!'),
            reference: Yup.string().required('Required!'),
        }),
        onSubmit: (values) => {
            handleShipped(values);
            console.log(values);
        },
    });

    const formikDelivered = useFormik({
        initialValues: {
            id: homedelivery.entity_id,
        },
        onSubmit: (values) => {
            handleDelivered(values);
        },
    });

    const contentProps = {
        homeDelivery,
        formikConfirm,
        formikCantFullfill,
        formikPicked,
        formikPacked,
        formikCourier,
        formikShipped,
        formikDelivered,

    };

    return (
        <Content {...contentProps} />
    );
};

const Core = (props) => {
    const router = useRouter();
    const { loading, data } = gqlService.getStoreShipmentById({
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
