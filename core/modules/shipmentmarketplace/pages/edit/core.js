/* eslint-disable no-use-before-define */
import React from 'react';
import Layout from '@layout';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/shipmentmarketplace/services/graphql';
import aclService from '@modules/theme/services/graphql';
import ErrorRedirect from '@common_errorredirect';

const ContentWrapper = (props) => {
    const {
        data, Content, refetch, dataConfig,
    } = props;
    const shipmentmarketplace = data.getStoreShipmentById;
    const [confirmMarketplaceShipment] = gqlService.confirmMarketplaceShipment();
    const [pickShipment] = gqlService.pickShipment();
    const [canceledMarketplaceShipment] = gqlService.canceledMarketplaceShipment();
    const [packShipment] = gqlService.packShipment();
    const [shippedMarketplaceShipment] = gqlService.shippedMarketplaceShipment();
    const [deliveredShipment] = gqlService.deliveredShipment();
    const [saveShipmentNotes] = gqlService.saveShipmentNotes();

    const handleConfirm = () => {
        const variables = {
            id: shipmentMarketplace.id,
        };
        window.backdropLoader(true);
        confirmMarketplaceShipment({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: 'Order was Confirm',
                    variant: 'success',
                });
                setTimeout(() => refetch(), 250);
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

    const handlePicked = () => {
        const variables = {
            id: shipmentMarketplace.id,
        };
        window.backdropLoader(true);
        pickShipment({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: 'Order was Picked',
                    variant: 'success',
                });
                setTimeout(() => refetch(), 250);
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

    const handleCanceled = ({ reason }) => {
        const variables = {
            id: shipmentMarketplace.id,
            cancel_reason_id: reason.value,
        };
        window.backdropLoader(true);
        canceledMarketplaceShipment({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: 'Order was canceled',
                    variant: 'success',
                });
                setTimeout(() => refetch(), 250);
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

    const handlePacked = () => {
        const variables = {
            id: shipmentMarketplace.id,
        };
        window.backdropLoader(true);
        packShipment({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: 'Order was Packaged',
                    variant: 'success',
                });
                setTimeout(() => refetch(), 250);
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

    const handleShipped = ({ awb }) => {
        const variables = {
            id: shipmentMarketplace.id,
            track_number: awb,
        };
        window.backdropLoader(true);
        shippedMarketplaceShipment({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: 'Order was Shipped',
                    variant: 'success',
                });
                setTimeout(() => refetch(), 250);
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

    const handleDelivered = () => {
        const variables = {
            id: shipmentMarketplace.id,
        };
        window.backdropLoader(true);
        deliveredShipment({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: 'Order was Delivered',
                    variant: 'success',
                });
                setTimeout(() => refetch(), 250);
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

    const handleNotes = ({ notes }) => {
        const variables = {
            id: shipmentMarketplace.id,
            notes,
        };
        window.backdropLoader(true);
        saveShipmentNotes({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: 'notes has been saved',
                    variant: 'success',
                });
                setTimeout(() => refetch(), 250);
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

    const shipmentMarketplace = {
        id: shipmentmarketplace.entity_id,
        shipmentNumber: shipmentmarketplace.increment_id,
        channelId: shipmentmarketplace.channel_order_increment_id,
        channelName: shipmentmarketplace.channel.channel_name,
        channelCode: shipmentmarketplace.channel.channel_code,
        orderNumber: shipmentmarketplace.marketplace_order_number,
        statusLabel: shipmentmarketplace.status.label,
        statusValue: shipmentmarketplace.status.value,
        marketplaceOrderStatus: shipmentmarketplace.marketplace_order_status,
        marketplaceCode: shipmentmarketplace.marketplace_code,
        allocation: shipmentmarketplace.allocation_status,
        date: shipmentmarketplace.channel_order_date,
        location: shipmentmarketplace.location.loc_name,
        awbSource: shipmentmarketplace.awb_source,
        trackNumber: shipmentmarketplace.track_number,
        updated: shipmentmarketplace.updated_at,
        awb: shipmentmarketplace.all_track[0],
        email: shipmentmarketplace.shipping_email,
        firstname: shipmentmarketplace.billing_address.firstname,
        lastname: shipmentmarketplace.billing_address.lastname,
        street: shipmentmarketplace.billing_address.street,
        city: shipmentmarketplace.billing_address.city,
        region: shipmentmarketplace.billing_address.region,
        postcode: shipmentmarketplace.billing_address.postcode,
        countryId: shipmentmarketplace.billing_address.country_id,
        countryName: shipmentmarketplace.billing_address.country_name,
        phone: shipmentmarketplace.billing_address.telephone,
        shippingAddress: shipmentmarketplace.shipping_address,
        pickup: shipmentmarketplace.pickup_info,
        order: shipmentmarketplace.order_item || [],
        method: shipmentmarketplace.channel_shipping_label,
        total: shipmentmarketplace.subtotal,
        history: shipmentmarketplace.status_history || [],
    };

    const formikConfirm = useFormik({
        initialValues: {
            id: shipmentmarketplace.entity_id,
        },
        onSubmit: (values) => {
            handleConfirm(values);
        },
    });

    const formikPicked = useFormik({
        initialValues: {
            id: shipmentmarketplace.entity_id,
        },
        onSubmit: (values) => {
            handlePicked(values);
        },
    });

    const formikCanceled = useFormik({
        initialValues: {
            id: shipmentmarketplace.entity_id,
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
            id: shipmentmarketplace.entity_id,
        },
        onSubmit: (values) => {
            handlePacked(values);
        },
    });

    const formikShipped = useFormik({
        initialValues: {
            id: shipmentmarketplace.entity_id,
            awb: (shipmentMarketplace.awb && shipmentMarketplace.awb.track_number) || '',
        },
        onSubmit: (values) => {
            handleShipped(values);
        },
    });

    const formikDelivered = useFormik({
        initialValues: {
            id: shipmentmarketplace.entity_id,
        },
        onSubmit: (values) => {
            handleDelivered(values);
        },
    });

    const formikNotes = useFormik({
        initialValues: {
            id: shipmentmarketplace.entity_id,
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
        shipmentMarketplace,
        formikConfirm,
        formikPicked,
        formikCanceled,
        formikPacked,
        formikShipped,
        formikDelivered,
        formikNotes,
        dataConfig,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const router = useRouter();

    const pageConfig = {
        title: `Marketplace #${router.query?.id}`,
    };

    const { loading: loadingConfig, data: dataConfig } = gqlService.getStoreConfig({
        path: 'swiftoms_shipment/general/pick_and_pack',
    });
    const {
        loading, data, refetch, error,
    } = gqlService.getStoreShipmentById({
        id: router && router.query && Number(router.query.id),
    });

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'shipment_marketplace_dashboard',
    });

    if (loading || loadingConfig || aclCheckLoading) {
        return (
            <Layout pageConfig={pageConfig}>
                <div
                    style={{
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
        const errMsg = error?.message ?? 'Data not found!';
        const redirect = '/shipment/shipmentmarketplace';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} pageConfig={pageConfig} />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    return (
        <Layout pageConfig={pageConfig}>
            <ContentWrapper dataConfig={dataConfig.getStoreConfig === '1'} data={data} {...props} refetch={refetch} />
        </Layout>
    );
};

export default Core;
