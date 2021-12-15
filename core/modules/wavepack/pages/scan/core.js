/* eslint-disable no-use-before-define */
/* eslint-disable prefer-const */
import React from 'react';
import Layout from '@layout';
import { useRouter } from 'next/router';
import gqlService from '@modules/wavepack/services/graphql';
import aclService from '@modules/theme/services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;
    const router = useRouter();
    const pageConfig = {
        title: `Pack by Wave - Scan ID ${router.query?.shipment}`,
    };
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

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'pick_by_wave_packlist',
    });

    if (typeof window === 'undefined' || loadingConfigCamera || aclCheckLoading) {
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

    if ((aclCheckData && aclCheckData.isAccessAllowed) === false) {
        router.push('/');
    }

    const contentProps = {
        data,
        loading,
        handleDetect,
        shipment_id,
        useCamera: dataConfigCamera.getStoreConfig === '1',
    };

    return (
        <Layout pageConfig={pageConfig} useBreadcrumbs={false}>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
