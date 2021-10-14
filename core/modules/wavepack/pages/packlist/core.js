/* eslint-disable no-use-before-define */
import React from 'react';
import Layout from '@layout';
import { useRouter } from 'next/router';
import gqlService from '@modules/wavepack/services/graphql';
import useStyles from '@modules/wavepack/pages/packlist/components/style';

const ContentWrapper = (props) => {
    const {
        data,
        Content,
    } = props;
    const router = useRouter();
    const packlist = data.getPickByWavePacklist.pick_by_wave;
    const [startPickByWavePacking] = gqlService.startPickByWavePacking();

    const packList = {
        id: packlist.entity_id,
        statusLabel: packlist.status.label,
        statusValue: packlist.status.value,
        date: packlist.started_at,
        totalItems: packlist.total_items,
        totalShipments: packlist.total_shipments,
        picker: packlist.picked_by,
        shipmentId: packlist.shipment_inc_id,
        slot: packlist.slot_no,
        items: packlist.packlist,
    };

    const handleClick = (id) => {
        if (packlist.status.value && packlist.status.value === 'pack_in_progress') {
            router.push(`/pickpack/wavepack/packlist/detail/${id}`);
        } else {
            window.backdropLoader(true);
            startPickByWavePacking({
                variables: {
                    id: packlist.entity_id,
                },
            }).then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: 'Start your packing process!',
                    variant: 'success',
                });
                router.push(`/pickpack/wavepack/packlist/detail/${id}`);
            }).catch((e) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
            });
        }
    };
    const contentProps = {
        packList,
        handleClick,
    };

    return (
        <Content {...contentProps} />
    );
};

const Core = (props) => {
    const router = useRouter();
    const { loading, data } = gqlService.getPickByWavePacklist({
        id: router && router.query && Number(router.query.id),
    });
    const classes = useStyles();

    if (loading) {
        return (
            <Layout>
                <div className={classes.loadingFetch}>
                    Loading . . .
                </div>
            </Layout>
        );
    }

    if (!data) {
        return (
            <Layout>
                <div className={classes.loadingFetch}>
                    No records to display
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <ContentWrapper data={data} {...props} />
        </Layout>
    );
};

export default Core;
