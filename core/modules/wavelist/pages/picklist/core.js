/* eslint-disable no-use-before-define */
import React from 'react';
import Layout from '@layout';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/wavelist/services/graphql';
import useStyles from '@modules/wavelist/pages/picklist/components/style';

const ContentWrapper = (props) => {
    const {
        data,
        Content,
    } = props;
    const wavelist = data.getPickByWaveById.pick_by_wave;

    const waveList = {
        id: wavelist.entity_id,
        statusLabel: wavelist.status.label,
        statusValue: wavelist.status.value,
        date: wavelist.started_at,
        totalItems: wavelist.total_items,
        totalShipments: wavelist.total_shipments,
        picker: wavelist.picked_by,
        items: wavelist.items,
        itemsLeft: wavelist.total_items_left_to_pick,
    };

    const [donePickByWave] = gqlService.donePickByWave();

    const handleDone = () => {
        const variables = {
            id: waveList.id,
        };
        window.backdropLoader(true);
        donePickByWave({
            variables,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Picklist was done',
                variant: 'success',
            });
        }).catch((e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        });
    };

    const formikDone = useFormik({
        initialValues: {
            id: waveList.id,
        },
        onSubmit: (values) => {
            handleDone(values);
        },
    });

    const contentProps = {
        waveList,
        formikDone,
    };

    return (
        <Content {...contentProps} />
    );
};

const Core = (props) => {
    const router = useRouter();
    const { loading, data } = gqlService.getPickByWaveById({
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
