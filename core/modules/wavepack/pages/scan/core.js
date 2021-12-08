/* eslint-disable no-use-before-define */
/* eslint-disable prefer-const */
import React from 'react';
import Layout from '@layout';
import { useRouter } from 'next/router';
import gqlService from '@modules/wavepack/services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;
    const router = useRouter();
    const pageConfig = {
        title: `Pack by Wave - Scan ID ${router.query?.id}`,
    };
    const id = router && router.query && Number(router.query.id);
    const wave_id = router && router.query && Number(router.query.wave);
    const shipment_id = router && router.query && Number(router.query.shipment);

    const { loading: loadingConfigCamera, data: dataConfigCamera } = gqlService.getStoreConfig({
        path: 'swiftoms_pickpack/wave/use_camera_to_scan',
    });
    const [updatePickByWaveQtyPacked, { data, loading }] = gqlService.updatePickByWaveQtyPacked({
        onCompleted: () => {
            window.toastMessage({
                open: true,
                text: 'Success scanned',
                variant: 'success',
            });
        },
        onError: (e) => {
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        },
    });

    const handleDetect = (barcode) => {
        if (barcode) {
            updatePickByWaveQtyPacked({
                variables: {
                    wave_id,
                    shipment_id,
                    barcode,
                },
            });
        }
    };

    if (typeof window === 'undefined' || loadingConfigCamera) {
        return (
            <Layout pageConfig={pageConfig} useBreadcrumbs={false}>
                <div style={{
                    display: 'flex',
                    color: '#435179',
                    fontWeight: 600,
                    justifyContent: 'center',
                    padding: '20px 0',
                }}
                >
                    Loading
                </div>
            </Layout>

        );
    }

    const contentProps = {
        data,
        loading,
        handleDetect,
        shipment_id,
        id,
        useCamera: dataConfigCamera.getStoreConfig === '1',
    };

    return (
        <Layout pageConfig={pageConfig} useBreadcrumbs={false}>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
