/* eslint-disable no-use-before-define */
import React from 'react';
import Layout from '@layout';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/batchlist/services/graphql';
import aclService from '@modules/theme/services/graphql';

const ContentWrapper = (props) => {
    const { data, Content } = props;
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
            })
                .then(() => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        text: 'PickList in Progress',
                        variant: 'success',
                    });
                    router.push(`/pickpack/batchlist/edit/picklist/${id}`);
                })
                .catch((e) => {
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
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: 'Start Sorting',
                    variant: 'success',
                });
                router.push(`/pickpack/batchlist/edit/sorting/${batchList.id}`);
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

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const router = useRouter();
    const { loading, data } = gqlService.getPickByBatchById({
        id: router && router.query && Number(router.query.id),
    });

    const pageConfig = {
        title: `Pick by Batch #${router.query?.id}`,
    };

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'pick_by_batch_list',
    });

    if (loading || aclCheckLoading) {
        return <Layout pageConfig={pageConfig}>Loading...</Layout>;
    }

    if (!data) {
        window.toastMessage({
            open: true,
            text: 'Data not found!',
            variant: 'error',
        });
        setTimeout(() => {
            router.push('/pickpack/batchlist');
        }, 1000);
        return (
            <Layout>
                <div
                    style={{
                        display: 'flex',
                        color: '#435179',
                        fontWeight: 600,
                        justifyContent: 'center',
                        padding: '20px 0',
                    }}
                >
                    Data not found!
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
