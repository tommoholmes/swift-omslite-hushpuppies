/* eslint-disable no-use-before-define */
import React from 'react';
import Layout from '@layout';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/batchlist/services/graphql';

const ContentWrapper = (props) => {
    const {
        data,
        Content,
    } = props;
    const router = useRouter();
    const batchlist = data.getPickByBatchById.pick_by_batch;
    const [startPickByBatchPicklist] = gqlService.startPickByBatchPicklist();
    const [startSortingPickByBatch] = gqlService.startSortingPickByBatch();

    const handleClick = (id, status) => {
        const variables = {
            id,
            status,
        };
        if (status === 'new') {
            window.backdropLoader(true);
            startPickByBatchPicklist({
                variables,
            }).then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: 'PickList in Progress',
                    variant: 'success',
                });
                router.push(`/pickpack/batchlist/edit/picklist/${id}`);
            }).catch((e) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
            });
        } else {
            router.push(`/pickpack/batchlist/edit/picklist/${id}`);
        }
    };

    const handleStartSorting = () => {
        const variables = {
            batch_id: batchList.id,
        };
        window.backdropLoader(true);
        startSortingPickByBatch({
            variables,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Start Sorting',
                variant: 'success',
            });
            // setTimeout(() => window.location.reload(true), 250);
        }).catch((e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        });
    };

    const batchList = {
        id: batchlist.entity_id,
        statusLabel: batchlist.status.label,
        statusValue: batchlist.status.value,
        date: batchlist.created_at,
        totalItems: batchlist.total_items,
        totalShipments: batchlist.total_shipments,
        picklist: batchlist.picklist,
    };

    const formikStartSorting = useFormik({
        initialValues: {
            batch_id: batchlist.entity_id,
        },
        onSubmit: (values) => {
            handleStartSorting(values);
        },
    });

    const contentProps = {
        batchList,
        handleClick,
        formikStartSorting,
    };

    return (
        <Content {...contentProps} />
    );
};

const Core = (props) => {
    const router = useRouter();
    const { loading, data } = gqlService.getPickByBatchById({
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
