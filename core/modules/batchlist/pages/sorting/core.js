/* eslint-disable no-use-before-define */
/* eslint-disable prefer-const */
/* eslint-disable max-len */

import React from 'react';
import Layout from '@layout';
import { useRouter } from 'next/router';
import gqlService from '@modules/batchlist/services/graphql';

const ContentWrapper = (props) => {
    const {
        data,
        Content,
    } = props;
    const router = useRouter();
    const picklist = data.getPickByBatchItemById.pick_by_batch_item;
    const [itemSortingPickByBatch] = gqlService.itemSortingPickByBatch();
    const [doneSortingPickByBatch] = gqlService.doneSortingPickByBatch();

    let [name, setName] = React.useState('-');
    let [sku, setSku] = React.useState('-');
    let [slot, setSlot] = React.useState('-');

    const handleDetect = (code) => {
        const variables = {
            batch_id: picklist.entity_id,
            barcode: code,
        };
        window.backdropLoader(true);
        itemSortingPickByBatch({
            variables,
        }).then((res) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Success update qty!',
                variant: 'success',
            });
            getDataSorting(res);
        }).catch((e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        });
    };

    const handleDoneSorting = () => {
        const variables = {
            batch_id: pickList.id,
        };
        window.backdropLoader(true);
        doneSortingPickByBatch({
            variables,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Start Sorting',
                variant: 'success',
            });
            router.push(`/pickpack/batchlist/edit/${pickList.id}`);
        }).catch((e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        });
    };

    const getDataSorting = (res) => {
        name = (res && res.data && res.data.itemSortingPickByBatch && res.data.itemSortingPickByBatch.pick_by_batch_sort && res.data.itemSortingPickByBatch.pick_by_batch_sort.name) || '-';
        sku = (res && res.data && res.data.itemSortingPickByBatch && res.data.itemSortingPickByBatch.pick_by_batch_sort && res.data.itemSortingPickByBatch.pick_by_batch_sort.sku) || '-';
        slot = (res && res.data && res.data.itemSortingPickByBatch && res.data.itemSortingPickByBatch.pick_by_batch_sort && res.data.itemSortingPickByBatch.pick_by_batch_sort.slot_no) || '-';

        setName(name);
        setSku(sku);
        setSlot(slot);
    };

    const pickList = {
        parentId: picklist.parent_id,
        id: picklist.entity_id,
    };

    const contentProps = {
        pickList,
        handleDetect,
        handleDoneSorting,
        name,
        sku,
        slot,
    };

    return (
        <Content {...contentProps} />
    );
};

const Core = (props) => {
    const router = useRouter();
    const { loading, data } = gqlService.getPickByBatchItemById({
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
