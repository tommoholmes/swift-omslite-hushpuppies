/* eslint-disable no-use-before-define */
import React from 'react';
import Layout from '@layout';
import { useRouter } from 'next/router';
import gqlService from '@modules/batchpack/services/graphql';
import aclService from '@modules/theme/services/graphql';
import useStyles from '@modules/batchpack/pages/detail/components/style';

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
            id: [Number(packList.entityId)],
        },
    });

    const [nextStoreShipmentList] = gqlService.nextStoreShipmentList({
        variables: {
            pageSize: 1,
            currentPage: 1,
            filter: {
                status: {
                    in: ['ready_for_pack', 'pick_uncomplete'],
                },
            },
        },
        onCompleted: (res) => {
            window.backdropLoader(false);
            if (res && res.getStoreShipmentList && res.getStoreShipmentList.items[0] && res.getStoreShipmentList.items[0].entity_id) {
                setNextShipment(res.getStoreShipmentList.items[0].entity_id);
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
        nextStoreShipmentList();
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

    const pageConfig = {
        title: `Pack by Batch ID ${router.query?.id}`,
    };

    const { loading, data } = gqlService.getPackList({
        id: [router && router.query && Number(router.query.id)],
    });
    const classes = useStyles();

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'pick_by_batch_packlist',
    });

    if (loading || aclCheckLoading) {
        return (
            <Layout pageConfig={pageConfig}>
                <div className={classes.loadingFetch}>
                    Loading . . .
                </div>
            </Layout>
        );
    }

    if (!data) {
        return (
            <Layout pageConfig={pageConfig}>
                <div className={classes.loadingFetch}>
                    No records to display
                </div>
            </Layout>
        );
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    return (
        <Layout pageConfig={pageConfig} useBreadcrumbs={false}>
            <ContentWrapper data={data} {...props} />
        </Layout>
    );
};

export default Core;
