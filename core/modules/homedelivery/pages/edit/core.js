/* eslint-disable no-use-before-define */
import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/homedelivery/services/graphql';
import aclService from '@modules/theme/services/graphql';

const ContentWrapper = (props) => {
    const {
        data,
        Content,
        refetch,
    } = props;
    const homedelivery = data.getStoreShipmentById;
    const [confirmShipment] = gqlService.confirmShipment();
    const [cantFulfillShipment] = gqlService.cantFulfillShipment();
    const [pickShipment] = gqlService.pickShipment();
    const [cancelDelivery] = gqlService.cancelDelivery();
    const [packShipment] = gqlService.packShipment();
    const [bookCourier] = gqlService.bookCourier();
    const [shipDelivery] = gqlService.shipDelivery();
    const [deliveredShipment] = gqlService.deliveredShipment();
    const [saveShipmentNotes] = gqlService.saveShipmentNotes();

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

    const handleCanceled = ({
        reason,
    }) => {
        const variables = {
            id: homeDelivery.id,
            cancel_reason_id: reason.value,
        };
        window.backdropLoader(true);
        cancelDelivery({
            variables,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Order was canceled',
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

    const handleShipped = ({
        carrier,
        name,
        reference,
    }) => {
        const variables = {
            id: homeDelivery.id,
            carrier: carrier.value,
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

    const handleNotes = ({
        notes,
    }) => {
        const variables = {
            id: homeDelivery.id,
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

    const homeDelivery = {
        id: homedelivery.entity_id,
        shipmentNumber: homedelivery.increment_id,
        orderNumber: homedelivery.channel_order_increment_id,
        statusLabel: homedelivery.status.label,
        statusValue: homedelivery.status.value,
        allocation: homedelivery.allocation_status,
        date: homedelivery.channel_order_date,
        location: homedelivery.location.loc_name,
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
        countryName: homedelivery.billing_address.country_name,
        phone: homedelivery.billing_address.telephone,
        pickup: homedelivery.pickup_info,
        order: homedelivery.order_item,
        total: homedelivery.subtotal,
        history: homedelivery.status_history,
        shipping_address: homedelivery.shipping_address,
        shipping: homedelivery.channel_shipping_label,
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

    const formikCanceled = useFormik({
        initialValues: {
            id: homedelivery.entity_id,
            reason: '',
        },
        validationSchema: Yup.object().shape({
            reason: Yup.string().required('Required!'),
        }),
        onSubmit: (values) => {
            handleCanceled(values);
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

    const formikNotes = useFormik({
        initialValues: {
            id: homedelivery.entity_id,
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
        homeDelivery,
        formikConfirm,
        formikCantFullfill,
        formikPicked,
        formikCanceled,
        formikPacked,
        formikCourier,
        formikShipped,
        formikDelivered,
        formikNotes,
    };

    return (
        <Content {...contentProps} />
    );
};

const Core = (props) => {
    const router = useRouter();

    const pageConfig = {
        title: `Home Delivery #${router.query?.id}`,
    };

    const { loading, data, refetch } = gqlService.getStoreShipmentById({
        id: router && router.query && Number(router.query.id),
    });

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'shipment_delivery_dashboard',
    });

    if (loading || aclCheckLoading) {
        return (
            <Layout pageConfig={pageConfig}>
                <div style={{
                    display: 'flex',
                    color: '#435179',
                    fontWeight: 600,
                    justifyContent: 'center',
                    padding: '20px 0',
                }}
                >
                    Loading...
                </div>

            </Layout>
        );
    }

    if (!data) {
        return (
            <Layout pageConfig={pageConfig}>Data not found!</Layout>
        );
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    return (
        <Layout pageConfig={pageConfig}>
            <ContentWrapper data={data} {...props} refetch={refetch} />
        </Layout>
    );
};

export default Core;
