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
    const wave_id = router && router.query && Number(router.query.wave);
    const shipment_id = router && router.query && Number(router.query.shipment);

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

    const contentProps = {
        data, loading, handleDetect, shipment_id,
    };
    if (typeof window === 'undefined') {
        return (
            <Layout useBreadcrumbs={false}>
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
    return (
        <Layout useBreadcrumbs={false}>
            <Content {...contentProps} />
        </Layout>
    );
};

export default Core;
