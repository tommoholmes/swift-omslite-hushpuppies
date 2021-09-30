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
    const batchlist = data.getPickByBatchById.pick_by_batch;

    const batchList = {
        id: batchlist.entity_id,
        statusLabel: batchlist.status.label,
        statusValue: batchlist.status.value,
        date: batchlist.created_at,
        totalItems: batchlist.total_items,
        totalShipments: batchlist.total_shipments,
        pickList: batchlist.picklist,
    };

    const contentProps = {
        batchList,
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
