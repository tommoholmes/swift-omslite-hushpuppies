/* eslint-disable no-use-before-define */
/* eslint-disable prefer-const */
import React from 'react';
import Layout from '@layout';
import { useRouter } from 'next/router';
import gqlService from '@modules/batchlist/services/graphql';

const ContentWrapper = (props) => {
    const {
        data,
        Content,
        allowManualConfirm,
        useCamera,
    } = props;
    const router = useRouter();
    const picklist = data.getPickByBatchItemById.pick_by_batch_item;
    const [updatePickByBatchItem] = gqlService.updatePickByBatchItem();

    let [count, setCount] = React.useState(picklist.qty_picked);
    const [visibility, setVisibility] = React.useState(!!allowManualConfirm);

    const handleSubmit = () => {
        const variables = {
            item_id: picklist.entity_id,
            qty_picked: count,
        };
        window.backdropLoader(true);
        updatePickByBatchItem({
            variables,
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: 'Success update qty!',
                variant: 'success',
            });
            setTimeout(() => router.push(`/pickpack/batchlist/edit/picklist/${pickList.parentId}`), 250);
        }).catch((e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        });
    };

    const incrementCount = () => {
        if (count < pickList.qty) {
            count += 1;
        }
        setCount(count);
    };

    const decrementCount = () => {
        if (count > 0) {
            count -= 1;
        }
        setCount(count);
    };

    const handleDetect = (code) => {
        if (code === picklist.barcode) {
            incrementCount();
            setVisibility(true);
        } else if (!allowManualConfirm) {
            setVisibility(false);
        }
    };

    const pickList = {
        parentId: picklist.parent_id,
        id: picklist.entity_id,
        name: picklist.name,
        sku: picklist.sku,
        location: picklist.bin_code,
        qty: picklist.qty_to_pick,
        qtyPicked: picklist.qty_picked,
        barcode: picklist.barcode,
    };

    const contentProps = {
        pickList,
        incrementCount,
        decrementCount,
        handleDetect,
        count,
        setCount,
        handleSubmit,
        visibility,
        useCamera,
    };

    return (
        <Content {...contentProps} />
    );
};

const Core = (props) => {
    const router = useRouter();

    const pageConfig = {
        title: `Pick by Batch - Scan ID ${router.query?.id}`,
    };

    const { loading: loadingConfig, data: dataConfig } = gqlService.getStoreConfig({
        path: 'swiftoms_pickpack/batch/allow_manual_confirm_pick',
    });
    const { loading: loadingConfigCamera, data: dataConfigCamera } = gqlService.getStoreConfig({
        path: 'swiftoms_pickpack/batch/use_camera_to_scan',
    });

    const { loading, data } = gqlService.getPickByBatchItemById({
        id: router && router.query && Number(router.query.id),
    });

    if (loading || loadingConfig || loadingConfigCamera) {
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
            <ContentWrapper
                data={data}
                useCamera={dataConfigCamera.getStoreConfig === '1'}
                allowManualConfirm={dataConfig.getStoreConfig === '1'}
                {...props}
            />
        </Layout>
    );
};

export default Core;
