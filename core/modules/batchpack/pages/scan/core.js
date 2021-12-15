/* eslint-disable no-use-before-define */
/* eslint-disable prefer-const */
import React from 'react';
import Layout from '@layout';
import { useRouter } from 'next/router';
import gqlService from '@modules/batchpack/services/graphql';
import aclService from '@modules/theme/services/graphql';

const Core = (props) => {
    const {
        Content,
    } = props;
    const router = useRouter();

    const pageConfig = {
        title: `Pack by Batch ID ${router.query?.shipment} - Scan Batch ${router.query?.batch}`,
    };

    const { loading: loadingConfigCamera, data: dataConfigCamera } = gqlService.getStoreConfig({
        path: 'swiftoms_pickpack/batch/use_camera_to_scan',
    });
    const batch_id = router && router.query && Number(router.query.batch);
    const shipment_id = router && router.query && Number(router.query.shipment);

    const [updatePickByBatchQtyPacked, { data, loading }] = gqlService.updatePickByBatchQtyPacked({
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
            updatePickByBatchQtyPacked({
                variables: {
                    batch_id,
                    shipment_id,
                    barcode,
                },
            });
        }
    };

    const { loading: aclCheckLoading, data: aclCheckData } = aclService.isAccessAllowed({
        acl_code: 'pick_by_batch_packlist',
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
