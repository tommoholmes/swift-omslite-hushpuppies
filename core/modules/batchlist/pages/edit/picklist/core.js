/* eslint-disable no-use-before-define */
import React from 'react';
import Layout from '@layout';
// import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import gqlService from '@modules/batchlist/services/graphql';

const ContentWrapper = (props) => {
    const {
        data,
        Content,
    } = props;
    const picklist = data.getPickByBatchPicklist.pick_by_batch_picklist;

    const pickList = {
        id: picklist.entity_id,
        parentId: picklist.parent_id,
        statusLabel: picklist.status.label,
        statusValue: picklist.status.value,
        date: picklist.started_at,
        totalItems: picklist.total_items,
        picker: picklist.picked_by,
        items: picklist.items,
    };

    const contentProps = {
        pickList,
    };

    return (
        <Content {...contentProps} />
    );
};

const Core = (props) => {
    const router = useRouter();
    const { loading, data } = gqlService.getPickByBatchPicklist({
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
