/* eslint-disable no-use-before-define */
import React from 'react';
import Layout from '@layout';
import { useRouter } from 'next/router';
import gqlService from '@modules/wavepack/services/graphql';
import useStyles from '@modules/wavepack/pages/packdetail/components/style';

const ContentWrapper = (props) => {
    const {
        data,
        Content,
    } = props;
    const [showModal, setShowModal] = React.useState(false);
    const [nextShipment, setNextShipment] = React.useState(null);
    const packlist = data.getPackList.data[0];

    const packList = {
        entityId: packlist.entity_id,
        id: packlist.increment_id,
        shipmentId: packlist.channel_order_increment_id,
        statusLabel: packlist.status.label,
        statusValue: packlist.status.value,
        firstName: packlist.shipping_address.firstname,
        lastName: packlist.shipping_address.lastname,
        telephone: packlist.shipping_address.telephone,
        street: packlist.shipping_address.street,
        city: packlist.shipping_address.city,
        region: packlist.shipping_address.region,
        postcode: packlist.shipping_address.postcode,
        countryId: packlist.shipping_address.country_id,
        country: packlist.shipping_address.country_name,
        slot: packlist.slot_no,
        items: packlist.items,
        pick_id: packlist.pick_id,
        shipping: packlist.channel_shipping_label,
    };

    const [packShipment] = gqlService.packShipment({
        variables: {
            id: [Number(packList.id)],
        },
    });

    const [donePickByWavePacking] = gqlService.donePickByWavePacking({
        variables: {
            id: Number(packList.pick_id),
            shipment_id: Number(packList.id),
        },
        onCompleted: (res) => {
            window.backdropLoader(false);
            if (res && res.donePickByWavePacking && res.donePickByWavePacking.next_shipment_id_to_pack) {
                setNextShipment(res.donePickByWavePacking.next_shipment_id_to_pack);
            }
            setShowModal(true);
        },
        onError: (e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        },
    });

    const handleDone = async () => {
        window.backdropLoader(true);
        await packShipment();
        donePickByWavePacking();
    };

    const contentProps = {
        packList,
        handleDone,
        showModal,
        setShowModal,
        nextShipment,
    };

    return (
        <Content {...contentProps} />
    );
};

const Core = (props) => {
    const router = useRouter();
    const { loading, data } = gqlService.getPackList({
        id: [router && router.query && Number(router.query.id)],
    });
    const classes = useStyles();

    const pageConfig = {
        title: `Pack by Wave ID ${router.query?.id}`,
    };

    if (loading) {
        return (
            <Layout pageConfig={pageConfig} useBreadcrumbs={false}>
                <div className={classes.loadingFetch}>
                    Loading . . .
                </div>
            </Layout>
        );
    }

    if (!data) {
        return (
            <Layout pageConfig={pageConfig} useBreadcrumbs={false}>
                <div className={classes.loadingFetch}>
                    No records to display
                </div>
            </Layout>
        );
    }

    return (
        <Layout pageConfig={pageConfig} useBreadcrumbs={false}>
            <ContentWrapper data={data} {...props} />
        </Layout>
    );
};

export default Core;
