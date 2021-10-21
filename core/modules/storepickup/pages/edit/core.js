/* eslint-disable no-use-before-define */
import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/storepickup/services/graphql';

const ContentWrapper = (props) => {
    const {
        data,
        Content,
    } = props;
    const storepickup = data.getStoreShipmentById;
    const [confirmShipment] = gqlService.confirmShipment();
    const [cantFulfillShipment] = gqlService.cantFulfillShipment();
    const [pickShipment] = gqlService.pickShipment();
    const [packShipment] = gqlService.packShipment();
    const [pickedupShipment] = gqlService.pickedupShipment();
    const [saveShipmentNotes] = gqlService.saveShipmentNotes();

    const handleConfirm = () => {
        const variables = {
            id: storePickup.id,
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
            id: storePickup.id,
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
            id: storePickup.id,
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
            id: storePickup.id,
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

    const handlePickedUpShipment = ({
        name,
        reference,
    }) => {
        const variables = {
            id: storePickup.id,
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
                text: 'Pick Up Completed!',
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

    const handleSaveNotes = ({
        notes,
    }) => {
        const variables = {
            id: storePickup.id,
            notes,
        };
        window.backdropLoader(true);
        saveShipmentNotes({
            variables,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Notes saved',
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

    const storePickup = {
        id: storepickup.entity_id,
        shipmentNumber: storepickup.increment_id,
        orderNumber: storepickup.channel_order_increment_id,
        statusLabel: storepickup.status.label,
        statusValue: storepickup.status.value,
        allocation: storepickup.allocation_status,
        date: storepickup.channel_order_date,
        updated: storepickup.updated_at,
        awb: storepickup.all_track[0],
        email: storepickup.shipping_email,
        firstname: storepickup.billing_address.firstname,
        lastname: storepickup.billing_address.lastname,
        street: storepickup.billing_address.street,
        city: storepickup.billing_address.city,
        region: storepickup.billing_address.region,
        postcode: storepickup.billing_address.postcode,
        countryId: storepickup.billing_address.country_id,
        phone: storepickup.billing_address.telephone,
        pickup: storepickup.pickup_info,
        order: storepickup.order_item,
        total: storepickup.subtotal,
        history: storepickup.status_history,
        location: storepickup.location.loc_name,
    };

    const formikConfirm = useFormik({
        initialValues: {
            id: storepickup.entity_id,
        },
        onSubmit: (values) => {
            handleConfirm(values);
        },
    });

    const formikCantFullfill = useFormik({
        initialValues: {
            id: storepickup.entity_id,
        },
        onSubmit: (values) => {
            handleCantFulfill(values);
        },
    });

    const formikPicked = useFormik({
        initialValues: {
            id: storepickup.entity_id,
        },
        onSubmit: (values) => {
            handlePicked(values);
        },
    });

    const formikPacked = useFormik({
        initialValues: {
            id: storepickup.entity_id,
        },
        onSubmit: (values) => {
            handlePacked(values);
        },
    });

    const formikPickedUp = useFormik({
        initialValues: {
            id: storepickup.entity_id,
            name: '',
            reference: '',
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required('Name is required!'),
            reference: Yup.string().required('Reference is equired!'),
        }),
        onSubmit: (values) => {
            handlePickedUpShipment(values);
        },
    });

    const formikNotes = useFormik({
        initialValues: {
            id: storepickup.entity_id,
            notes: '',
        },
        validationSchema: Yup.object().shape({
            notes: Yup.string().required('Notes is equired!'),
        }),
        onSubmit: (values) => {
            handleSaveNotes(values);
        },
    });

    const contentProps = {
        storePickup,
        formikConfirm,
        formikCantFullfill,
        formikPicked,
        formikPacked,
        formikPickedUp,
        formikNotes,
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
