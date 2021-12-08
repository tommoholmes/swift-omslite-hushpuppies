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
    const picklist = data.getPickByBatchItemById.pick_by_batch_item;

    const pickList = {
        parentId: picklist.parent_id,
        id: picklist.entity_id,
        name: picklist.name,
        sku: picklist.sku,
        location: picklist.bin_code,
        image: picklist.image_url,
        qty: picklist.qty_to_pick,
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

    const pageConfig = {
        title: `Pick by Batch ID ${router.query?.id}`,
    };

    const { loading, data } = gqlService.getPickByBatchItemById({
        id: router && router.query && Number(router.query.id),
    });

    if (loading) {
        return (
            <Layout pageConfig={pageConfig}>Loading...</Layout>
        );
    }

    if (!data) {
        return (
            <Layout pageConfig={pageConfig}>Data not found!</Layout>
        );
    }

    return (
        <Layout pageConfig={pageConfig}>
            <ContentWrapper data={data} {...props} />
        </Layout>
    );
};

export default Core;
