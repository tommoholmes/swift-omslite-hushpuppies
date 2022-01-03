/* eslint-disable no-use-before-define */
import React from 'react';
import Layout from '@layout';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/batchlist/services/graphql';
import aclService from '@modules/theme/services/graphql';
import ErrorRedirect from '@common_errorredirect';

const ContentWrapper = (props) => {
    const { data, Content } = props;
    const router = useRouter();
    const picklist = data.getPickByBatchPicklist.pick_by_batch_picklist;
    const [donePickByBatchPicklist] = gqlService.donePickByBatchPicklist();

    const handleDone = () => {
        const variables = {
            id: pickList.id,
        };
        window.backdropLoader(true);
        donePickByBatchPicklist({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: 'Picklist was done',
                    variant: 'success',
                });
                router.push(`/pickpack/batchlist/edit/${pickList.parentId}`);
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

    const pickList = {
        id: picklist.entity_id,
        parentId: picklist.parent_id,
        statusLabel: picklist.status.label,
        statusValue: picklist.status.value,
        date: picklist.started_at,
        totalItems: picklist.total_items,
        picker: picklist.picked_by,
        items: picklist.items,
        itemsLeft: picklist.total_items_left_to_pick,
    };

    const formikDone = useFormik({
        initialValues: {
            id: picklist.parent_id,
        },
        onSubmit: (values) => {
            handleDone(values);
        },
    });

    const contentProps = {
        pickList,
        formikDone,
    };

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const router = useRouter();
    const { loading, data, error } = gqlService.getPickByBatchPicklist({
        id: router && router.query && Number(router.query.id),
    });

    const pageConfig = {
        title: `Pick by Batch - Pick List ${router.query?.id}`,
    };

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'pick_by_batch_list',
    });

    if (loading || aclCheckLoading) {
        return <Layout pageConfig={pageConfig}>Loading...</Layout>;
    }

    if (!data) {
        const errMsg = error?.message ?? 'Data not found!';
        const redirect = '/pickpack/batchlist';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} pageConfig={pageConfig} />;
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
