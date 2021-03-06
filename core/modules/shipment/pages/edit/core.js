import React from 'react';
import Layout from '@layout';
import { useRouter } from 'next/router';
import gqlService from '@modules/shipment/services/graphql';
import aclService from '@modules/theme/services/graphql';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import ErrorRedirect from '@common_errorredirect';

const ContentWrapper = (props) => {
    const {
        data, Content, dataCompany, refetch,
    } = props;

    const [companyId, setCompanyId] = React.useState();
    const [showModal, setShowModal] = React.useState(false);

    const shipment = data.getStoreShipmentById;
    const [confirmShipment] = gqlService.confirmShipment();
    const [getShipmentAvailableLocation, { data: dataLocation, loading: loadingLocation }] = gqlService.getShipmentAvailableLocation({
        variables: {
            shipment_id: shipment.entity_id,
            company_id: Number(companyId),
        },
        skip: !Number(companyId),
    });

    const [getShipmentAvailableLocationSku, { data: dataLocationSku, loading: loadingLocationSku }] = gqlService.getShipmentAvailableLocationSku();
    const [cantFulfillShipment] = gqlService.cantFulfillShipment();
    const [shipmentRellocation] = gqlService.shipmentRellocation();
    const [saveShipmentNotes] = gqlService.saveShipmentNotes();

    const handleConfirm = () => {
        const variables = {
            id: shipment.entity_id,
        };
        window.backdropLoader(true);
        confirmShipment({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: 'Order Confirmed',
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

    const handleCantFulfill = () => {
        const variables = {
            id: shipment.entity_id,
        };
        window.backdropLoader(true);
        cantFulfillShipment({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: 'Order Confirmed',
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

    const handleRellocation = ({ loc_code }) => {
        const variables = {
            shipment_id: shipment.entity_id,
            loc_code,
        };
        window.backdropLoader(true);
        shipmentRellocation({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: 'Rellocation Completed',
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

    const handleCheckAvailabilty = async (sku) => {
        getShipmentAvailableLocationSku({
            variables: {
                shipment_id: shipment.entity_id,
                company_id: Number(companyId),
                sku,
            },
        });
        setShowModal(true);
    };

    const handleNotes = ({ notes }) => {
        const variables = {
            id: shipment.entity_id,
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
                    text: 'Notes has been saved',
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
        allocation: shipment.allocation_status,
        shippingLabel: shipment.channel_shipping_label,
    };

    const formikConfirm = useFormik({
        initialValues: {
            id: shipment.entity_id,
        },
        onSubmit: (values) => {
            handleConfirm(values);
        },
    });

    const formikCantFullfill = useFormik({
        initialValues: {
            id: shipment.entity_id,
        },
        onSubmit: (values) => {
            handleCantFulfill(values);
        },
    });

    const formikRellocation = useFormik({
        initialValues: {
            shipment_id: shipment.entity_id,
            loc_code: '',
        },
        onSubmit: (values) => {
            handleRellocation(values);
        },
    });

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
        formikConfirm,
        formikCantFullfill,
        formikRellocation,
        formikNotes,
        dataCompany,
        getShipmentAvailableLocation,
        handleCheckAvailabilty,
        dataLocation,
        loadingLocation,
        companyId,
        setCompanyId,
        showModal,
        setShowModal,
        dataLocationSku,
        loadingLocationSku,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const router = useRouter();

    const pageConfig = {
        title: `Detail Shipment #${router.query?.id}`,
    };

    const { loading: loadingCompany, data: dataCompany } = gqlService.getShipmentAvailableCompany({
        shipment_id: router && router.query && Number(router.query.id),
    });

    const {
        loading, data, refetch, error,
    } = gqlService.getShipmentById({
        id: router && router.query && Number(router.query.id),
    });

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'oms_lite_sales_shipment',
    });

    if (loading || loadingCompany || aclCheckLoading) {
        return <Layout pageConfig={pageConfig}>Loading...</Layout>;
    }

    if (!data) {
        const errMsg = error?.message ?? 'Data not found!';
        const redirect = '/sales/shipment';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} pageConfig={pageConfig} />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    return (
        <Layout pageConfig={pageConfig}>
            <ContentWrapper data={data} dataCompany={dataCompany} refetch={refetch} {...props} />
        </Layout>
    );
};

export default Core;
