/* eslint-disable no-use-before-define */
/* eslint-disable prefer-const */
import React from 'react';
import Layout from '@layout';
import { useRouter } from 'next/router';
import gqlService from '@modules/wavelist/services/graphql';
import aclService from '@modules/theme/services/graphql';
import useStyles from '@modules/wavelist/pages/pickitem/components/style';
import ErrorRedirect from '@common_errorredirect';

const ContentWrapper = (props) => {
    const {
        data, Content, allowManualConfirm, useCamera,
    } = props;
    const router = useRouter();
    const picklist = data.getPickByWaveItemById.pick_by_wave_item;
    const [updatePickByWaveItem] = gqlService.updatePickByWaveItem();

    let [count, setCount] = React.useState(picklist.qty_picked);
    const [visibility, setVisibility] = React.useState(!!allowManualConfirm);

    const handleSubmit = () => {
        const variables = {
            item_id: picklist.entity_id,
            qty_picked: count,
        };
        window.backdropLoader(true);
        updatePickByWaveItem({
            variables,
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: 'Success update qty!',
                    variant: 'success',
                });
                setTimeout(() => router.push(`/pickpack/wavelist/picklist/${picklist.parent_id}`), 250);
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
        id: picklist.entity_id,
        parentId: picklist.parent_id,
        name: picklist.name,
        sku: picklist.sku,
        location: picklist.bin_code,
        image: picklist.image_url,
        qty: picklist.qty_to_pick,
        qtyPicked: picklist.qty_picked,
        slot: picklist.slot_no,
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

    return <Content {...contentProps} />;
};

const Core = (props) => {
    const router = useRouter();
    const { loading: loadingConfig, data: dataConfig } = gqlService.getStoreConfig({
        path: 'swiftoms_pickpack/wave/allow_manual_confirm_pick',
    });

    const { loading: loadingConfigCamera, data: dataConfigCamera } = gqlService.getStoreConfig({
        path: 'swiftoms_pickpack/wave/use_camera_to_scan',
    });

    const { loading, data, error } = gqlService.getPickByWaveItemById({
        item_id: router && router.query && Number(router.query.id),
    });
    const classes = useStyles();

    const pageConfig = {
        title: `Pick by Wave - Scan ID ${router.query?.id}`,
    };

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'pick_by_wave_list',
    });

    if (loading || loadingConfig || loadingConfigCamera || aclCheckLoading) {
        return (
            <Layout pageConfig={pageConfig}>
                <div className={classes.loadingFetch}>Loading . . .</div>
            </Layout>
        );
    }

    if (!data) {
        const errMsg = error?.message ?? 'Data not found!';
        const redirect = '/pickpack/wavelist';
        return <ErrorRedirect errMsg={errMsg} redirect={redirect} pageConfig={pageConfig} />;
    }

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    return (
        <Layout useBreadcrumbs={false} pageConfig={pageConfig}>
            <ContentWrapper
                data={data}
                allowManualConfirm={dataConfig.getStoreConfig === '1'}
                useCamera={dataConfigCamera.getStoreConfig === '1'}
                {...props}
            />
        </Layout>
    );
};

export default Core;
